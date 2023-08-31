import { createSlice } from "@reduxjs/toolkit";

export const sidebarReducerSlice = createSlice({
  name: "sidebarHandler",
  initialState: {
    value: false,
  },
  reducers: {
    open: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.value = true;
    },
    close: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.value = false;
    },
  },
});

export const { open, close } = sidebarReducerSlice.actions;

export default sidebarReducerSlice.reducer;
