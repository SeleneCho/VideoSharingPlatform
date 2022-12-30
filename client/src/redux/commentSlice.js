import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentComments: null,
  userId: null,
  videoId: null,
  desc: "",
  loading: false,
  error: false,
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    addCommentStart: (state) => {
      state.loading = true;
    },
    addCommentSuccess: (state, action) => {
      state.loading = false;
      state.userId = action.payload.userId;
      state.videoId = action.payload.videoId;
      state.desc = action.payload.desc;
    },
    addCommentFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.currentComments = action.payload;
    },
    fetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  addCommentStart,
  addCommentSuccess,
  addCommentFailure,
  fetchStart,
  fetchSuccess,
  fetchFailure,
} = commentSlice.actions;

export default commentSlice.reducer;
