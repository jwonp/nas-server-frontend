import { configureStore } from "@reduxjs/toolkit";
import loginDataReducer from "./features/loginData";
import drawerSwitchReducer from "./features/drawerSwitch";
const store = configureStore({
  reducer: {
    loginData: loginDataReducer,
    drawerSwitch: drawerSwitchReducer,
  },
});
export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
