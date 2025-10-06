import axios from "axios"

const fetchSubscription = async () => {
    try {
        const response = await axios.get(`/api/stripe/subscription/get`);
        console.log(response);
        return response?.data?.data;
    } catch (error) {
        console.log(error);
        return error
    }
};

export {
    fetchSubscription
}