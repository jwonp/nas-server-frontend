import qs from "qs";
export const authorizeToken = (url) =>
  fetch(url, {
    headers: {
      "Authorization": `Bearer ${window.localStorage.getItem("access_token")}`,
    },
  }).then((res) => res.json());

export const refreshToken = (url) =>
  fetch(url, {
    method: "POST",
    body: JSON.stringify({
      "refresh_token": window.localStorage.getItem("refresh_token"),
    }),
    mode: "same-origin",
    credentials: "include",
    headers: {
      "Authorization": `Bearer ${window.localStorage.getItem("access_token")}`,
      "X-CSRFToken": document.cookie.split("=")[1],
    },
  }).then((res) => res.json());
