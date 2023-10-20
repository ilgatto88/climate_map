import { createSlice } from "@reduxjs/toolkit";

export const historicalPeriodReducerSlice = createSlice({
  name: "historicalPeriodHandler",
  initialState: {
    value: "1991-2020",
  },
  reducers: {
    changeHistoricalPeriod: (state, action) => ({
      ...state,
      value: action.payload,
    }),
  },
});

export const { changeHistoricalPeriod } = historicalPeriodReducerSlice.actions;

export default historicalPeriodReducerSlice.reducer;
