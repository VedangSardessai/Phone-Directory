
const initialState = [
  { id: 0, name: "Vedang", number: "7820967372" },
  { id: 1, name: "Shilpa", number: "8999785521" },
  { id: 2, name: "Mahesh", number: "7020049945" },
];

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CONTACT":
      state = [...state, action.payload];
      return state;

    case "DELETE_CONTACT":
      const contactFilter = state.filter((contact) =>
        contact.id === action.payload ? null : contact
      );
      state = contactFilter;
      return state;

    default:
      return state;
  }
};

// export const contactSLice = createSlice({
//   name: "contact",
//   initialState,

//   reducers: {
//     contactReducer: (state = initialState, action) => {
//       switch (action.type) {
//         case "ADD_CONTACT":
//           state = [...state, action.payload];
//           return state;

//         default:
//           return state;
//       }
//     },
//   },
// });

// export const contactReducer = contactSLice.actions;

export const contactState = (state) => state;
export default contactReducer;
