import { createSlice } from "@reduxjs/toolkit";

interface IVideo {
    tracks: []
};

const initialState: IVideo = {
    tracks: []
};

const videoSlice =  createSlice({
    name: "video",
    initialState,
    reducers: {
        setTracks: (state, action) => {
            state.tracks = action.payload;
        }
    }
});

export const {
    setTracks
} = videoSlice.actions;
export default videoSlice.reducer;