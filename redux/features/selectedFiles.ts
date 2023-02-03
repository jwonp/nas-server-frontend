import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fileListType } from "../../public/static/types/flieListType";

import { AppState } from "../store";

interface selectedFilesState {
  fileList: fileListType[];
  selected: string[];
  status: "idle" | "loading" | "failed";
}

const initialState: selectedFilesState = {
  fileList: [],
  selected: [],
  status: "idle",
};
// export const addFileSelectedAsync = createAsyncThunk(
//   "selectedFiles/fetchSelectedFiles",
//   async (name: string) => {
//     const response = await fetchAddFileSelected(name);
//     return response.name;
//   }
// );
export const selectedFiles = createSlice({
  name: "selectedFiles",
  initialState,
  reducers: {
    setFileList: (state, actions: PayloadAction<fileListType[]>) => {
      const fileList = actions.payload;
      const folders: fileListType[] = [];
      const files: fileListType[] = [];
      const sortedList: fileListType[] = [];
      fileList.forEach((value) => {
        value.file_name.includes("folder:")
          ? folders.push(value)
          : files.push(value);
      });
      folders.forEach((value) => {
        sortedList.push(value);
      });
      files.forEach((value) => {
        sortedList.push(value);
      });

      state.fileList = sortedList;
    },
    addFileSelected: (state, actions: PayloadAction<string>) => {
      state.selected.push(actions.payload);
    },
    removeFileSelected: (state, actions: PayloadAction<string>) => {
      state.selected = state.selected.filter(
        (value) => value !== actions.payload
      );
    },
    resetFileSelected: (state) => {
      state.selected = [];
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(addFileSelectedAsync.pending, (state) => {
  //       state.status = "loading";
  //     })
  //     .addCase(addFileSelectedAsync.fulfilled, (state, action) => {
  //       state.status = "idle";
  //       state.selected.push(action.payload);
  //     });
  // },
});

export const {
  addFileSelected,
  setFileList,
  removeFileSelected,
  resetFileSelected,
} = selectedFiles.actions;
// Other code such as selectors can use the imported `RootState` type
export const getFileList = (state: AppState) => state.selectedFiles.fileList;
export const getSelected = (state: AppState) => state.selectedFiles.selected;

export default selectedFiles.reducer;
