import axios from "axios"

const fetchAllNotifications = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/notifications`);
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
};

const updateNotifications = async (notificationId: string) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/notifications`, { notificationId });
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
};

export {
    fetchAllNotifications,
    updateNotifications
}