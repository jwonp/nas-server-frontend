import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";

interface DrawerSwitchState {
  drawerSwitch: boolean;
  status: "idle" | "loading" | "failed";
}

const initialState: DrawerSwitchState = {
  drawerSwitch: false,
  status: "idle",
};

export const drawerSwitch = createSlice({
  name: "drawerSwitch",
  initialState,
  reducers: {
    HYDRATE: () => {},
    openDrawer: (state) => {
      state.drawerSwitch = true;
    },
    closeDrawer: (state) => {
      state.drawerSwitch = false;
    },
    switchDrawer: (state) => {
      state.drawerSwitch = !state.drawerSwitch;
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

export const { openDrawer, closeDrawer, switchDrawer } = drawerSwitch.actions;
// Other code such as selectors can use the imported `RootState` type
export const getDrawerSwitch = (state: AppState) =>
  state.drawerSwitch.drawerSwitch;

export default drawerSwitch.reducer;
