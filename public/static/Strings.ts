export const ROOT_REF_NAME = "내_드라이브";
export const ROOT_REF = "root";
export const FAVORITE_REF_NAME = "즐겨찾기";
export const FAVORITE_REF = "favorite";

export const FileSizeUnit = {
  GB: "GB",
  MB: "MB",
  KB: "KB",
  BYTES: "BYTES",
};

export const auth_uri = `https://api.ikiningyou.com/users/o/authorize/?response_type=code&code_challenge=${process.env.NEXT_PUBLIC_CODE_CHALLENGE}&code_challenge_method=S256&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=https://www.ikiningyou.com/callback/`;
