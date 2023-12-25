import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { setGuest } from "../store/reducers/milestoneSlice";
import { RootState } from "../store/rootReducer";
import { loginSuccess } from "../store/reducers/userSlice";

export const SetupGuest = async () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user?.user);
    const guestMilestones = useSelector((state: RootState) => state.milestones);
    const sessionUser = sessionStorage.getItem("user")
        ? sessionStorage.getItem("user")
        : null;
    const sessionGuestMilestones = sessionStorage.getItem("guestMilestones")
        ? sessionStorage.getItem("guestMilestones")
        : null;

    if (!user && sessionUser) {
        const loginUser = JSON.parse(sessionUser);
        dispatch(loginSuccess(loginUser));
    } else if (
        guestMilestones.milestones.length == 0 &&
        sessionGuestMilestones
    ) {
        const sessionMilestones = JSON.parse(sessionGuestMilestones!);
        dispatch(setGuest(sessionMilestones));
    } else if (
        guestMilestones.milestones.length == 0 &&
        !sessionGuestMilestones
    ) {
        const res = await axios.get(
            `${import.meta.env.VITE_APP_API_HOST}/api/milestones/public`
        );
        sessionStorage.setItem("guestMilestones", JSON.stringify(res.data));
        dispatch(setGuest(res.data));
    }

    // if (!sessionGuestMilestones) {
    // } else {
    //     const guestMilestones = JSON.parse(sessionGuestMilestones!);
    //     dispatch(setGuest(guestMilestones));
    // }
    // if (milestones.length === 0) {
    //     console.log("guest milestones empty");
    //     const res = await axios.get(
    //         `${import.meta.env.VITE_APP_API_HOST}/api/milestones/public`
    //     );
    //     dispatch(setGuest(res.data));
    // }
};
