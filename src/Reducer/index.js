import { SAVEDATA } from "../Actions";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  groups: [],
  data: [],
};

export default function rootReducer(state = initialState, { payload, type }) {
  switch (type) {
    case "SET_USER":
      return {
        ...state,
        user: payload,
      };
    case "SET_GROUPS":
      return {
        ...state,
        groups: payload,
      };
    case SAVEDATA:
      return {
        ...state,
        data: payload,
      };

    default:
      return state;
  }
}
