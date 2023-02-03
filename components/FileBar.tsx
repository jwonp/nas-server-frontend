import { useMemo, useRef } from "react";
import { fileListType } from "../public/static/types/flieListType";
import {
  removeFileSelected,
  addFileSelected,
  getSelected,
} from "../redux/features/selectedFiles";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import styles from "../styles/FileBar.module.css";
import { convertByteToUpper } from "./tools/functions";
const FileBar = ({ data }: { data: fileListType }) => {
  const $storageBar = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const selected = useAppSelector(getSelected);
  const { unit, size } = convertByteToUpper(data.file_size);
  const display_name = data.file_name;
  const isSelected = useMemo(() => {
    return selected.includes(display_name);
  }, [display_name, selected]);
  return (
    <div
      ref={$storageBar}
      className={`${styles.wrapper} ${isSelected ? styles.selected : ""}`}
      onClick={() => {
        // if ($storageBar.current.classList.contains(styles.selected)) {
        if (isSelected) {
          dispatch(removeFileSelected(data.file_name));
        } else {
          dispatch(addFileSelected(data.file_name));
        }

        // $storageBar.current.classList.toggle(styles.selected);
      }}
    >
      <div className={`${styles.item}`}>{display_name}</div>
      <div className={`${styles.item} ${styles.right}`}>
        {data.file_size <= 0 ? "" : `${size}${unit}`}
      </div>
      <div className={`${styles.item} ${styles.right}`}>
        {data.file_size <= 0 ? "" : data.file_upload_date.split("T")[0]}
      </div>
    </div>
  );
};
export default FileBar;
