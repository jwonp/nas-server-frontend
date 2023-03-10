import axios from "axios";
import { folderDataType } from "../../public/static/types/folderDataType";
import { loginDataType } from "../../public/static/types/loginDataType";
import { revokeDataType } from "../../public/static/types/revokeDataType";
import { userRegistType } from "../../public/static/types/userRegistType";
import { headerShortCutKeys, SendRequest } from "./httpClient";
import qs from "qs";
export const vaildToken = async (access_token: string, thenFunction: any) => {
  if (access_token === "null" || access_token === null) return null;
  SendRequest(
    thenFunction,
    "https://api.ikiningyou.com/users/validtoken/",
    "GET",
    {},
    [headerShortCutKeys.Auth]
  );
};
export const addFiles = async (
  formData: FormData,
  path: string,
  thenFunction: any
) => {
  SendRequest(
    thenFunction,
    "https://api.ikiningyou.com/users/uploadfiles/",
    "POST",
    formData,
    [headerShortCutKeys.FormData, headerShortCutKeys.Auth],
    "json",
    { "File-Path": `${path}` }
  );
};

export const getFileListByPath = async (path: string, thenFunction: any) => {
  if (path === undefined) return null;
  SendRequest(
    thenFunction,
    `https://api.ikiningyou.com/users/getfilelistbypath/${path}`,
    "GET",
    {},
    [headerShortCutKeys.Auth]
  );
};

export const logout = async (revokeData: revokeDataType, thenFunction: any) => {
  SendRequest(
    thenFunction,
    `https://api.ikiningyou.com/logout/`,
    "POST",
    revokeData,
    [headerShortCutKeys.AppJson]
  );
};
export const revokeAccessToken = async (
  accessToken: string,
  thenFunction: any
) => {
  SendRequest(
    thenFunction,
    `https://api.ikiningyou.com/users/o/revoke-token/`,
    "POST",
    qs.stringify({
      token: accessToken,
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
    }),
    [headerShortCutKeys.X, headerShortCutKeys.CCtl]
  );
};

export const getRemainingStorageSize = async (thenFunction: any) => {
  SendRequest(
    thenFunction,
    "https://api.ikiningyou.com/users/getstoragesize/",
    "GET",
    {},
    [headerShortCutKeys.Auth]
  );
};
export const addFolder = async (
  folderData: folderDataType,
  thenFunction: any
) => {
  SendRequest(
    thenFunction,
    `https://api.ikiningyou.com/users/addfolder/`,
    "POST",
    folderData,
    [headerShortCutKeys.Auth]
  );
};

// export const getTokensByCode = async (
//   code: string | string[],
//   thenFunction: any
// ) => {
//   SendRequest(
//     thenFunction,
//     `https://api.ikiningyou.com/login/`,
//     "POST",
//     { code: code },
//     []
// [
//   "Access-Control-Allow-Origin&sep;*",
//   "Access-Control-Allow-Methods&sep;GET,HEAD,OPTIONS,POST,PUT",
//   "Access-Control-Allow-Headers&sep;Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Methods",
//   );
// };
export const deleteSelectedFiles = async (
  fileList: string[],
  path: string,
  thenFunction: any
) => {
  SendRequest(
    thenFunction,
    `https://api.ikiningyou.com/users/deletefiles/`,
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
    `https://api.ikiningyou.com/users/downloadfiles/`,
    "POST",
    { path: path, file_list: fileList },
    ["auth"],
    "blob"
  );
};

export const submitLogin = async (
  loginData: loginDataType,
  thenFunction: any
) => {
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
  SendRequest(
    thenFunction,
    `https://api.ikiningyou.com/register/`,
    "POST",
    userData,
    []
  );
};

export const setRefreshOnCookie = async (
  refresh: string,
  thenFunction: any
) => {
  SendRequest(thenFunction, `/api/refresh/token/${refresh}`, "GET", {}, []);
};
