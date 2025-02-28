// import React, { useMemo } from "react";
import axios from "axios";
// import { useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../store/rootReducer";
import { Input } from "./Input";
import { Button } from "./Button";
import {
    title_validation,
    description_validation,
    status_validation,
    deadline_validation,
    tags_validation,
} from "../lib/milestoneValidations";
import { FormProvider } from "react-hook-form";
import { useForm } from "react-hook-form";

type Props = {
    milestone?: Milestone;
    handleMilestone: (milestone: Milestone) => void;
    newMilestone: boolean;
    handleDelete?: () => void;
};

const MilestoneForm = ({ milestone, handleMilestone, newMilestone }: Props) => {
    const methods = useForm();
    const user = useSelector((state: RootState) => state.user?.user);
    // const [tags, setTags] = useState(milestone?.tags?.join(", ") || "");
    // const handleTags = (e: React.FormEvent<HTMLInputElement>) => {
    //     // setTags(e.currentTarget.value.split(",").map((tag) => tag.trim()));
    //     setTags(e.currentTarget.value);
    // };

    const onSubmit = methods.handleSubmit(async (data) => {
        let tags = [];
        if (data.tags.length > 0) {
            tags = data.tags.split(",");
        }
        console.log("tags: ", tags);
        // if the form is used to create a new milestone, send a post request
        if (newMilestone) {
            try {
                const res = await axios.post(
                    `${
                        import.meta.env.VITE_APP_API_HOST
                    }/api/milestones/create`,
                    {
                        title: data.title,
                        description: data.description,
                        deadline: data.deadline,
                        status: data.status,
                        owner: user?.id,
                        tags,
                    }
                );
                handleMilestone(res.data.milestone);
            } catch (error) {
                console.log("Create error: ", error);
            }
        } else {
            // else the form is used to edit an existing milestone, send a patch request, then update the milestone in the redux store and session storage
            try {
                console.log(data.tags);
                await axios.patch(
                    `${import.meta.env.VITE_APP_API_HOST}/api/milestones/${
                        milestone!._id
                    }`,
                    {
                        title: data.title,
                        description: data.description,
                        deadline: data.deadline,
                        status: data.status,
                        owner: milestone!.owner,
                        tags,
                    }
                );
                handleMilestone({
                    title: data.title,
                    description: data.description,
                    deadline: data.deadline,
                    status: data.status,
                    owner: milestone!.owner,
                    tags,
                });
            } catch (error) {
                console.log("Edit error: ", error);
            }
        }
    });

    const backspace = () => {
        window.history.back();
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={onSubmit}>
                <Input
                    {...title_validation}
                    initialValue={milestone?.title || ""}
                />
                <Input
                    {...description_validation}
                    initialValue={milestone?.description || ""}
                />
                <Input
                    {...status_validation}
                    initialValue={milestone?.status || ""}
                />
                <Input
                    {...deadline_validation}
                    initialValue={
                        milestone
                            ? new Date(
                                  milestone ? milestone.deadline : ""
                              ).toLocaleDateString()
                            : new Date().toLocaleDateString()
                    }
                />
                <Input
                    {...tags_validation}
                    initialValue={milestone?.tags?.join(", ") || ""}
                />
                <div
                    className={
                        (newMilestone
                            ? "flex justify-end"
                            : "flex justify-between") +
                        " items-center mb-4 w-full mt-5"
                    }
                >
                    {newMilestone ? (
                        <Button
                            text="Add"
                            extraText="+"
                            className="bg-blue-500 rounded-lg text-white px-8 py-1 flex items-center gap-2"
                            extraClassName="text-xl"
                        />
                    ) : (
                        <>
                            <Button
                                text="Cancel"
                                type="button"
                                className="bg-gray-500 rounded-lg text-white px-8 py-1 mr-4 h-full"
                                onClick={backspace}
                            />
                            <Button
                                text="Edit"
                                type="submit"
                                extraText="&#10003;"
                                className="bg-[#059669] rounded-lg text-white px-8 py-1 flex items-center gap-2"
                                extraClassName="text-xl"
                            />
                        </>
                    )}
                </div>
            </form>
        </FormProvider>
    );
};

export default MilestoneForm;

// const MilestoneForm = ({ milestone, handleMilestone, newMilestone }: Props) => {
//     const user = useSelector((state: RootState) => state.user?.user);
//     const [title, setTitle] = useState(milestone?.title || "");
//     const [description, setDescription] = useState(
//         milestone?.description || ""
//     );
//     const [status, setStatus] = useState(milestone?.status || "");
//     const [deadline, setDeadline] = useState(
//         milestone
//             ? new Date(milestone.deadline).toLocaleDateString(undefined, {
//                   month: "numeric",
//                   day: "numeric",
//                   year: "numeric",
//               })
//             : new Date().toLocaleDateString(undefined, {
//                   month: "numeric",
//                   day: "numeric",
//                   year: "numeric",
//               })
//     );
//     const [tags, setTags] = useState(milestone?.tags || []);
//     const maxDescriptionLength = 500;
//     const descriptionLength = useMemo(() => {
//         return description.length;
//     }, [description]);
//     const descriptionHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
//         if (
//             e.currentTarget.value.length < descriptionLength ||
//             descriptionLength < maxDescriptionLength
//         ) {
//             setDescription(e.currentTarget.value);
//         } else {
//             console.log("max description size reached.");
//         }
//     };
//     // const [errors, setErrors] = useState([]);

