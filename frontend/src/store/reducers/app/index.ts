import { HYDRATE } from "next-redux-wrapper";
import { AnyAction } from "redux";
import { IndexProps } from "types";
import {
  CLOSE_GLOBAL_MODAL,
  OPEN_GLOBAL_MODAL,
  SET_GLOBAL_DATA,
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
    display_logo: 0,
    country: "",
    currency: "",
    currencySymbol: "",
    featured: 0,
    highlight: 0,
    pinned: 0,
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
