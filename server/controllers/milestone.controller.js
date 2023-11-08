import Milestone from "../models/milestone.model.js";
import User from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

// @desc Get all milestones
// @route Get /
// @access Private
export const getAllMilestones = asyncHandler(async (req, res) => {
    let milestones = await Milestone.find().lean();

    if (!milestones?.length) {
        return res.status(400).json({ message: "No milestones found" });
    }

    res.json(milestones);
});

// @desc Get all public milestones
// @route Get /public
// @access Private
export const getPublicMilestones = asyncHandler(async (req, res) => {
    let milestones = await Milestone.find({ owner: { $eq: null } }).lean();

    if (!milestones?.length) {
        return res.status(400).json({ message: "No milestones found" });
    }

    const publicMilestones = await Promise.all(
        milestones.map(async (milestone) => {
            const user = await User.findById(milestone.user).lean().exec();
            const displayName = user?.username?.displayName || "Unknown";
            return { ...milestone, displayName };
        })
    );

    res.json(publicMilestones);
});

//@desc Get one Milestone
// @route Get /milestone
//@access Private
export const getOneMilestone = asyncHandler(async (req, res) => {
    const milestoneNum = req.params.milestoneNum;
    const milestone = await Milestone.findOne({ _id: milestoneNum }).lean();

    if (milestone == null) {
        return res.status(400).json({
            message: `Milestone not found\t\t No.${milestone.milestoneNum} not found for ${user.displayName}`,
        });
    }
    res.json(milestone);
});

// @desc Create New Milestone
// @route POST /milestones
// @access Public
export const createNewMilestone = asyncHandler(async (req, res) => {
    const { title, description, started, deadline, status, owner } = req.body;
    console.log(
        " title: ",
        title,
        "\n",
        "description: ",
        description,
        "\n",
        "started: ",
        started,
        "\n",
        "deadline: ",
        deadline,
        "\n",
        "status: ",
        status,
        "\n",
        "owner: ",
        owner
    );
    // if (
    //     !title ||
    //     !started
    //     !status
    // ) {
    //     return res.status(400).json({
    //         message:
    //             "All milestone fields required: title, description (minimum 10 characters), deadline, and status",
    //     });
    // }

    try {
        let milestone = await Milestone.create({
            title,
            description,
            started,
            deadline,
            status,
            owner: owner ? owner : null,
        });
        // Append the created milestone to the user's milestones array
        if (owner) {
            await User.findByIdAndUpdate(owner, {
                $push: { milestones: milestone._id },
            });
        }

        res.status(201).json({
            message: `New milestone ${milestone._id}: ${milestone.title} created`,
            milestone,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "An error occurred while creating the milestone",
        });
    }
});

// @desc Update a Milestone
// @route PATCH /milestones
// @access Private
export const updateMilestone = asyncHandler(async (req, res) => {
    const id = req.params.milestoneNum;
    const {
        title,
        description,
        started,
        deadline,
        status,
        owner,
        // tags,
    } = req.body;

    if (!title || !started || !status) {
        return res.status(400).json({
            message:
                "All milestone fields required: title, start date, and status",
        });
    }

    const milestone = await Milestone.findOne({ _id: id });
    if (!milestone) {
        return res.status(400).json({ message: `Milestone not found` });
    }
    // const duplicate = await findOne({ title }).lean().exec();
    // if (duplicate && duplicate?.owner.username.displayName) {
    //     return res.status(409).json({
    //         message: `${owner.username.displayName} has duplicate milestone titles`,
    //     });
    // }

    milestone.title = title;
    milestone.description = description;
    milestone.started = started;
    milestone.deadline = deadline;
    milestone.status = status;
    // milestone.tags = tags;
    milestone.owner = owner;
    // if (status.visibility === "public") {
    //     milestone.owner = owner;
    // } else if (status.visibility === "private") {
    //     milestone.owner.displayName = "hidden";
    // }
    // if (collaborators) {
    //     /* set roles & permissions */
    // }

    const updatedMilestone = await milestone.save();
    res.status(201).json({
        message: `Milestone has been updated.`,
    });
});

// @desc Delete a Milestone
// @route DELETE /milestone
// @access Private
export const deleteMilestone = asyncHandler(async (req, res) => {
    const milestoneNum = req.params.milestoneNum;

    // const { milestoneNum } = req.body; //TODO collaborator check (roles)

    // if (!milestoneNum || typeof milestoneNum !== "number") {
    //     return res
    //         .status(400)
    //         .json({ message: `Milestone Number is required` });
    // }

    const milestone = await Milestone.findOne({ _id: milestoneNum }).exec();

    if (!milestone) {
        return res.status(400).json({ message: "Milestone Not Found" });
    }
    console.log("milestone to delete found");

    await Milestone.deleteOne({ _id: milestoneNum });

    console.log("milestone deleted");

    return res.status(200).json({
        message: `delete successful`,
    });
    // const reply = `Milestone No. ${result._id.toString()} - ${
    //     result.title
    // } deleted`;
    // const response = await Milestone.find({ owner }).lean();
    // res.json(reply);
});
