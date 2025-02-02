import { createSlice } from "@reduxjs/toolkit";

export const municipalityIdReducerSlice = createSlice({
  name: "municipalityIdHandler",
  initialState: {
    value: "10101",
  },
  reducers: {
    changeMunicipalityId: (state, action) => ({
      ...state,
      value: action.payload,
    }),
  },
});

export const { changeMunicipalityId } = municipalityIdReducerSlice.actions;

export default municipalityIdReducerSlice.reducer;
