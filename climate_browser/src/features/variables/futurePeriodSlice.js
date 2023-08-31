import { createSlice } from "@reduxjs/toolkit";

export const futurePeriodReducerSlice = createSlice({
  name: "futurePeriodHandler",
  initialState: {
    value: "2036-2065",
  },
  reducers: {
    changeFuturePeriod: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.value = action.payload;
    },
  },
});

export const { changeFuturePeriod } = futurePeriodReducerSlice.actions;

export default futurePeriodReducerSlice.reducer;
