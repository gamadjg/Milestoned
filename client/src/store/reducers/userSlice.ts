import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Milestone = {
    _id?: string;
    title: string;
    description?: string;
    started: string;
    deadline?: string;
    status: string;
    owner?: string;
};
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
    // milestones: [],
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<User>) => {
            console.log(state, action);
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null;
        },
        // loginFailure: (state, action: PayloadAction<string>) => {
        //     state.user = null;
        //     state.isAuthenticated = false;
        //     state.loading = false;
        //     state.error = action.payload;
        // },
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

export const {
    loginSuccess,
    // loginFailure,
    logout,
    updateMilestones,
} = userSlice.actions;
export default userSlice.reducer;
