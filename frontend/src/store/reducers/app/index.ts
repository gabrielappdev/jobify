import { AnyAction } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import { HomeProps, IndexProps } from "types";
import {
  SET_GLOBAL_DATA,
  OPEN_GLOBAL_MODAL,
  CLOSE_GLOBAL_MODAL,
} from "../../actions";

const initialState: IndexProps = {
  appData: {
    name: "",
    description: "",
    price: 0,
    logo: null,
    logoUrl: "",
    hero: null,
    heroUrl: "",
    notification: null,
  },
  categories: [],
  tags: [],
  featuredCompanies: [],
  featuredJobs: [],
  otherJobs: [],
  notificationVisible: false,
  globalModalProps: {
    isGlobalModalOpen: false,
    action: "",
    props: {},
  },
};

export const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case SET_GLOBAL_DATA:
      return { ...state, ...action.payload };
    case OPEN_GLOBAL_MODAL:
      return {
        ...state,
        globalModalProps: { ...action.payload, isGlobalModalOpen: true },
      };
    case CLOSE_GLOBAL_MODAL:
      return {
        ...state,
        globalModalProps: { ...action.payload, isGlobalModalOpen: false },
      };
    default:
      return state;
  }
};
