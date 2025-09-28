import { createSlice } from "@reduxjs/toolkit";

interface IVideo {
    isLoading: boolean;
    tracks: [];
    videos: string[]
};

const initialState: IVideo = {
    isLoading: false,
    tracks: [],
    videos: []
};

const videoSlice =  createSlice({
    name: "video",
    initialState,
    reducers: {
        setTracks: (state, action) => {
            state.tracks = action.payload;
        },
        setVideos: (state, action) => {
            state.videos = action.payload;
        },
        setIsLoading: (state) => {
            state.isLoading = !state.isLoading
        }
    }
});

export const {
    setTracks,
    setVideos,
    setIsLoading
} = videoSlice.actions;
export default videoSlice.reducer;