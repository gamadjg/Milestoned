// import React, { useState, useEffect } from "react";
// import { getMilestones } from "@/app/api/milestones/handleMilestones";
// import milestoneContainer from "./MilestoneContainer";
import { Link } from "react-router-dom";

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
    milestones: Milestone[];
};

const MilestoneList = ({ milestones }: Props) => {
    // const [milestones, setMilestones] = useState<Milestone[]>([]);
    // const milestones = sessionStorage.getItem("milestones");
    // const sessionMilestones = sessionStorage.getItem("publicMilestones");
    // let formattedMilestones: React.ReactElement[] = [];

    // useEffect(() => {
    //     const setupMilestones = async () => {
    //         const milestones = sessionMilestones
    //             ? JSON.parse(sessionMilestones)
    //             : await getMilestones();
    //         setMilestones(milestones);
    //     };
    //     setupMilestones();
    // }, []);

    // if (milestones.length > 1) {
    //     formattedMilestones = milestones.map((milestone: Milestone) => {
    //         return (
    //             <div key={milestone._id}>
    //                 <div className="mt-8 flex items-center justify-start">
    //                     <div className="rounded-full bg-blue-400 w-10 h-10"></div>
    //                     <div className="ml-4 text-gray-500">
    //                         {new Date(milestone.deadline).toLocaleDateString(
    //                             undefined,
    //                             {
    //                                 month: "long",
    //                                 day: "numeric",
    //                                 year: "numeric",
    //                             }
    //                         )}
    //                     </div>
    //                 </div>
    //                 <div className="flex items-center justify-start w-full">
    //                     <div className="w-10"></div>
    //                     <div className="ml-4 w-5/6">
    //                         <div className="bg-white rounded-lg mt-4 pb-1">
    //                             <div className="flex justify-between">
    //                                 <div className="font-semiold text-md p-4">
    //                                     {milestone.title}
    //                                 </div>
    //                                 {milestone.owner ? (
    //                                     <Link
    //                                         to={`/edit/${milestone._id}`}
    //                                         className=" font-semibold text-green-600 p-4"
    //                                     >
    //                                         EDIT
    //                                     </Link>
    //                                 ) : (
    //                                     <></>
    //                                 )}
    //                             </div>
    //                             <div>
    //                                 <div className="p-4">
    //                                     {milestone.description}
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         );
    //     });
    // }
    return milestones.map((milestone: Milestone) => {
        return (
            <div key={milestone._id}>
                <div className="mt-8 flex items-center justify-start">
                    <div className="rounded-full bg-blue-400 w-10 h-10"></div>
                    <div className="ml-4 text-gray-500">
                        {new Date(milestone.started).toLocaleDateString(
                            undefined,
                            {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                            }
                        )}
                    </div>
                </div>
                <div className="flex items-center justify-start w-full">
                    <div className="w-10"></div>
                    <div className="ml-4 w-5/6">
                        <div className="bg-white rounded-lg mt-4 pb-1">
                            <div className="flex justify-between">
                                <div className="font-semiold text-md p-4">
                                    {milestone.title}
                                </div>
                                {milestone.owner ? (
                                    <Link
                                        to={`/edit/${milestone._id}`}
                                        className=" font-semibold text-green-600 p-4"
                                    >
                                        EDIT
                                    </Link>
                                ) : (
                                    <></>
                                )}
                            </div>
                            <div>
                                <div className="p-4">
                                    {milestone.description}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    });
};

export default MilestoneList;
