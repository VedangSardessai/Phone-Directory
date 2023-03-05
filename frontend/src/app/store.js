import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "../reducers/contactSlice";

export const store = configureStore({
  reducer: {
    contactReducer,
  },
});
