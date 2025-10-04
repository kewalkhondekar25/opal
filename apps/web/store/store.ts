import { configureStore } from "@reduxjs/toolkit";
import mediaSliceReducer from "@/store/slices/mediaSlice";
import videoSliceReducer from "@/store/slices/videoSlice";
import notificationsSlice from "@/store/slices/notificationSlice";
import subscribeSlice from "@/store/slices/subscribeSlice";

export const store = configureStore({
    reducer: {
        media: mediaSliceReducer,
        video: videoSliceReducer,
        notifications: notificationsSlice,
        subscribe: subscribeSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;