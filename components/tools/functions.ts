import { FileSizeUnit, ROOT_REF_NAME } from "../../public/static/Strings";
import { convertedByteType } from "../../public/static/types/convertedByteType";

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
    return filtered_ref.join("/") + "/";
  }
};

export const getHistory = (list: string[], target: number) => {
  return list.filter((value, index) => index <= target).join("/");
};

// export const getValidateTokenURL = () => {};
// export const getValidateTokenFeteher = () => {};
