import { Link } from "react-router-dom";

type Props = {
    milestones: Milestone[];
};

const MilestoneList = ({ milestones }: Props) => {
    console.log("milestones", milestones);
    let sortedMilestones: Milestone[] = [...milestones];
    sortedMilestones = sortedMilestones.sort((a, b) => {
        return new Date(a.deadline).getDate() - new Date(b.deadline).getDate();
    });
    sortedMilestones.reverse();
    console.log(sortedMilestones);

    return sortedMilestones.map((milestone: Milestone) => {
        return (
            <div key={milestone._id}>
                <div className="mt-8 flex items-center justify-start">
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
