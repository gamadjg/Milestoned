import MilestoneForm from "../components/MilestoneForm";
import MilestoneList from "../components/MilestoneList";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";
import { updateMilestones } from "../store/reducers/userSlice";
import { PopulateGuestMilestones } from "../hooks/PopulateGuestMilestones";

const Dashboard = () => {
    PopulateGuestMilestones();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user?.user);
    const guestMilestones = useSelector((state: RootState) => state.milestones);
    const [milestones, setMilestones] = useState<Milestone[]>([]);
    const [tags, setTags] = useState<string[]>(user?.tags || []);

    useEffect(() => {
        if (user) {
            setMilestones(user.milestones);
        } else {
            setMilestones(guestMilestones.milestones);
        }
    }, [guestMilestones.milestones, user]);

    const handleMilestone = (milestone: Milestone) => {
        console.log("handle milestone", milestone);
        const updatedMilestones = [...milestones, milestone];
        const sessionUser = sessionStorage.getItem("user");
        sessionStorage.setItem(
            "user",
            JSON.stringify({
                ...JSON.parse(sessionUser!),
                milestones: updatedMilestones,
            })
        );
        dispatch(updateMilestones(updatedMilestones));
        setMilestones(updatedMilestones);
        setTags(user?.tags || []);
    };

    return (
        <main className="w-full h-full overflow-y-scroll">
            <div className="flex flex-col md:flex-row w-full h-full">
                <div className="w-full md:w-1/2 h-full flex flex-col items-center">
                    <div className="bg-white rounded-lg w-11/12 md:w-2/3 mt-8">
                        <div className="mx-2 md:mx-5">
                            <div className="p-2 md:p-4">
                                <MilestoneForm
                                    handleMilestone={handleMilestone}
                                    newMilestone={true}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg w-11/12 md:w-2/3 mt-8">
                        <div className="mx-2 md:mx-5">
                            <div className="p-2 md:p-4">
                                <div className="font-semibold text-xl mb-4">
                                    Tags
                                </div>
                                <div className="flex flex-wrap">
                                    {tags.map((tag) => (
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
                <div className="w-full md:w-1/2 h-full overflow-y-scroll pb-10">
                    <MilestoneList milestones={milestones} />
                </div>
            </div>
        </main>
    );
};

export default Dashboard;
