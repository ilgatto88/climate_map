import { createSlice } from "@reduxjs/toolkit";

export const historicalDataReducerSlice = createSlice({
  name: "historicalDataHandler",
  initialState: {
    value: false,
  },
  reducers: {
    show: (state) => ({ ...state, value: true }),
    hide: (state) => ({ ...state, value: false }),
  },
});

export const { show, hide } = historicalDataReducerSlice.actions;

export default historicalDataReducerSlice.reducer;
