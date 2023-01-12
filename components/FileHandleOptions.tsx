import styles from "../styles/FileHandleOptions.module.css";
const FileHandleOptions = () => {
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.item}`}>이동</div>
      <div className={`${styles.item}`}>삭제</div>
      <div className={`${styles.item}`}>다운로드</div>
      <div className={`${styles.item}`}>링크 생성</div>
    </div>
  );
};

export default FileHandleOptions;
