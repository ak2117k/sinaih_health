import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: null,
  quantity: 0,
  address: null,
};

const buynowprod = createSlice({
  name: "buynowprod",
  initialState,
  reducers: {
    addproduct: (state, action) => {
      state.product = action.payload;
    },
    productquantity: (state, action) => {
      state.quantity = action.payload;
    },
    addAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});

export const { addproduct, productquantity, addAddress } = buynowprod.actions;
export default buynowprod.reducer;
