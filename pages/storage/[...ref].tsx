import StorageList from "../../components/StorageList";
import StorageBar from "../../components/StorageBar";
import styles from "../../styles/StoragePage.module.css"; //StoragePage.module.css";
import { storageBarDataType } from "../../static/types/storageBarDataType";
import { useEffect, useState } from "react";
import { getFileListByPath } from "../../components/tools/requests";
import { fileListType } from "../../static/types/flieListType";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

const StoragePageByRef = () => {
  const router = useRouter();
  const [resultList, setResultList] = useState<fileListType[]>([]);

  useEffect(() => {
    const { ref } = router.query;
    let file_path = "";
    file_path = (ref as string[])?.join("&");
    console.log(file_path);

    getFileListByPath(file_path).then((res) => {
      if (res && res.data) setResultList(res.data);
    });
  }, [router.query]);
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.table}`}>
        <div className={`${styles.index_row}`}>
          <div className={`${styles.head}`}>file name</div>
          {/* <div className={`${styles.head}`}>file type</div> */}
          <div className={`${styles.head}`}>file size</div>
          <div className={`${styles.head}`}>upload date</div>
        </div>

        <div className={`${styles.content_row}`}>
          {resultList.map((value, index) => {
            return (
              <StorageBar
                key={index}
                data={{
                  fileID: index,
                  name: value.file_name,
                  size: value.file_size,
                  date: value.file_upload_date,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StoragePageByRef;
