import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface DrawerSwitchState {
  value: boolean;
}

const initialState: DrawerSwitchState = {
  value: false,
};

export const drawerSwitch = createSlice({
  name: "drawerSwitch",
  initialState,
  reducers: {
    openDrawer: (state) => {
      return { ...state, value: true };
    },
    closeDrawer: (state) => {
      return { ...state, value: false };
    },
    switchDrawer: (state) => {
      return { ...state, value: !state.value };
    },
  },
});

export const { openDrawer, closeDrawer, switchDrawer } = drawerSwitch.actions;
// Other code such as selectors can use the imported `RootState` type
export const getDrawerState = (state: RootState) => state.drawerSwitch.value;

export default drawerSwitch.reducer;
