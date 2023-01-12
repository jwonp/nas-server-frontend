import styles from "../styles/StorageBar.module.css";
import { storageBarDataType } from "../static/types/storageBarDataType";
import { useRef } from "react";
import { convertByteToUpper } from "./tools/functions";

const StorageBar = ({ data }: { data: storageBarDataType }) => {
  const $id = useRef<number>(data?.fileID);
  const { unit, size } = convertByteToUpper(data.size);
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.item}`}>{data.name}</div>
      <div className={`${styles.item}`}>{`${size}${unit}`}</div>
      <div className={`${styles.item}`}>{data.date.split("T")[0]}</div>
    </div>
  );
};

export default StorageBar;
