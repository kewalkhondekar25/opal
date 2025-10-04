import { createSlice } from "@reduxjs/toolkit";

interface Istate {
    isActive: boolean,
    subscriptionStatus: string
};

const initialState: Istate = {
    isActive: false,
    subscriptionStatus: ""
};

const subscribeSlice = createSlice({
    name: "subscription",
    initialState,
    reducers: {
        setIsActive: (state, action) => {
            state.isActive = action.payload;
        },
        setSubscriptionStatus: (state, action) => {
            state.subscriptionStatus = action.payload;
        }
    }
});

export const {
    setIsActive,
    setSubscriptionStatus
} = subscribeSlice.actions;
export default subscribeSlice.reducer;