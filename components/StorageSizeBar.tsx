import { useEffect, useMemo, useState } from "react";
// import { useQuery } from "react-query";
import axios from "axios";
import styles from "../styles/StorageSizeBar.module.css";

const StorageSizeBar = () => {
  const [maxStorageSize, setMaxStorageSize] = useState<number>();
  const [usedStorageSize, setUsedStorageSize] = useState<number>();
  useEffect(() => {
    getStorageSize();
  }, []);
  const getStorageSize = async () => {
    return await axios
      .get("/test/getStorageSize", { withCredentials: true })
      .then((res) => {
        setMaxStorageSize(res.data.max);
        setUsedStorageSize(res.data.used);
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
