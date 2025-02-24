import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedAddress: null,
  totalAmount: 0,
  PaymentType: null,
  shippingOption: null,
};

const checkout = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
    },
    setPaymentType: (state, action) => {
      state.PaymentType = action.payload;
    },
    setShippingOptions: (state, action) => {
      state.shippingOption = action.payload;
    },
    resetCheckout: (state) => {
      state.selectedAddress = null;
      state.totalAmount = 0;
      state.paymentType = null;
      state.shippingOption = null;
    },
  },
});

export const {
  setAddress,
  setTotalAmount,
  setPaymentType,
  resetCheckout,
  setShippingOptions,
} = checkout.actions;
export default checkout.reducer;
