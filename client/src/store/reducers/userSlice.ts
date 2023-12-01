import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
    email: string;
    id: string;
    milestones: Milestone[];
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
            }
        },
    },
});

export const { loginSuccess, logout, updateMilestones } = userSlice.actions;
export default userSlice.reducer;
