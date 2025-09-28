import { configureStore } from "@reduxjs/toolkit";
import mediaSliceReducer from "@/store/slices/mediaSlice";
import videoSliceReducer from "@/store/slices/videoSlice";

export const store = configureStore({
    reducer: {
        media: mediaSliceReducer,
        video: videoSliceReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;