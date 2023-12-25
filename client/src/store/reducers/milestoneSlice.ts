import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import populateTags from "../../lib/populateTags";

type initialStateTypes = {
    milestones: Milestone[];
    tags: string[];
    loading: boolean;
    error: string | null;
};

const initialState: initialStateTypes = {
    milestones: [],
    tags: [],
    loading: false,
    error: null,
};

const milestoneSlice = createSlice({
    name: "milestones",
    initialState,
    reducers: {
        setGuest: (state, action: PayloadAction<Milestone[]>) => {
            state.milestones = action.payload;
            state.tags = populateTags(action.payload);
        },
    },
});

export const { setGuest } = milestoneSlice.actions;
export default milestoneSlice.reducer;
