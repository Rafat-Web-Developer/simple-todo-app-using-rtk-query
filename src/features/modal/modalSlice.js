import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  active: false,
  editTodoId: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModel: (state, action) => {
      state.active = true;
      state.editTodoId = action.payload;
    },
    cancleModel: (state) => {
      state.active = false;
      state.editTodoId = null;
    },
  },
});

export default modalSlice.reducer;
export const { showModel, cancleModel } = modalSlice.actions;
