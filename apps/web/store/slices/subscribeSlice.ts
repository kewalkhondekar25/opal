import { createSlice } from "@reduxjs/toolkit";

interface Istate {
    isActive: boolean,
    subscriptionStatus: string;
    trackCount: number;//credit-track
    nextBillingDate: string
};

const initialState: Istate = {
    isActive: false,
    subscriptionStatus: "",
    trackCount: 0,
    nextBillingDate: ""
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
        },
        setCreditTrackCount: (state, action) => {
            state.trackCount = action.payload;
        },
        setNextBillingDate: (state, action) => {
            state.nextBillingDate = action.payload;
        }
    }
});

export const {
    setIsActive,
    setSubscriptionStatus,
    setCreditTrackCount,
    setNextBillingDate
} = subscribeSlice.actions;
export default subscribeSlice.reducer;