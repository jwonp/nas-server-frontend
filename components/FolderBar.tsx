import Link from "next/link";
import { useRouter } from "next/router";
import { getFolderPathByRef } from "./tools/functions";
import styles from "../styles/FolderBar.module.css";
import { useAppDispatch } from "../redux/hooks";
import { resetFileSelected } from "../redux/features/selectedFiles";
const FolderBar = ({ name }: { name: string }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return (
    <Link
      href={`/storage/${getFolderPathByRef(
        router.query?.ref as string[]
      )}${name}/`}
      className={`${styles.folderLink}`}
      onClick={() => {
        dispatch(resetFileSelected());
      }}
    >
      <div className={`${styles.folderDiv}`}>{name}</div>
    </Link>
  );
};
export default FolderBar;
