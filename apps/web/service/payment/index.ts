import axios from "axios";

const checkout = async () => {
    try {
        const response = await axios.post(`/api/stripe/checkout`, {
            headers: { "Content-Type": "application/json"}
        });
        console.log("checkout response", response);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

const getSession = async (session_id: string) => {
    try {
        const response = await axios.get(`/api/stripe/session-fetch?session_id=${session_id}`);
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.log(error);
        return error
    }
};

const manageBilling = async () => {
    try {
        const response = await axios.post(`/api/stripe/manage-billing`);
        console.log(response);
        return response?.data?.data;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export {
    checkout,
    getSession,
    manageBilling
};