import { configureStore } from "@reduxjs/toolkit";
import mediaSliceReducer from "@/store/slices/mediaSlice";
import videoSliceReducer from "@/store/slices/videoSlice";
import notificationsSlice from "@/store/slices/notificationSlice";

export const store = configureStore({
    reducer: {
        media: mediaSliceReducer,
        video: videoSliceReducer,
        notifications: notificationsSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;