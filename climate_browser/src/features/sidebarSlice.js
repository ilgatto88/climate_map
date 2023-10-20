import { createSlice } from "@reduxjs/toolkit";

export const sidebarReducerSlice = createSlice({
  name: "sidebarHandler",
  initialState: {
    value: false,
  },
  reducers: {
    open: (state) => ({ ...state, value: true }),
    close: (state) => ({ ...state, value: false }),
  },
});

export const { open, close } = sidebarReducerSlice.actions;

export default sidebarReducerSlice.reducer;
