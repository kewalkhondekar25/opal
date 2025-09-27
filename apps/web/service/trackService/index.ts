import axios from "axios"

const createTrack = async () => {
    try {
        const response = await axios.post("/api/track-id/create");
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
};

export {
    createTrack
};