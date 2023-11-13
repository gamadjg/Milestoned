import { useState } from "react";
import MilestoneForm from "../components/MilestoneForm";
import MilestoneList from "../components/MilestoneList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";
type Milestone = {
    _id: string;
    title: string;
    description: string;
    started: string;
    deadline: string;
    status: string;
    owner: string;
};

// interface UserState {
//     user: User | null;
// }

// type User = {
//     milestones: Milestone[];
// };
// interface User {
//     user: string;
// }
const Dashboard = () => {
    const dispatch = useDispatch();
    // let milestones = sessionStorage.getItem("session_token") ? useSelector((state: RootState) => state.user?.user?.milestones) : []
    const user = useSelector((state: RootState) => state.user?.user);
    // let milestoneList: any = [];
    const [milestones, setMilestones] = useState<Milestone[]>(
        user?.milestones || []
    );
    return (
        <main className="w-full h-full overflow-y-scroll">
            <div className="flex flex-col md:flex-row w-full h-full">
                <div className="w-full md:w-1/2 h-full flex flex-col items-center">
                    <div className="bg-white rounded-lg w-full md:w-2/3 mt-8">
                        <div className="mx-2 md:mx-5">
                            <div className="p-2 md:p-4">
                                {/* <MilestoneForm /> */}
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
