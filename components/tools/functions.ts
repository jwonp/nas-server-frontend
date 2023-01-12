import { FileSizeUnit } from "../../static/Strings";
import { convertedByteType } from "../../static/types/convertedByteType";
const GB_DIVIDER = 1000 * 1000 * 1000;
const MB_DIVIDER = 1000 * 1000;
const KB_DIVIDER = 1000;

export const convertByteToUpper = (byte: number): convertedByteType => {
  const divided_byte = [
    { unit: "BYTES", size: byte },
    { unit: "KB", size: Math.floor(byte / KB_DIVIDER) },
    { unit: "MB", size: Math.floor(byte / MB_DIVIDER) },
    { unit: "GB", size: Number((byte / GB_DIVIDER).toFixed(2)) },
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
