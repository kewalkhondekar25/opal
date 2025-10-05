import axios from "axios"

const fetchCredits = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/track-credit`);
        console.log(response);
        return response.data?.data
    } catch (error) {
        console.log(error);
        return error
    }
};

export {
    fetchCredits
}