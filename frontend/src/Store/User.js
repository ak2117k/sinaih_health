import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});
export const { addUser, clearUser } = user.actions;
export default user.reducer;
