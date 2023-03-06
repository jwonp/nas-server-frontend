import { useRouter } from "next/router";
import { useMemo, useRef } from "react";
import { folderDataType } from "../public/static/types/folderDataType";
import { remainingStorageSizeType } from "../public/static/types/remainingStorageSizeType";
import { getUsername } from "../redux/features/menu";
import {
  getSelected,
  resetFileSelected,
  setFileList,
} from "../redux/features/selectedFiles";
import { setMax, setUnit, setUsed } from "../redux/features/storageSize";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import styles from "../styles/FileHandleOptions.module.css";
import { convertByteByUnit, convertByteToUpper } from "./tools/functions";
import {
  addFolder,
  deleteSelectedFiles,
  downloadFiles,
  getFileListByPath,
  getRemainingStorageSize,
} from "./tools/requests";
const FileHandleOptions = () => {
  const router = useRouter();
  const $folderNameInput = useRef<HTMLInputElement>(null);
  const $download = useRef<HTMLDivElement>(null);
  const $submitBtn = useRef<HTMLDivElement>(null);
  const $cancelBtn = useRef<HTMLDivElement>(null);
  const selected = useAppSelector(getSelected);
  const dispatch = useAppDispatch();
  const username = useAppSelector(getUsername);
  const isOnMobile = useMemo(() => {
    if (router.isReady) {
      if (window.matchMedia("screen and (max-width:500px)").matches)
        return true;
    } else return false;
  }, [router.isReady]);
  const deleteFiles = () => {
    deleteSelectedFiles(selected, router.asPath, () => {
      dispatch(resetFileSelected());
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
  const submitToAddFolder = () => {
    const path = router.asPath;
    const folderData: folderDataType = {
      path: path,
      folder_name: $folderNameInput.current.value,
    };
    if (folderData.folder_name)
      addFolder(folderData, () => {
        const { ref } = router.query;
        let file_path = "";
        file_path = (ref as string[])?.join("&");
        getFileListByPath(file_path, (res) => {
          if (res && res.data) dispatch(setFileList(res.data));
        });
        $folderNameInput.current.value = "";
        closeFolderInput();
      });
  };
  const download = () => {
    return downloadFiles(selected, router.asPath, (res) => {
      const blob = new Blob([res.data], { type: "application/zip" });

      const fileObjectUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.setAttribute("href", fileObjectUrl);
      link.style.display = "none";

      $download.current.appendChild(link);

      link.setAttribute("download", `${username}.zip`);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(fileObjectUrl);
      dispatch(resetFileSelected());
    });
  };
  const openFolderInput = () => {
    $submitBtn.current.innerText = "확인";
    $submitBtn.current.classList.toggle(styles.input_btn_width, true);
    $folderNameInput.current.classList.toggle(styles.invisible, false);
    $cancelBtn.current.classList.toggle(styles.invisible, false);
  };
  const closeFolderInput = () => {
    $submitBtn.current.innerText = "폴더 생성";
    $submitBtn.current.classList.toggle(styles.input_btn_width, false);
    $folderNameInput.current.classList.toggle(styles.invisible, true);
    $cancelBtn.current.classList.toggle(styles.invisible, true);
  };
  return (
    <div className={`${styles.wrapper}`}>
      {selected.length > 0 ? (
        <>
          <div className={`${styles.item}`} onClick={deleteFiles}>
            삭제
          </div>
          <div className={`${styles.item}`} onClick={download}>
            다운로드
          </div>
          <div className={`${styles.invisible}`} ref={$download}></div>
        </>
      ) : (
        <div
          className={`${styles.folderNameForm}`}
          onMouseEnter={() => {
            if (!isOnMobile) {
              openFolderInput();
            }
          }}
          onClick={() => {
            if (isOnMobile) {
              openFolderInput();
            }
          }}
        >
          <input
            ref={$folderNameInput}
            className={`${styles.nameInput} ${styles.invisible}`}
            placeholder={`폴더 이름을 입력하세요`}
            required
          />
          <div
            ref={$submitBtn}
            className={`${styles.item}`}
            onClick={() => {
              submitToAddFolder();
            }}
          >
            폴더 생성
          </div>
          <div
            ref={$cancelBtn}
            className={`${styles.item} ${styles.input_btn_width} ${styles.invisible}`}
            onClick={(e) => {
              e.stopPropagation();
              closeFolderInput();
            }}
          >
            취소
          </div>
        </div>
      )}
    </div>
  );
};

export default FileHandleOptions;
