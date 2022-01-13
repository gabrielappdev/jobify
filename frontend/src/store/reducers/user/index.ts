import { AnyAction } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import { UserProps } from "types";
import { SET_USER, SET_LOADING_USER } from "../../actions";

const initialState: UserProps = {
  user: {
    blocked: false,
    confirmed: false,
    email: "",
    id: null,
    provider: "",
    username: "",
    jwt: "",
    company: null,
    role: null,
  },
  isLoading: true,
};

export const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case SET_USER:
      return {
        ...state,
        user: typeof action.payload === "object" ? { ...action.payload } : null,
      };
    case SET_LOADING_USER:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};
