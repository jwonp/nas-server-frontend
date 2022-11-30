import { useEffect, useMemo, useRef } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import styles from "../styles/StorageSizeBar.module.css";

const StorageSizeBar = () => {
  const maxStorageSize = useMemo<number>(() => {
    return 10;
  }, []);
  const usedStorageSize = useMemo<number>(() => {
    return 1;
  }, []);
  useEffect(() => {
    getStorageSize();
  }, []);
  const getStorageSize = async () => {
    return await axios
      .get("http://localhost:8000/api/getstoragesize/")
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // const { status, data, error, isFetching } = useQuery(
  //   ["stoargeSize"],
  //   async () => {
  //     const res = await axios.get("");
  //     // return res.data;
  //   }
  // );
  return (
    <div className={`${styles.storageSize}`}>
      <p>
        저장용량 ({Math.floor((usedStorageSize / maxStorageSize) * 100)}%
        사용중)
      </p>
      <div className={`${styles.percentBar}`}>
        <div
          className={`${styles.percent}`}
          style={{
            width: `${Math.floor((usedStorageSize / maxStorageSize) * 100)}%`,
          }}
        ></div>
      </div>
      <p>
        {maxStorageSize}GB 중 {usedStorageSize}GB 사용
      </p>
    </div>
  );
};

export default StorageSizeBar;
