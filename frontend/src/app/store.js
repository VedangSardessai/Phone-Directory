import { configureStore } from "@reduxjs/toolkit";
import addContact from "../reducers/contactSlice";
import { composeWithDevTools } from "redux-devtools-extension";

export const store = configureStore({
  reducer: {
    contact: addContact,
  },
  devTools: composeWithDevTools(),
});
