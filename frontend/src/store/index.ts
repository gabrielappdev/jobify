import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import { createWrapper, Context } from "next-redux-wrapper";
import { reducer as appReducer } from "./reducers/app";

const reducers = combineReducers({
  app: appReducer,
});

const buildStore = () => {
  const c = createStore;
  const store = c(reducers, applyMiddleware(logger));

  return store;
};

export const wrapper = createWrapper(buildStore, { debug: false });
