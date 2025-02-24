import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brands: [],
};

const brands = createSlice({
  name: "brands",
  initialState,
  reducers: {
    addBrands: (state, action) => {
      state.brands = action.payload;
    },
  },
});

export const { addBrands } = brands.actions;
export default brands.reducer;
