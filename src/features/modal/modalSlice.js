import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  active: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModel: (state) => {
      state.active = true;
    },
    cancleModel: (state) => {
      state.active = false;
    },
  },
});

export default modalSlice.reducer;
export const { showModel, cancleModel } = modalSlice.actions;
