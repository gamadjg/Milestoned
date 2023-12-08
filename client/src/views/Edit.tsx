import { useParams } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../store/rootReducer";
import MilestoneForm from "../components/MilestoneForm";
import { updateMilestones } from "../store/reducers/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import Delete from "../components/Delete";

const Edit = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user.user);
    const mKey = user!.milestones.findIndex((item: Milestone) => {
        return item._id == params._id;
    });

    const handleMilestone = (milestone: Milestone) => {
        const sessionUser = sessionStorage.getItem("user");
        const sessionMilestones = JSON.parse(sessionUser!).milestones;
        const updatedMilestone = { ...sessionMilestones[mKey], ...milestone };
        sessionMilestones[mKey] = updatedMilestone;
        sessionStorage.setItem(
            "user",
            JSON.stringify({
                ...JSON.parse(sessionUser!),
                milestones: sessionMilestones,
            })
        );
        dispatch(updateMilestones(sessionMilestones));
        navigate("/dashboard");
    };

    const handleDelete = async () => {
        try {
            await axios.delete(
                `http://localhost:8000/api/milestones/${params._id}`
            );
            const sessionUser = sessionStorage.getItem("user");
            const parsedUser = JSON.parse(sessionUser!);
            const updatedMilestones = parsedUser.milestones.filter(
                (item: Milestone) => {
                    return item._id != params._id;
                }
            );
            sessionStorage.setItem(
                "user",
                JSON.stringify({
                    ...parsedUser,
                    milestones: updatedMilestones,
                })
            );
            dispatch(updateMilestones(updatedMilestones));
            navigate("/dashboard");
        } catch (error) {
            console.error("Error deleting milestones:", error);
        }
    };

    return (
        <div className="w-full h-full flex items-center justify-center m-auto">
            <div className="bg-white rounded-lg md:max-w-[900px] w-11/12">
                <div className="mx-2 md:mx-5">
                    <div className="p-2 md:p-4">
                        <div className="flex justify-between items-center mb-2 py-3">
                            <div className="font-semibold text-xl">
                                Edit Milestone
                            </div>
                            <Delete handleDelete={handleDelete} />
                        </div>
                        <MilestoneForm
                            milestone={user!.milestones[mKey]}
                            handleMilestone={handleMilestone}
                            newMilestone={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Edit;
