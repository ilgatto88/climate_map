import { createSlice } from "@reduxjs/toolkit";

export const overlayReducerSlice = createSlice({
  name: "overlayHandler",
  initialState: {
    value: false,
  },
  reducers: {
    show: (state) => ({ ...state, value: true }),
    hide: (state) => ({ ...state, value: false }),
  },
});

export const { show, hide } = overlayReducerSlice.actions;

export default overlayReducerSlice.reducer;
