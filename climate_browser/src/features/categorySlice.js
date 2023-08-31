import { createSlice } from "@reduxjs/toolkit";

export const categoryReducerSlice = createSlice({
  name: "categoryHandler",
  initialState: {
    value: null,
  },
  reducers: {
    changeCategory: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.value = action.payload;
    },
  },
});

export const { changeCategory } = categoryReducerSlice.actions;

export default categoryReducerSlice.reducer;
