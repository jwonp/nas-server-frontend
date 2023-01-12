import axios from "axios";

export const getFileListByPath = async (path) => {
  if (path === undefined) return;
  return await axios.get(`/test/getfilelistbypath/${path}`, {
    headers: {
      "Authorization": `Bearer ${window.localStorage.getItem("access_token")}`,
    },
  });
};

export const logout = async (revokeData) => {
  return await axios({
    method: "POST",
    url: "/test/logout",
    data: revokeData,
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": document.cookie.split("=")[1],
    },
  });
};

export const getRemainingStorageSize = async () => {
  return await axios.get("/test/getStorageSize", {
    headers: {
      "Authorization": `Bearer ${window.localStorage.getItem("access_token")}`,
    },
  });
  // .then((res) => {
  // setMaxStorageSize(res.data.max);
  // setUsedStorageSize(res.data.used);
  // })
  // .catch((error) => {
  //   console.log(error);
  // });
};
