import { useRouter } from "next/router";
import StorageBar from "../components/StorageBar";
import styles from "../styles/StoragePage.module.css"; //StoragePage.module.css";
import { storageBarDataType } from "../static/types/storageBarDataType";

const StorageList = () => {
  const router = useRouter();
  const ref = router.query.ref;
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.table}`}>
        <div className={`${styles.index_row}`}>
          <div className={`${styles.head}`}>file name</div>
          <div className={`${styles.head}`}>file type</div>
          <div className={`${styles.head}`}>file size</div>
          <div className={`${styles.head}`}>upload date</div>
        </div>

        <div className={`${styles.content_row}`}>
          <StorageBar
            data={{
              fileID: "HD123",
              name: "MyFile",
              type: "Image",
              size: 1000,
              date: "2022-12-06",
            }}
          />
        </div>
      </div>
      {/* <StorageBar />
        <StorageBar />
        <StorageBar />
        <StorageBar />
        <StorageBar />
        <StorageBar />
        <StorageBar />
        <StorageBar />
        <StorageBar />
        <StorageBar />
        <StorageBar />
        <StorageBar />
        <StorageBar />
        <StorageBar />
        <StorageBar /> */}
    </div>
  );
};

export default StorageList;
