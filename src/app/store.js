import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import filterReducer from "../features/filter/filterSlice";
import modalReducer from "../features/modal/modalSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    modal: modalReducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleres) =>
    getDefaultMiddleres().concat(apiSlice.middleware),
});
