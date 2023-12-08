import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import milestoneSlice from "./reducers/milestoneSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        milestones: milestoneSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
