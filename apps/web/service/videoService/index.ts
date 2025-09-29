import axios from "axios"

const getAllVideos = async (trackId: string) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/video?trackId=${trackId}`);
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
};

export {
    getAllVideos
}