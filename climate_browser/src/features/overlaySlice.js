import { createSlice } from "@reduxjs/toolkit";

export const overlayReducerSlice = createSlice({
  name: "overlayHandler",
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

export const { show, hide } = overlayReducerSlice.actions;

export default overlayReducerSlice.reducer;
