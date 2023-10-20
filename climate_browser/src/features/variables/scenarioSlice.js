import { createSlice } from "@reduxjs/toolkit";

export const scenarioReducerSlice = createSlice({
  name: "scenarioHandler",
  initialState: {
    value: "rcp85",
  },
  reducers: {
    changeScenario: (state, action) => ({ ...state, value: action.payload }),
  },
});

export const { changeScenario } = scenarioReducerSlice.actions;

export default scenarioReducerSlice.reducer;
