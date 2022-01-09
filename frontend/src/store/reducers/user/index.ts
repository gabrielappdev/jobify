import { AnyAction } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import { UserProps } from "types";
import { SET_USER } from "../../actions";

const initialState: UserProps = {
  user: {
    blocked: false,
    confirmed: false,
    email: "",
    id: null,
    provider: "",
    username: "",
    jwt: "",
  },
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
    default:
      return state;
  }
};
