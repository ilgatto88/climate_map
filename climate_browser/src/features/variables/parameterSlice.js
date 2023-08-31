import { createSlice } from "@reduxjs/toolkit";

export const parameterReducerSlice = createSlice({
  name: "parameterHandler",
  initialState: {
    value: "Mean temperature [°C]",
  },
  reducers: {
    changeParameter: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.value = action.payload;
    },
  },
});

export const { changeParameter } = parameterReducerSlice.actions;

export default parameterReducerSlice.reducer;
