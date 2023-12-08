import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateTypes = {
    milestones: Milestone[];
    loading: boolean;
    error: string | null;
};

const initialState: initialStateTypes = {
    milestones: [],
    loading: false,
    error: null,
};

const milestoneSlice = createSlice({
    name: "milestones",
    initialState,
    reducers: {
        setMilestones: (state, action: PayloadAction<Milestone[]>) => {
            state.milestones = action.payload;
        },
        // addMilestone: (state, action: PayloadAction<Milestone>) => {
        //     state.milestones.push(action.payload);
        // },
        // updateMilestone: (state, action: PayloadAction<Milestone>) => {
        //     const index = state.milestones.findIndex(
        //         (milestone) => milestone._id === action.payload._id
        //     );
        //     state.milestones[index] = action.payload;
        // },
        // deleteMilestone: (state, action: PayloadAction<string>) => {
        //     const index = state.milestones.findIndex(
        //         (milestone) => milestone._id === action.payload
        //     );
        //     state.milestones.splice(index, 1);
        // },
    },
});

export const { setMilestones } = milestoneSlice.actions;
export default milestoneSlice.reducer;
