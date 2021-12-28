import { AnyAction } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import { HomeProps } from "types";
import { SET_GLOBAL_DATA } from "../../actions";

const initialState: HomeProps = {
  name: "",
  createdAt: "",
  description: "",
  price: 0,
  updatedAt: "",
};

export const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case SET_GLOBAL_DATA:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
