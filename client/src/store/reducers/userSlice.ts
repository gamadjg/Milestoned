import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import popultaTags from "../../lib/populateTags";

type User = {
    email: string;
    id: string;
    milestones: Milestone[];
    tags: string[];
};

type UserState = {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
};

const initialState: UserState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null;
            state.user.tags = popultaTags(action.payload.milestones);
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
        },
        updateMilestones: (state, action: PayloadAction<Milestone[]>) => {
            if (state.user) {
                state.user.milestones = action.payload;
                state.user.tags = popultaTags(action.payload);
            }
        },
    },
});

export const { loginSuccess, logout, updateMilestones } = userSlice.actions;
export default userSlice.reducer;
