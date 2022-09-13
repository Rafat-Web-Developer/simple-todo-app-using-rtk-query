import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "",
  colors: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setColor: (state, action) => {
      state.colors.push(action.payload);
    },
    removeColor: (state, action) => {
      const index = state.colors.indexOf(action.payload);
      if (index > -1) {
        state.colors.splice(index, 1);
      }
    },
    resetFilter: (state) => {
      state.status = "";
      state.colors = [];
    },
  },
});

export default filterSlice.reducer;
export const { setStatus, setColor, removeColor, resetFilter } =
  filterSlice.actions;
