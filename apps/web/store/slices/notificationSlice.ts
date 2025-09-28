import { createSlice } from "@reduxjs/toolkit";

interface INotification {
    id: string,
    userId: string
    title: string,
    subTitle: string,
    isRead: boolean,
    createdAt: string,
    updatedAt: string,
};

interface INotifications {
    notifications: INotification[];
    isNotificationLoading: boolean
};

const initialState: INotifications = {
    notifications: [],
    isNotificationLoading: false
};

const notificationSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        setIsNotificationLoading: (state) => {
            state.isNotificationLoading = !state.isNotificationLoading;
        },
        setNotification: (state, action) => {
            state.notifications = action.payload
        },
        updateNotification: (state, action) => {
            const notification = state.notifications.find(item => item.id === action.payload);
            if(notification){
                notification.isRead = true;
            }
        }
    }
});

export const {
    setNotification,
    updateNotification,
    setIsNotificationLoading
} = notificationSlice.actions;

export default notificationSlice.reducer;