import express from "express";
import {
    getPublicMilestones,
    getAllMilestones,
    getOneMilestone,
    createNewMilestone,
    updateMilestone,
    deleteMilestone,
} from "../controllers/milestone.controller.js";
import tagsWare from "../middleware/tagsWare.js";

const router = express.Router();

// Get all milestones
router.get("/", getAllMilestones);

// Get all public milestones
router.get("/public", getPublicMilestones);

// Get one milestone
router.get("/:milestoneNum", getOneMilestone);

// Create new milestone
router.post("/create", createNewMilestone);
// router.post("/milestones", tagsWare, createNewMilestone);

// Update a milestone
router.patch("/:milestoneNum", updateMilestone);
// router.patch("/:milestoneNum", tagsWare, updateMilestone);

// Delete a milestone
router.delete("/:milestoneNum", deleteMilestone);

export default router;
