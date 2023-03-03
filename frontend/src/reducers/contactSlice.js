import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: 0, name: "Vedang", number: 7820967372 },
  { id: 1, name: "Vedang", number: 8999785521 },
];

export const contactSLice = createSlice({
  name: "contact",
  initialState,

  reducers: {
    addContact: (state = initialState, action) => {
      switch (action.type) {
        default:
          return state;
      }
    },
  },
});

export const addContact = contactSLice.actions;
export default contactSLice.reducer;
