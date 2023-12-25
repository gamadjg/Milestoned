import MilestoneForm from "../components/MilestoneForm";
import MilestoneList from "../components/MilestoneList";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";
import { updateMilestones } from "../store/reducers/userSlice";
import { SetupGuest } from "../hooks/SetupGuest";

import { setGuest } from "../store/reducers/milestoneSlice";
const Dashboard = () => {
    SetupGuest();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user?.user);
    const guestMilestones = useSelector((state: RootState) => state.milestones);
    const [milestones, setMilestones] = useState<Milestone[]>([]);
    const [tags, setTags] = useState<string[]>([]);

    useEffect(() => {
        if (user) {
            console.log("setting user milestones");
            setMilestones(user.milestones);
            setTags(user.tags!);
        } else {
            setMilestones(guestMilestones.milestones);
            setTags(guestMilestones.tags!);
        }
    }, [user, guestMilestones]);

    const handleMilestone = (milestone: Milestone) => {
        const updatedMilestones = [...milestones, milestone];
        const updatedTags = [...tags, milestone.tags];
        const sessionUser = sessionStorage.getItem("user");

        if (sessionUser) {
            sessionStorage.setItem(
                "user",
                JSON.stringify({
                    ...JSON.parse(sessionUser!),
                    milestones: updatedMilestones,
                })
            );
            dispatch(updateMilestones(updatedMilestones));
        } else {
            sessionStorage.setItem(
                "guestMilestones",
                JSON.stringify(updatedMilestones)
            );
            dispatch(setGuest(updatedMilestones));
        }
        setMilestones(updatedMilestones);
        setTags(updatedTags.flat());
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
                                            className="bg-[#CCEEFF] text-gray-700 rounded-lg text-base px-3 py-1 mr-2 mb-2"
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
