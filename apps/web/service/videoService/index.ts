import axios from "axios"

const getAllVideos = async (trackId: string) => {
    try {
        const response = await axios.get(`/api/video?trackId=${trackId}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
};

export {
    getAllVideos
}