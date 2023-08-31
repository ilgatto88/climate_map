import { createSlice } from "@reduxjs/toolkit";

export const historicalDataReducerSlice = createSlice({
  name: "historicalDataHandler",
  initialState: {
    value: false,
  },
  reducers: {
    show: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.value = true;
    },
    hide: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.value = false;
    },
  },
});

export const { show, hide } = historicalDataReducerSlice.actions;

export default historicalDataReducerSlice.reducer;
