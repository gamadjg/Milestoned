import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { setMilestones } from "../store/reducers/milestoneSlice";
import { RootState } from "../store/rootReducer";

export const PopulateGuestMilestones = async () => {
    const dispatch = useDispatch();
    const milestones = useSelector(
        (state: RootState) => state.milestones.milestones
    );
    if (milestones.length === 0) {
        const res = await axios.get(
            `${import.meta.env.VITE_APP_API_HOST}/api/milestones/public`
        );
        dispatch(setMilestones(res.data));
    }
};
