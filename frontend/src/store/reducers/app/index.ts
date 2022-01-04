import { AnyAction } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import { HomeProps, IndexProps } from "types";
import { SET_GLOBAL_DATA } from "../../actions";

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
    notificationVisible: false,
  },
  categories: [],
  tags: [],
  featuredCompanies: [],
  featuredJobs: [],
  otherJobs: [],
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
