import { createSlice } from "@reduxjs/toolkit";

export const infoReducerSlice = createSlice({
  name: "infoHandler",
  initialState: {
    value: false,
  },
  reducers: {
    showInfo: (state) => ({ ...state, value: true }),
    hideInfo: (state) => ({ ...state, value: false }),
  },
});

export const { showInfo, hideInfo } = infoReducerSlice.actions;

export default infoReducerSlice.reducer;
