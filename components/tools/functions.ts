import { FileSizeUnit, ROOT_REF_NAME } from "../../public/static/Strings";
import { convertedByteType } from "../../public/static/types/convertedByteType";
import { registerDataCheckType } from "../../public/static/types/registerDataCheckType";
import { userRegistType } from "../../public/static/types/userRegistType";

const GB_DIVIDER = 1000 * 1000 * 1000;
const MB_DIVIDER = 1000 * 1000;
const KB_DIVIDER = 1000;

export const convertByteToUpper = (byte: number): convertedByteType => {
  const divided_byte = [
    { unit: FileSizeUnit.BYTES, size: byte },
    { unit: FileSizeUnit.KB, size: Math.floor(byte / KB_DIVIDER) },
    { unit: FileSizeUnit.MB, size: Math.floor(byte / MB_DIVIDER) },
    { unit: FileSizeUnit.GB, size: Number((byte / GB_DIVIDER).toFixed(2)) },
  ];

  let result = divided_byte[0];

  for (const item of divided_byte) {
    if (item.size < 1) break;
    result = item;
  }

  return result;
};

export const convertByteByUnit = (byte: number, unit: string): number => {
  switch (unit) {
    case FileSizeUnit.BYTES:
      return byte;
    case FileSizeUnit.KB:
      return Math.floor(byte / KB_DIVIDER);
    case FileSizeUnit.MB:
      return Math.floor(byte / MB_DIVIDER);
    case FileSizeUnit.GB:
      return Number((byte / GB_DIVIDER).toFixed(2));
  }
  return 0;
};

export const getFolderName = (name: string) => {
  if (typeof name === "string") {
    const splitedName = name.split(":", 2);
    if (splitedName[0] === "folder") {
      return splitedName[1];
    }
  }
  return "";
};

export const isFolder = (name: string) => {
  if (typeof name === "string") {
    const splitedName = name.split(":", 2);
    if (splitedName[0] === "folder") {
      return true;
    } else return false;
  }
  return false;
};

export const getFolderPathByRef = (ref: string[]) => {
  if (ref) {
    const filtered_ref = ref.filter((value) => value !== ROOT_REF_NAME);
    if (filtered_ref.length === 0) return "";
    return filtered_ref.join("/").replaceAll("folder:", "") + "/";
  }
};

export const getHistory = (list: string[], target: number) => {
  const history = list
    .filter((value, index) => index <= target)
    .join("/")
    .replaceAll("folder:", "");
  return history;
};

export const checkRegisterData = (
  register_data: userRegistType
): registerDataCheckType => {
  const result = {
    "user_id": false,
    "user_password": false,
    "user_email": false,
    "user_last_name": false,
    "user_first_name": false,
  };

  const emailReg = new RegExp(
    "^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
  );
  if (register_data.user_id != "") result.user_id = true;
  if (register_data.user_password != "") result.user_password = true;
  if (emailReg.test(register_data.user_email)) result.user_email = true;
  if (register_data.user_last_name != "") result.user_last_name = true;
  if (register_data.user_first_name != "") result.user_first_name = true;

  return result;
};
