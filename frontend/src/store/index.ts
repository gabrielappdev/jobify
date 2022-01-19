import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import { createWrapper } from "next-redux-wrapper";
import { reducer as appReducer } from "./reducers/app";
import { reducer as userReducer } from "./reducers/user";
import { reducer as notificationsReducer } from "./reducers/notifications";

const reducers = combineReducers({
  app: appReducer,
  user: userReducer,
  notifications: notificationsReducer,
});

const buildStore = () => {
  const c = createStore;
  const store = c(reducers, applyMiddleware(logger));

  return store;
};

export const wrapper = createWrapper(buildStore, { debug: false });
