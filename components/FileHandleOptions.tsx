import { useRouter } from "next/router";
import { useRef, useState } from "react";
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
  const $download = useRef<HTMLDivElement>(null);
  const [fileHref, setFileHref] = useState<string>("#");
  const [fileDownload, setFileDownload] = useState<string>("#");
  const $folderNameInput = useRef<HTMLInputElement>(null);
  const $submitBtn = useRef<HTMLDivElement>(null);
  const $cancelBtn = useRef<HTMLDivElement>(null);
  const selected = useAppSelector(getSelected);
  const dispatch = useAppDispatch();
  const username = useAppSelector(getUsername);
  const extractDownloadFilename = (response) => {
    console.log(response);
    const disposition = response.headers["Content-Disposition"];
    console.log(disposition);
    const fileName = decodeURI(
      disposition
        .match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1]
        .replace(/['"]/g, "")
    );
    console.log(fileName);
    return fileName;
  };
  const deleteFiles = () => {
    deleteSelectedFiles(selected, router.asPath, (res) => {
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
    addFolder(folderData, (res) => {
      const { ref } = router.query;
      let file_path = "";
      file_path = (ref as string[])?.join("&");
      getFileListByPath(file_path, (res) => {
        if (res && res.data) dispatch(setFileList(res.data));
      });
    });
  };
  const download = () => {
    downloadFiles(selected, router.asPath, (res) => {
      // 다운로드(서버에서 전달 받은 데이터) 받은 바이너리 데이터를 blob으로 변환합니다.
      const blob = new Blob([res.data], { type: "application/zip" });
      // 특정 타입을 정의해야 경우에는 옵션을 사용해 MIME 유형을 정의 할 수 있습니다.
      // const blob = new Blob([this.content], {type: 'text/plain'})

      // blob을 사용해 객체 URL을 생성합니다.
      const fileObjectUrl = window.URL.createObjectURL(blob);
      // console.log(fileObjectUrl);
      // blob 객체 URL을 설정할 링크를 만듭니다.

      // const link = document.createElement("a");
      // link.href = fileObjectUrl;
      // link.style.display = "none";

      // 다운로드 파일 이름을 추출하는 함수

      // 다운로드 파일 이름을 지정 할 수 있습니다.
      // 일반적으로 서버에서 전달해준 파일 이름은 응답 Header의 Content-Disposition에 설정됩니다.
      // link.download = extractDownloadFilename(res);
      // 다운로드 파일의 이름은 직접 지정 할 수 있습니다.
      // link.download = "sample-file.xlsx";

      // 링크를 body에 추가하고 강제로 click 이벤트를 발생시켜 파일 다운로드를 실행시킵니다.
      // $download.current.append(link);
      // document.body.appendChild(link);

      const link = $download.current.getElementsByTagName("a")[0];
      setFileHref(fileObjectUrl);
      setFileDownload(`${username}.zip`);
      // link.click();

      // link.remove();

      // 다운로드가 끝난 리소스(객체 URL)를 해제합니다.
      window.URL.revokeObjectURL(fileObjectUrl);
      // setFileHref("#");
      // setFileDownload("#");
    });
  };
  //className={`${styles.invisible}`}
  return (
    <div className={`${styles.wrapper}`}>
      {selected.length > 0 ? (
        <>
          <div className={`${styles.item}`}>이동</div>
          <div className={`${styles.item}`} onClick={deleteFiles}>
            삭제
          </div>
          <div ref={$download} className={`${styles.item}`} onClick={download}>
            <a
              href={fileHref}
              download={fileDownload}
              onClick={() => {
                console.log("clicked");
              }}
            />
            다운로드
          </div>
          <div className={`${styles.item}`}>링크 생성</div>
        </>
      ) : (
        <>
          <div
            className={`${styles.folderNameForm}`}
            onMouseEnter={() => {
              $submitBtn.current.innerText = "확인";
              $folderNameInput.current.classList.toggle(
                styles.invisible,
                false
              );
              $cancelBtn.current.classList.toggle(styles.invisible, false);
            }}
          >
            <input
              ref={$folderNameInput}
              className={`${styles.nameInput} ${styles.invisible}`}
              placeholder={`폴더 이름을 입력하세요`}
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
              className={`${styles.item} ${styles.invisible}`}
              onClick={() => {
                $submitBtn.current.innerText = "폴더 생성";
                $folderNameInput.current.classList.toggle(
                  styles.invisible,
                  true
                );
                $cancelBtn.current.classList.toggle(styles.invisible, true);
              }}
            >
              취소
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FileHandleOptions;
