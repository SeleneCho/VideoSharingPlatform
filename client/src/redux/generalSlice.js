import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSideOpen: true,
  isUploadOpen: false,
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    openSide: (state) => {
      if (state.isSideOpen) {
        state.isSideOpen = false;
      } else {
        state.isSideOpen = true;
      }
    },
    openUpload: (state) => {
      state.isUploadOpen = true;
    },
    closeUpload: (state) => {
      state.isUploadOpen = false;
    },
  },
});

export const { openSide, openUpload, closeUpload } = generalSlice.actions;

export default generalSlice.reducer;
