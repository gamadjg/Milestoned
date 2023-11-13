"use client";
import React, { useState } from "react";
import { createMilestone } from "../app/api/milestones/handleMilestones";
import { useRouter } from "next/navigation";

const MilestoneForm = () => {
    const router = useRouter();
    const [title, setTitle] = useState("test");
    const [description, setDescription] = useState("another test");
    const [status, setStatus] = useState("Completed");
    const [deadline, setDeadline] = useState("06/14/2023");
    const [tags, setTags] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const user = JSON.parse(sessionStorage.getItem("user")!);
        try {
            const newMilestone = (await createMilestone({
                title,
                description,
                deadline,
                status,
                tags,
                owner: user.id,
            })) as Milestone;
            let milestones = JSON.parse(sessionStorage.getItem("milestones")!);
            milestones.push(newMilestone);
            console.log(milestones);
            sessionStorage.setItem("milestones", JSON.stringify(milestones));
            router.refresh();
        } catch (error: any) {
            console.error("Milestone error:", error);
            // setErrors(error);
        }
        // if (user) {
        //     // add new milestone to user within sessionStorage
        //     user.milestones.push(milestone);
        //     console.log(user);
        //     sessionStorage.setItem("user", JSON.stringify(user));
        // } else {
        //     // add new milestone to user within sessionStorage
        //     user.milestones.push(milestone);
        //     console.log(user);
        //     sessionStorage.setItem("user", JSON.stringify(user));
        // }
        // Reset form inputs
        // setTitle("");
        // setDescription("");
        // setStatus("");
        // setDeadline("");
        // setTags("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="font-bold text-xl mb-4">Add New Milestone</div>

            <div className="mb-4">
                <input
                    type="text"
                    name="title"
                    placeholder="Enter milestone title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <textarea
                    name="description"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full h-40 border border-gray-300 rounded-md px-3 py-2 mt-1 resize-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
            </div>
            <div className="mb-4">
                <select
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="" disabled>
                        Select status
                    </option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Not Started">Not Started</option>
                </select>
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    name="dateCompleted"
                    placeholder="Date completed (mm/dd/yyyy)"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    name="tags"
                    placeholder="Tags (separated by commas)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div className="flex items-end justify-end mb-4 w-full">
                <div>{errors}</div>
                <button
                    type="submit"
                    className="bg-blue-500 rounded-lg text-white px-8 py-2 mr-4"
                >
                    Add
                </button>
            </div>
        </form>
    );
};

export default MilestoneForm;
