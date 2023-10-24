import { createSlice } from "@reduxjs/toolkit";

export const aboutReducerSlice = createSlice({
  name: "aboutHandler",
  initialState: {
    value: false,
  },
  reducers: {
    showAbout: (state) => ({ ...state, value: true }),
    hideAbout: (state) => ({ ...state, value: false }),
  },
});

export const { showAbout, hideAbout } = aboutReducerSlice.actions;

export default aboutReducerSlice.reducer;
