import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface LoginDataState {
  value: string;
}

const initialState: LoginDataState = {
  value: "",
};

export const loginData = createSlice({
  name: "loginData",
  initialState,
  reducers: {
    setLoginData: (state, action) => {
      return {
        ...state,
        value: action.payload,
      };
    },
  },
});

export const { setLoginData } = loginData.actions;
// Other code such as selectors can use the imported `RootState` type
export const getLoginData = (state: RootState) => state.loginData.value;

export default loginData.reducer;
