import { Schema, model } from "mongoose";

const milestoneSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        deadline: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ["Completed", "In Progress", "Not Started"],
            visibility: {
                type: String,
                enum: ["public", "private"],
                default: "public",
            },
            default: "not-started",
            required: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        // collaborators: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: 'User'
        //     }
        // ],
        tags: [
            {
                type: String,
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Milestone = model("Milestone", milestoneSchema);

export default Milestone;
