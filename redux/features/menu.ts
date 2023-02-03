import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
interface menuState {
  username: string;
  onFileInput: boolean;
  status: "idle" | "loading" | "failed";
}

const initialState: menuState = {
  username: "",
  onFileInput: false,
  status: "idle",
};

export const menu = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setUsername: (state, actions) => {
      state.username = actions.payload;
    },
    removeUsername: (state) => {
      state.username = "";
    },
    setOnFileInput: (state, actions) => {
      state.onFileInput = actions.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(incrementAsync.pending, (state) => {
  //       state.status = 'loading'
  //     })
  //     .addCase(incrementAsync.fulfilled, (state, action) => {
  //       state.status = 'idle'
  //       state.value += action.payload
  //     })
  // },
});

export const { setUsername, removeUsername, setOnFileInput } = menu.actions;
// Other code such as selectors can use the imported `RootState` type
export const getMenu = (state: AppState) => state.menu;
export const getUsername = (state: AppState) => state.menu.username;
export const getOnFileInput = (state: AppState) => state.menu.onFileInput;

export default menu.reducer;
