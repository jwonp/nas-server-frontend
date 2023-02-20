import axios from "axios";
const RESPONSETYPE = {
  arrayBuffer: "arraybuffer",
  document: "document",
  json: "json",
  text: "text",
  stream: "stream",
  blob: "blob",
} as const;
export type RESPONSETYPE = typeof RESPONSETYPE[keyof typeof RESPONSETYPE];

const METHOD = {
  get: "GET",
  post: "POST",
} as const;

export type METHOD = typeof METHOD[keyof typeof METHOD];

/**
 *
 * @param method "GET" or "POST"
 * @param data anything
 * @param header String[], headerShortCut [ "formData", "appJson","csrfToken", "auth"] or "CUSTOM-HEADER-NAME&sep;HEADER-VALUE"
 */
export const SendRequest = async (
  thenFunction: any,
  url: string,
  method: METHOD,
  data: any,
  header: string[],
  responseType: RESPONSETYPE = RESPONSETYPE.json,
  params: any = {}
) => {
  const headerShortCut = {
    "formData": { "Content-Type": "multipart/form-data;charset=utf-8" },
    "appJson": { "Content-Type": "application/json" },
    // "csrfToken": { "X-CSRFToken": document.cookie.split("=")[1] },
    "x-www": { "Content-type": "application/x-www-form-urlencoded" },
    "auth": {
      "Authorization": `Bearer ${window.localStorage.getItem("access_token")}`,
    },
    "CacheCtrl": { "Cache-Control": "no-cache" },
  };
  await axios({
    method: method,
    data: data,
    url: url,
    headers: convertHEADER(header, headerShortCut),
    params: params,
    responseType: responseType,
  })
    .then(thenFunction)
    .catch((error) => {
      // if (error.response.status === 403) {
      //   console.log(
      //     `access token ${window.localStorage.getItem(
      //       "access_token"
      //     )} is expired`
      //   );
      RefreshExpiredToken();
      // } else {
      //   console.log("Fail to request");
      // }
    });
};

export const RefreshExpiredToken = async (): Promise<any> => {
  await axios
    .post(
      "https://api.ikiningyou.com/users/o/refresh/",
      {
        "grant_type": "refresh_token",
        "refresh_token": "&RefreshToken;",
        "client_id": process.env.NEXT_PUBLIC_CLIENT_ID,
        "client_secret": process.env.NEXT_PUBLIC_CLIENT_SECRET,
      },
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
          withCredentials: true,
        },
      }
    )
    .then(async (res) => {
      console.log(`new access token ${res.data.access_token} is received`);
      window.localStorage.setItem("access_token", res.data.access_token);
      await axios.get(`/api/refresh/token/${res.data.refresh_token}`);
    })
    .catch((error) => {
      console.log("Fail to refresh the access token");
    });
};

const convertHEADER = (header: string[], headerShortCut: any) => {
  const resultHeader = {};
  header.forEach((value) => {
    if (Object.hasOwn(headerShortCut, value))
      Object.assign(resultHeader, headerShortCut[value]);
    else {
      const customHeader = value.split("&sep;");

      if (customHeader.length === 2) {
        const header = {};
        Object.defineProperty(header, customHeader[0], {
          value: customHeader[1],
          writable: true,
          enumerable: true,
        });
      }
    }
  });
  return resultHeader;
};

export const headerShortCutKeys = {
  FormData: "formData",
  AppJson: "appJson",
  X: "x-www",
  // CSRFToken: "csrfToken",
  Auth: "auth",
  CCtl: "CacheCtrl",
};
