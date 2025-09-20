import { configureStore } from "@reduxjs/toolkit";
import mediaSliceReducer from "@/store/slices/mediaSlice"; 

export const store = configureStore({
    reducer: {
        media: mediaSliceReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;