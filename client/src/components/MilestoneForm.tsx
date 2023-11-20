import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "@/store/rootReducer";

type Milestone = {
    _id?: string;
    title: string;
    description?: string;
    started: string;
    deadline?: string;
    status: string;
    owner?: string;
};

type Props = {
    milestone: Milestone;
    handleMilestone: (milestone: Milestone) => void;
    newMilestone: boolean;
};

const MilestoneForm = ({ milestone, handleMilestone, newMilestone }: Props) => {
    const user = useSelector((state: RootState) => state.user?.user);
    const [title, setTitle] = useState(milestone.title);
    const [description, setDescription] = useState(milestone.description);
    const [started, setStarted] = useState(milestone.started);
    const [status, setStatus] = useState(milestone.status);
    const [deadline, setDeadline] = useState(milestone.deadline);
    // const [tags, setTags] = useState();
    // const [errors, setErrors] = useState([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newMilestone) {
            // handleMilestone({ title, description, started, status, deadline });
            try {
                const res = await axios.post(
                    "http://localhost:8000/api/milestones/create",
                    {
                        title,
                        description,
                        started,
                        status,
                        deadline,
                        owner: user?.id,
                    }
                );
                console.log("New milestone: ", res);
                // handleMilestone({
                //     title,
                //     description,
                //     started,
                //     deadline,
                //     status,
                //     owner: user?.id,
                // });
                handleMilestone(res.data.milestone);
            } catch (error) {
                console.log("Create error: ", error);
            }
        } else {
            try {
                const res = await axios.patch(
                    `http://localhost:8000/api/milestones/${milestone._id}`,
                    {
                        title,
                        description,
                        started,
                        deadline,
                        status,
                        // owner: milestone.owner,
                    }
                );
                console.log("Edited milestone: ", res);
                handleMilestone({
                    title,
                    description,
                    started,
                    deadline,
                    status,
                });
            } catch (error) {
                console.log("Edit error: ", error);
            }
        }
        // const errorSetup: object<string, string> = {}
        // if(!title){
        //     errorSetup['title'] = 'Title is required'
        // }
        // if(!started){
        //     errorSetup['started'] = 'Start date is required'
        // }
        // if(!status){
        //     errorSetup['status'] = 'Status is required'
        // }

        // if (title && started && status) {
        //     handleMilestone({
        //         title,
        //         description,
        //         started,
        //         status,
        //         deadline,
        //     });
        // } else {
        //     console.log("Cant create milestone");
        // }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="font-bold text-xl mb-4">
                {newMilestone ? "Add New Milestone" : "Edit Milestone"}
            </div>
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
            <div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="dateCompleted"
                        placeholder="Date completed (mm/dd/yyyy)"
                        value={started}
                        onChange={(e) => setStarted(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
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
            </div>
            {/* <div className="mb-4">
                <input
                    type="text"
                    name="tags"
                    placeholder="Tags (separated by commas)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
            </div> */}
            <div className="flex items-end justify-end mb-4 w-full">
                {/* <div>{errors}</div> */}
                <button
                    type="submit"
                    className="bg-blue-500 rounded-lg text-white px-8 py-2 mr-4"
                >
                    {newMilestone ? "Add" : "Edit"}
                </button>
            </div>
        </form>
    );
};

export default MilestoneForm;
