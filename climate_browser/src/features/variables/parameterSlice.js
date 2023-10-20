import { createSlice } from "@reduxjs/toolkit";

export const parameterReducerSlice = createSlice({
  name: "parameterHandler",
  initialState: {
    value: "tm",
  },
  reducers: {
    changeParameter: (state, action) => ({ ...state, value: action.payload }),
  },
});

export const { changeParameter } = parameterReducerSlice.actions;

export default parameterReducerSlice.reducer;
