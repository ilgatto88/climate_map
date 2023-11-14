import { createSlice } from "@reduxjs/toolkit";

export const scenarioBarReducerSlice = createSlice({
  name: "scenarioBarHandler",
  initialState: {
    value: false,
  },
  reducers: {
    showScenarioBar: (state) => ({ ...state, value: true }),
    hideScenarioBar: (state) => ({ ...state, value: false }),
  },
});

export const { showScenarioBar, hideScenarioBar } =
  scenarioBarReducerSlice.actions;

export default scenarioBarReducerSlice.reducer;
