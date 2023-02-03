import { configureStore, ThunkAction } from "@reduxjs/toolkit";
import drawerSwitchReducer from "./features/drawerSwitch";
import usernameReducer from "./features/menu";
import selectedFilesReducer from "./features/selectedFiles";
import storageSizeReducer from "./features/storageSize";
import { Action } from "redux";
import { createWrapper } from "next-redux-wrapper";
export const makeStore = () => {
  return configureStore({
    reducer: {
      drawerSwitch: drawerSwitchReducer,
      menu: usernameReducer,
      selectedFiles: selectedFilesReducer,
      storageSize: storageSizeReducer,
    },
  });
};
const store = makeStore();
export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
