// import { useState } from "react";
import MilestoneForm from "../components/MilestoneForm";
import MilestoneList from "../components/MilestoneList";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";
import { updateMilestones } from "../store/reducers/userSlice";
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
    // let milestones = sessionStorage.getItem("session_token") ? useSelector((state: RootState) => state.user?.user?.milestones) : []
    const user = useSelector((state: RootState) => state.user?.user);
    // const sessionToken = sessionStorage.getItem("session_token")
    //     ? sessionStorage.getItem("session_token")
    //     : null;

    // if (!user && sessionToken) {
    // const JWT_SECRET = "1234";
    // const jwt = jsonwebtoken;
    //     //     console.log("sessionToken: ", sessionToken);
    //     //     // const sessionToken = .getItem("session_token");
    //     //     const token = sessionToken.split(" ")[1];
    //     const decoded = jwt.verify(sessionToken, JWT_SECRET);
    //     console.log("decoded: ", decoded);
    //     //     // console.log(sessionToken);
    //     //     console.log(decoded);
    // }

    // const milestones = user?.milestones || [];
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

        // const newMilestone = (await createMilestone({
        //     title,
        //     description,
        //     deadline,
        //     status,
        //     tags,
        //     owner: user.id,
        // })) as Milestone;

        //     let milestones = JSON.parse(sessionStorage.getItem("milestones")!);
        //     milestones.push(newMilestone);
        //     console.log(milestones);
        //     sessionStorage.setItem("milestones", JSON.stringify(milestones));
        //     router.refresh();
        // } catch (error: any) {
        //     console.error("Milestone error:", error);
        //     // setErrors(error);
    };

    const milestone: Milestone = {
        title: "",
        started: "",
        status: "",
    };
    // let milestoneList: any = [];
    // const [milestones, setMilestones] = useState<Milestone[]>(
    //     user?.milestones || []
    // );
    return (
        <main className="w-full h-full overflow-y-scroll">
            <div className="flex flex-col md:flex-row w-full h-full">
                <div className="w-full md:w-1/2 h-full flex flex-col items-center">
                    <div className="bg-white rounded-lg w-full md:w-2/3 mt-8">
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
