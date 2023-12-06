import React, { useState, useMemo } from "react";
import axios from "axios";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "@/store/rootReducer";

type Props = {
    milestone?: Milestone;
    handleMilestone: (milestone: Milestone) => void;
    newMilestone: boolean;
    handleDelete?: () => void;
};

const MilestoneForm = ({
    milestone,
    handleMilestone,
    newMilestone,
    handleDelete,
}: Props) => {
    const user = useSelector((state: RootState) => state.user?.user);
    const [title, setTitle] = useState(milestone?.title || "");
    const [description, setDescription] = useState(
        milestone?.description || ""
    );
    const [status, setStatus] = useState(milestone?.status || "");
    const [deadline, setDeadline] = useState(
        milestone
            ? new Date(milestone.deadline).toLocaleDateString(undefined, {
                  month: "numeric",
                  day: "numeric",
                  year: "numeric",
              })
            : new Date().toLocaleDateString(undefined, {
                  month: "numeric",
                  day: "numeric",
                  year: "numeric",
              })
    );
    const maxDescriptionLength = 500;
    const descriptionLength = useMemo(() => {
        return description.length;
    }, [description]);
    const descriptionHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
        if (
            e.currentTarget.value.length < descriptionLength ||
            descriptionLength < maxDescriptionLength
        ) {
            setDescription(e.currentTarget.value);
        } else {
            console.log("max description size reached.");
        }
    };
    // const [started, setStarted] = useState(
    // const [tags, setTags] = useState();
    // const [errors, setErrors] = useState([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newMilestone) {
            try {
                const res = await axios.post(
                    "http://localhost:8000/api/milestones/create",
                    {
                        title,
                        description,
                        deadline,
                        status,
                        owner: user?.id,
                    }
                );
                console.log("New milestone: ", res);
                handleMilestone(res.data.milestone);
            } catch (error) {
                console.log("Create error: ", error);
            }
        } else {
            try {
                const res = await axios.patch(
                    `http://localhost:8000/api/milestones/${milestone!._id}`,
                    {
                        title,
                        description,
                        deadline,
                        status,
                        owner: milestone!.owner,
                    }
                );
                console.log("Edited milestone: ", res);
                handleMilestone({
                    title,
                    description,
                    deadline,
                    status,
                    owner: milestone!.owner,
                });
            } catch (error) {
                console.log("Edit error: ", error);
            }
        }
        // const errorSetup: object<string, string> = {}
        // if(!title){
        //     errorSetup['title'] = 'Title is required'
        // }
        // if(!deadline){
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
            <div className="font-semibold text-xl mb-4">
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
                    onChange={descriptionHandler}
                    className="w-full h-40 border border-gray-300 rounded-md px-3 py-2 mt-1 resize-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
                <div className="flex mb-4 justify-end mr-2">
                    <div className="text-xs leading-4 font-normal text-gray-400">
                        {descriptionLength}/{maxDescriptionLength}
                    </div>
                </div>
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
            <div
                className={
                    newMilestone
                        ? "flex justify-end"
                        : "flex justify-between" + " items-end mb-4 w-full"
                }
            >
                {newMilestone ? (
                    <></>
                ) : (
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="bg-red-600 rounded-lg text-white px-8 py-2 flex justify-between gap-1"
                    >
                        <img
                            className="text-white invert"
                            width="24"
                            height="24"
                            src="https://img.icons8.com/material-outlined/24/trash--v1.png"
                            alt="trash--v1"
                        />
                    </button>
                )}
                <button
                    type="submit"
                    className="bg-blue-500 rounded-lg text-white px-8 py-2"
                >
                    {newMilestone ? "Add +" : "Edit"}
                    <i className="gg-check"></i>
                </button>
            </div>
        </form>
    );
};

export default MilestoneForm;
