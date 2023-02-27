import Link from "next/link";
import { useRouter } from "next/router";
import { getFolderName, getFolderPathByRef } from "./tools/functions";
import styles from "../styles/FolderBar.module.css";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  addFileSelected,
  getSelected,
  removeFileSelected,
  resetFileSelected,
} from "../redux/features/selectedFiles";
import { useMemo } from "react";

const FolderBar = ({ name }: { name: string }) => {
  const router = useRouter();
  const routePath = useMemo(() => {
    return `/storage/${getFolderPathByRef(
      router.query?.ref as string[]
    )}${name}/`;
  }, [name, router.query?.ref]);
  const dispatch = useAppDispatch();
  const selected = useAppSelector(getSelected);
  const isSelected = useMemo(() => {
    return selected.includes(name);
  }, [name, selected]);
  return (
    <div
      className={`${styles.folderLink}`}
      onClick={() => {
        if (isSelected) {
          dispatch(removeFileSelected(name));
        } else {
          dispatch(addFileSelected(name));
        }
      }}
      onDoubleClick={() => {
        dispatch(resetFileSelected());
        router.push(routePath);
      }}
    >
      <div className={`${styles.folderDiv}`}>{getFolderName(name)}</div>
    </div>
  );
};
export default FolderBar;
