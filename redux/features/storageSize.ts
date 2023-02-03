import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";

interface storageSizeState {
  max: number;
  used: number;
  unit: "BYTES" | "KB" | "MB" | "GB";
  status: "idle" | "loading" | "failed";
}

const initialState: storageSizeState = {
  max: 0,
  used: 0,
  unit: "BYTES",
  status: "idle",
};

export const storageSize = createSlice({
  name: "storageSize",
  initialState,
  reducers: {
    setMax: (state, actions) => {
      state.max = actions.payload;
    },
    setUsed: (state, actions) => {
      state.used = actions.payload;
    },
    setUnit: (state, actions) => {
      state.unit = actions.payload;
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

export const { setMax, setUsed, setUnit } = storageSize.actions;
// Other code such as selectors can use the imported `RootState` type
export const getUsed = (state: AppState) => state.storageSize.used;
export const getMax = (state: AppState) => state.storageSize.max;
export const getUnit = (state: AppState) => state.storageSize.unit;

export default storageSize.reducer;
