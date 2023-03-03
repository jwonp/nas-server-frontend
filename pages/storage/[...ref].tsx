import styles from "../../styles/StoragePage.module.css";
import { useEffect, useRef } from "react";
import {
  addFiles,
  getFileListByPath,
  getRemainingStorageSize,
  vaildToken,
} from "../../components/tools/requests";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getFileList, setFileList } from "../../redux/features/selectedFiles";
import {
  convertByteByUnit,
  convertByteToUpper,
  getHistory,
  isFolder,
} from "../../components/tools/functions";
import FolderBar from "../../components/FolderBar";
import FileBar from "../../components/FileBar";
import Link from "next/link";
import { remainingStorageSizeType } from "../../public/static/types/remainingStorageSizeType";
import { setMax, setUnit, setUsed } from "../../redux/features/storageSize";
import { setUsername } from "../../redux/features/menu";
import { auth_uri, ROOT_REF_NAME } from "../../public/static/Strings";
import { resetFileSelected } from "../../redux/features/selectedFiles";
const StoragePageByRef = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const fileList = useAppSelector(getFileList);
  const refs = router.query.ref as string[];
  const $areaDiv = useRef<HTMLDivElement>(null);
  const $fileInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const { ref } = router.query;
    let file_path = "";
    file_path = (ref as string[])?.join("&");

    getFileListByPath(file_path, (res) => {
      if (res && res.data) dispatch(setFileList(res.data));
    });
    dispatch(resetFileSelected());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  useEffect(() => {
    if (window.localStorage.getItem("access_token") === null) {
      router.push(auth_uri);
    }
    vaildToken(window.localStorage.getItem("access_token"), (res) => {
      if (!res) return;
      if (res.status !== 200) router.push(auth_uri);
      dispatch(setUsername(res.data.name));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const uploadFiles = async () => {
    const files = $fileInput.current.files;
    const formData = new FormData();
    for (const file of files) {
      formData.append("files", file);
    }
    // console.log(router.asPath);
    addFiles(formData, router.asPath, (res) => {
      $fileInput.current.value = null;
      const { ref } = router.query;
      let file_path = "";
      file_path = (ref as string[])?.join("&");
      getRemainingStorageSize((res) => {
        const storageSizes: remainingStorageSizeType = res.data;
        const maxSize = convertByteToUpper(storageSizes.max_storage_size);
        const usedSize = convertByteByUnit(
          storageSizes.used_storage_size,
          maxSize.unit
        );
        dispatch(setMax(maxSize.size));
        dispatch(setUnit(maxSize.unit));
        dispatch(setUsed(usedSize));
      });

      getFileListByPath(file_path, (res) => {
        if (res && res.data) dispatch(setFileList(res.data));
      });
    });
  };

  return (
    <>
      <div
        className={`${styles.wrapper} ${styles.title}  ${styles.left} ${styles.sticky}`}
      >
        <div className={`${styles.historyContainer}`}>
          {refs && refs[0] !== ROOT_REF_NAME ? (
            <div className={`${styles.history}`}>
              <Link href={`/storage/${ROOT_REF_NAME}`}>{ROOT_REF_NAME}</Link>
            </div>
          ) : (
            <></>
          )}
          {refs?.map((value, index) => (
            <div key={index} className={`${styles.history}`}>
              <Link href={`/storage/${getHistory(refs, index)}/`}>{value}</Link>
            </div>
          ))}
        </div>
        <div className={`${styles.index_row}`}>
          <div className={`${styles.head}`}>file name</div>
          <div className={`${styles.head} ${styles.right}`}>file size</div>
          <div className={`${styles.head} ${styles.right}`}>upload date</div>
        </div>
      </div>

      <div
        className={`${styles.wrapper}`}
        ref={$areaDiv}
        onDrop={(e) => {
          e.preventDefault();
          const files = e.dataTransfer?.files;
          $fileInput.current.files = files;
          uploadFiles();
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDragEnter={() => {
          $areaDiv.current.classList.toggle(styles.drag_entered, true);
        }}
        onMouseOut={() => {
          $areaDiv.current.classList.toggle(styles.drag_entered, false);
        }}
      >
        <div className={`${styles.table}`}>
          <div className={`${styles.content_row}`}>
            {fileList.map((value, index) => {
              if (isFolder(value.file_name))
                return <FolderBar key={index} name={value.file_name} />;
              return <FileBar key={index} data={value} />;
            })}
          </div>
        </div>
        <input
          ref={$fileInput}
          type="file"
          id="fileInput"
          className={`${styles.fileInput}`}
        />
      </div>
    </>
  );
};

export default StoragePageByRef;
