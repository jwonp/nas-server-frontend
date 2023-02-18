import axios from "axios";
import { folderDataType } from "../../public/static/types/folderDataType";
import { revokeDataType } from "../../public/static/types/revokeDataType";
import { userRegistType } from "../../public/static/types/userRegistType";
import { headerShortCutKeys, SendRequest } from "./httpClient";
export const vaildToken = async (access_token: string, thenFunction: any) => {
  if (access_token === "null" || access_token === null) return null;
  SendRequest(thenFunction, "/test/validtoken", "GET", {}, [
    headerShortCutKeys.Auth,
  ]);
};
export const addFiles = async (
  formData: FormData,
  path: string,
  thenFunction: any
) => {
  SendRequest(thenFunction, "/test/uploadfiles", "POST", formData, [
    headerShortCutKeys.FormData,
    headerShortCutKeys.Auth,
    `File-Path&sep;${path}`,
  ]);
};

export const getFileListByPath = async (path: string, thenFunction: any) => {
  if (path === undefined) return null;
  SendRequest(thenFunction, `/test/getfilelistbypath/${path}`, "GET", {}, [
    headerShortCutKeys.Auth,
  ]);
};

export const logout = async (revokeData: revokeDataType, thenFunction: any) => {
  SendRequest(thenFunction, `/test/logout`, "POST", revokeData, [
    headerShortCutKeys.AppJson,
  ]);
};

export const getRemainingStorageSize = async (thenFunction: any) => {
  SendRequest(thenFunction, "/test/getStorageSize", "GET", {}, [
    headerShortCutKeys.Auth,
  ]);
};
export const addFolder = async (
  folderData: folderDataType,
  thenFunction: any
) => {
  SendRequest(thenFunction, `/test/addFolder/`, "POST", folderData, [
    headerShortCutKeys.Auth,
  ]);
};

export const getTokensByCode = async (
  code: string | string[],
  thenFunction: any
) => {
  SendRequest(thenFunction, `/test/login`, "POST", { code: code }, []);
};
export const deleteSelectedFiles = async (
  fileList: string[],
  path: string,
  thenFunction: any
) => {
  SendRequest(
    thenFunction,
    `/test/deletefiles`,
    "POST",
    { file_list: fileList, path: path },
    ["auth"]
  );
};

export const downloadFiles = async (
  fileList: string[],
  path: string,
  thenFunction: any
) => {
  SendRequest(
    thenFunction,
    `/test/downloadfiles`,
    "POST",
    { path: path, file_list: fileList },
    ["auth"],
    "blob"
  );
};

export const submitLogin = async (loginData: string, thenFunction: any) => {
  SendRequest(
    thenFunction,
    `https://api.ikiningyou.com/submitlogin/`,
    "POST",
    loginData,
    []
  );
};

export const registUser = async (
  userData: userRegistType,
  thenFunction: any
) => {
  SendRequest(thenFunction, `/test/register`, "POST", userData, []);
};
