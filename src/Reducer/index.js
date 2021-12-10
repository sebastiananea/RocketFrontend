const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
};

export default function rootReducer(state = initialState, { payload, type }) {
  switch (type) {
    case "SET_USER":
      return {
        ...state,
        user: payload,
      };

    default:
      return state;
  }
}
