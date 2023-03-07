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
});

export const { openDrawer, closeDrawer, switchDrawer } = drawerSwitch.actions;
export const getDrawerSwitch = (state: AppState) =>
  state.drawerSwitch.drawerSwitch;

export default drawerSwitch.reducer;