//     const handleTags = (e: React.FormEvent<HTMLInputElement>) => {
//         setTags(e.currentTarget.value.split(",").map((tag) => tag.trim()));
//     };

//     const onSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         // if the form is used to create a new milestone, send a post request
//         if (newMilestone) {
//             try {
//                 const res = await axios.post(
//                     "http://localhost:8000/api/milestones/create",
//                     {
//                         title,
//                         description,
//                         deadline,
//                         status,
//                         owner: user?.id,
//                         tags: tags,
//                     }
//                 );
//                 handleMilestone(res.data.milestone);
//                 setTitle("");
//                 setDescription("");
//                 setStatus("");
//                 setDeadline("");
//                 setTags([]);
//             } catch (error) {
//                 console.log("Create error: ", error);
//             }
//         } else {
//             // else the form is used to edit an existing milestone, send a patch request, then update the milestone in the redux store and session storage
//             try {
//                 await axios.patch(
//                     `http://localhost:8000/api/milestones/${milestone!._id}`,
//                     {
//                         title,
//                         description,
//                         deadline,
//                         status,
//                         owner: milestone!.owner,
//                         tags,
//                     }
//                 );
//                 handleMilestone({
//                     title,
//                     description,
//                     deadline,
//                     status,
//                     owner: milestone!.owner,
//                     tags,
//                 });
//             } catch (error) {
//                 console.log("Edit error: ", error);
//             }
//         }
//     };

//     const backspace = () => {
//         window.history.back();
//     };

//     return (
//         <form onSubmit={onSubmit}>
//             <div className="mb-4">
//                 <Input {...title_validation} />
//                 <input
//                     type="text"
//                     name="title"
//                     placeholder="Enter milestone title"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 />
//             </div>
//             <div className="mb-4">
//                 <textarea
//                     name="description"
//                     placeholder="Enter description"
//                     value={description}
//                     onChange={descriptionHandler}
//                     className="w-full h-40 border border-gray-300 rounded-md px-3 py-2 mt-1 resize-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 ></textarea>
//                 <div className="flex mb-4 justify-end mr-2">
//                     <div className="text-xs leading-4 font-normal text-gray-400">
//                         {descriptionLength}/{maxDescriptionLength}
//                     </div>
//                 </div>
//             </div>
//             <div className="mb-4">
//                 <select
//                     name="status"
//                     value={status}
//                     onChange={(e) => setStatus(e.target.value)}
//                     className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 >
//                     <option value="" disabled>
//                         Select status
//                     </option>
//                     <option value="In Progress">In Progress</option>
//                     <option value="Completed">Completed</option>
//                     <option value="Not Started">Not Started</option>
//                 </select>
//             </div>
//             <div className="mb-4">
//                 <input
//                     type="text"
//                     name="dateCompleted"
//                     placeholder="Date completed (mm/dd/yyyy)"
//                     value={deadline}
//                     onChange={(e) => setDeadline(e.target.value)}
//                     className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 />
//             </div>
//             <div className="mb-4">
//                 <input
//                     type="text"
//                     name="tags"
//                     placeholder="Tags (separated by commas)"
//                     value={tags.map((tag) => tag.trim()).join(", ")}
//                     onChange={handleTags}
//                     className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 />
//             </div>
//             <div
//                 className={
//                     newMilestone
//                         ? "flex justify-end"
//                         : "flex justify-between" + " items-center mb-4 w-full"
//                 }
//             >
//                 {newMilestone ? (
//                     <button
//                         type="submit"
//                         className="bg-blue-500 rounded-lg text-white px-8 py-1 flex items-center gap-2"
//                     >
//                         <span>Add</span>
//                         <span className="text-xl">+</span>
//                     </button>
//                 ) : (
//                     <>
//                         <button
//                             type="button"
//                             className="bg-gray-500 rounded-lg text-white px-8 py-1 mr-4 h-full"
//                             onClick={backspace}
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             type="submit"
//                             className="bg-[#059669] rounded-lg text-white px-8 py-1 flex items-center gap-2"
//                         >
//                             <span>Edit</span>
//                             <span className="text-xl">&#10003;</span>
//                         </button>
//                     </>
//                 )}
//             </div>
//         </form>
//     );
// };

// export default MilestoneForm;
