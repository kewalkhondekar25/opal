import { createSlice } from "@reduxjs/toolkit";

interface IVideo {
    title: string;
    isLoading: boolean;
    tracks: [];
    videos: string[]
};

const initialState: IVideo = {
    title: "",
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
        },
        setTitle: (state, action) => {
            state.title = action.payload
        }
    }
});

export const {
    setTracks,
    setVideos,
    setIsLoading,
    setTitle
} = videoSlice.actions;
export default videoSlice.reducer;