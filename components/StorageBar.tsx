import styles from "../styles/StorageBar.module.css";
import { storageBarDataType } from "../static/types/storageBarDataType";
import { useRef } from "react";

const StorageBar = ({ data }: { data: storageBarDataType }) => {
  const $id = useRef<string>(data?.fileID);
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.item}`}>{data.name}</div>
      <div className={`${styles.item}`}>{data.type}</div>
      <div className={`${styles.item} ${styles.align_right}`}>{data.size}</div>
      <div className={`${styles.item}`}>{data.date}</div>
    </div>
  );
};

export default StorageBar;
