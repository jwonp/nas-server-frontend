import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import drawerSwitchReducer from "./features/drawerSwitch";

import usernameReducer from "./features/menu";
import selectedFilesReducer from "./features/selectedFiles";

const combinedReducer = combineReducers({
  drawerSwitch: drawerSwitchReducer,
  menu: usernameReducer,
  selectedFiles: selectedFilesReducer,
});

const rootReducer: typeof combinedReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};
export default rootReducer;
