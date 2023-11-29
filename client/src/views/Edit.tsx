// import React, { useEffect, useState, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../store/rootReducer";
import MilestoneForm from "../components/MilestoneForm";
import { updateMilestones } from "../store/reducers/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
// import { Link } from "react-router-dom";

type Milestone = {
    _id?: string;
    title: string;
    description?: string;
    started: string;
    deadline?: string;
    status: string;
    owner?: string;
};

const Edit = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user.user);
    const mKey = user!.milestones.findIndex((item: Milestone) => {
        return item._id == params._id;
    });

    const handleMilestone = (milestone: Milestone) => {
        console.log("handle milestone", milestone);
        const sessionUser = sessionStorage.getItem("user");
        const sessionMilestones = JSON.parse(sessionUser!).milestones;
        const updatedMilestone = { ...sessionMilestones[mKey], ...milestone };
        // const updatedMilestones = [...sessionMilestones];
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
        console.log("delete initiated");
        try {
            // const client = BuildClient({ req: undefined });
            const res = await axios.delete(
                `http://localhost:8000/api/milestones/${params._id}`
            );
            console.log("delete response", res);
            const sessionUser = sessionStorage.getItem("user");
            const parsedUser = JSON.parse(sessionUser!);
            // const sessionMilestones = parsedUser.milestones;
            const updatedMilestones = parsedUser.milestones.filter(
                (item: Milestone) => {
                    return item._id != params._id;
                }
            );
            console.log("updated milestones", updatedMilestones);
            // const updatedMilestones = [...sessionMilestones];
            // sessionMilestones[mKey] = updatedMilestone;
            sessionStorage.setItem(
                "user",
                JSON.stringify({
                    ...parsedUser,
                    milestones: updatedMilestones,
                })
            );

            // console.log(res); // delete successful
            dispatch(updateMilestones(updatedMilestones));
            // console.log("store updated");
            navigate("/dashboard");
        } catch (error) {
            console.error("Error deleting milestones:", error);
        }
    };

    return (
        <div className="w-full h-full flex items-center justify-center m-auto">
            {/* <div className="w-full md:w-1/2 h-full flex flex-col items-center"> */}
            <div className="bg-white rounded-lg lg:max-w-[900px] sm:w-2/3">
                <div className="mx-2 md:mx-5">
                    <div className="p-2 md:p-4">
                        <MilestoneForm
                            milestone={user!.milestones[mKey]}
                            handleMilestone={handleMilestone}
                            newMilestone={false}
                            handleDelete={handleDelete}
                        />
                    </div>
                </div>
            </div>
            {/* </div> */}
        </div>
    );
};

export default Edit;
