// import { useState } from "react";
import MilestoneForm from "../components/MilestoneForm";
import MilestoneList from "../components/MilestoneList";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";
import { updateMilestones } from "../store/reducers/userSlice";
// import Resizer from "react-image-file-resizer";
// import jsonwebtoken from "jsonwebtoken";
type Milestone = {
    _id?: string;
    title: string;
    description?: string;
    started: string;
    deadline?: string;
    status: string;
    owner?: string;
};

const Dashboard = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user?.user);
    const [milestones, setMilestones] = useState<Milestone[]>(
        user?.milestones || []
    );
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
    };

    const milestone: Milestone = {
        title: "",
        started: "",
        status: "",
    };

    return (
        <main className="w-full h-full overflow-y-scroll">
            <div className="flex flex-col md:flex-row w-full h-full">
                <div className="w-full md:w-1/2 h-full flex flex-col items-center">
                    <div className="bg-white rounded-lg w-11/12 md:w-2/3 mt-8">
                        <div className="mx-2 md:mx-5">
                            <div className="p-2 md:p-4">
                                <MilestoneForm
                                    milestone={milestone}
                                    handleMilestone={handleMilestone}
                                    newMilestone={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/2 h-full overflow-y-scroll">
                    <MilestoneList milestones={milestones} />
                </div>
            </div>
        </main>
    );
};

export default Dashboard;
