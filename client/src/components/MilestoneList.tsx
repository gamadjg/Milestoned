import { Link } from "react-router-dom";

type Props = {
    milestones: Milestone[];
};

const MilestoneList = ({ milestones }: Props) => {
    console.log("milestones", milestones);
    let sortedMilestones: Milestone[] = [...milestones];
    sortedMilestones = sortedMilestones.sort((a, b) => {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    });

    return sortedMilestones.map((milestone: Milestone) => {
        return (
            <div key={milestone._id}>
                <div className="mt-4 flex items-center justify-start">
                    <div className="rounded-full bg-blue-400 w-10 h-10"></div>
                    <div className="ml-4 text-gray-500">
                        {new Date(milestone.deadline).toLocaleDateString(
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
                    {/* <div className="w-10 h-full"></div> */}
                    <div className="border-l-2 border-[#BFDBFE] pl-4 mt-4 ml-5 w-5/6">
                        <div className="bg-white rounded-lg pb-1">
                            <div className="flex justify-between">
                                <div className="font-semibold text-base p-4">
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
                            <div className="px-4">
                                <div className="font-normal text-sm pb-2">
                                    {milestone.description}
                                </div>
                                <div className="flex pb-2">
                                    {milestone.tags?.map((tag) => (
                                        <div
                                            key={tag}
                                            className="bg-gray-400 text-gray-700 rounded-lg text-base px-3 py-1 mr-2 mb-2"
                                        >
                                            {tag}
                                        </div>
                                    ))}
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
