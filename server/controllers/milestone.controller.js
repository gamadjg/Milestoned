import Milestone from "../models/milestone.model.js";
import User from "../models/user.model.js";
import asyncHandler from "express-async-handler";
// import mongoose from "mongoose";

// @desc Get all milestones
// @route Get /
// @access Private
export const getAllMilestones = asyncHandler(async (req, res) => {
    let milestones = await Milestone.find().lean();

    if (!milestones?.length) {
        res.status(400).json({ message: "No milestones found" });
    }

    res.json(milestones);
});

// @desc Get all public milestones
// @route Get /public
// @access Private
export const getPublicMilestones = asyncHandler(async (req, res) => {
    let milestones = await Milestone.find({ owner: { $eq: null } }).lean();

    if (!milestones?.length) {
        res.status(400).json({ message: "No milestones found" });
    }

    res.json(milestones);
});

//@desc Get one Milestone
// @route Get /milestone
//@access Private
export const getOneMilestone = asyncHandler(async (req, res) => {
    const milestoneNum = req.params.milestoneNum;
    const milestone = await Milestone.findOne({ _id: milestoneNum }).lean();

    if (!milestone) {
        res.status(400).json({ message: `Milestone not found` });
    }

    res.json(milestone);
});

// @desc Create New Milestone
// @route POST /milestones
// @access Public
export const createNewMilestone = asyncHandler(async (req, res) => {
    const { title, description, deadline, status, owner, tags } = req.body;

    try {
        let milestone = await Milestone.create({
            title,
            description,
            deadline,
            status,
            owner: owner ? owner : null,
            tags: tags ? tags : [],
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
    const { title, description, started, deadline, status, owner, tags } =
        req.body;
    console.log("tags to update: ", tags);
    const milestone = await Milestone.findOne({ _id: id });
    if (!milestone) {
        return res.status(400).json({ message: `Milestone not found` });
    }

    milestone.title = title;
    milestone.description = description;
    milestone.started = started;
    milestone.deadline = deadline;
    milestone.status = status;
    milestone.tags = tags;
    milestone.owner = owner;
    await milestone.save();

    res.status(201).json({
        message: `Milestone has been updated.`,
    });
});

// @desc Delete a Milestone
// @route DELETE /milestone
// @access Private
export const deleteMilestone = asyncHandler(async (req, res) => {
    const milestoneNum = req.params.milestoneNum;

    const milestone = await Milestone.findOne({ _id: milestoneNum });

    if (!milestone) {
        res.status(400).json({ message: "Milestone Not Found" });
    }

    await Milestone.deleteOne({ _id: milestoneNum });

    res.status(204).json({
        message: `delete successful`,
    });
    // const reply = `Milestone No. ${result._id.toString()} - ${
    //     result.title
    // } deleted`;
    // const response = await Milestone.find({ owner }).lean();
    // res.json(reply);
});
