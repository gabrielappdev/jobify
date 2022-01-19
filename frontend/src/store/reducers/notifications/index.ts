import { AnyAction } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import { NotificationsReducerProps } from "types";
import { SET_NOTIFICATIONS } from "../../actions";

const initialState: NotificationsReducerProps = {
  notifications: [],
};

export const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload.notifications,
      };
    default:
      return state;
  }
};
