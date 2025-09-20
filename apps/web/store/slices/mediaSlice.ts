import { createSlice } from "@reduxjs/toolkit";

interface Imedia {
    isUpload: boolean;
    isRecord: boolean;
};

const initialState: Imedia = {
    isUpload: false,
    isRecord: false
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
        }
    }
});

export const { upload, record } = mediaSlice.actions;
export default mediaSlice.reducer;