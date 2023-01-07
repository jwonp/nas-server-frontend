import axios from "axios";
import { useRef } from "react";
import styles from "../styles/DragAndDropArea.module.css";
const DragAndDropArea = () => {
  const $areaDiv = useRef<HTMLDivElement>(null);
  const $fileInput = useRef<HTMLInputElement>(null);

  const uploadFiles = async () => {
    const files = $fileInput.current.files;
    const formData = new FormData();

    for (const file of files) {
      //   formData.append(file.name.split(".")[0], file);
      formData.append("files", file);
    }

    await axios({
      method: "POST",
      url: "/test/uploadfiles",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data;charset=utf-8",
        "Authorization": `Bearer ${window.localStorage.getItem(
          "access_token"
        )}`,
        "X-CSRFToken": document.cookie.split("=")[1],
        "File-Path": "/path/typing",
      },
    }).then((res) => {
      console.log(res.data);
      //   $fileInput.current.files = null;
      $fileInput.current.value = null;
    });
  };
  return (
    <>
      <div
        ref={$areaDiv}
        className={`${styles.wrapper}`}
        onDrop={(e) => {
          e.preventDefault();
          const files = e.dataTransfer?.files;
          $fileInput.current.files = files;
          uploadFiles();
          // $fileInput.current.value = "";
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDragEnter={() => {
          $areaDiv.current.classList.toggle(styles.drag_entered, true);
        }}
        onDragLeave={() => {
          $areaDiv.current.classList.toggle(styles.drag_entered, false);
        }}
      >
        <input ref={$fileInput} type="file" id="fileInput" />
      </div>
      <div
        className={`${styles.upload_btn}`}
        onClick={() => {
          uploadFiles();
        }}
      >
        upload files
      </div>
    </>
  );
};

export default DragAndDropArea;
