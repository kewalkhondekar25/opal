import { createSlice } from "@reduxjs/toolkit";

interface Imedia {
    isUpload: boolean;
    isRecord: boolean;
    isRecording: boolean;
    url: string;
};

const initialState: Imedia = {
    isUpload: false,
    isRecord: false,
    isRecording: false,
    url: ""
};

const mediaSlice = createSlice({
    name: "media",
    initialState,
    reducers: {
        upload: (state) => {
            state.isUpload = !state.isUpload;
        },
        record: (state) => {
            state.isRecord = !state.isRecord;
        },
        recording: (state) => {
            state.isRecording = !state.isRecording;
        },
        setUrl: (state, action) => {
            state.url = action.payload;
        }
    }
});

export const { 
    upload, 
    record, 
    recording, 
    setUrl 
} = mediaSlice.actions;
export default mediaSlice.reducer;