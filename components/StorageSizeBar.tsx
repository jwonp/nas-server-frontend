import { useEffect, useMemo, useState } from "react";
import { remainingStorageSizeType } from "../static/types/RemainingStorageSizeType";
import styles from "../styles/StorageSizeBar.module.css";
import { getRemainingStorageSize } from "./tools/requests";
import { convertByteByUnit, convertByteToUpper } from "./tools/functions";

const StorageSizeBar = () => {
  const [maxStorageSize, setMaxStorageSize] = useState<number>(0);
  const [usedStorageSize, setUsedStorageSize] = useState<number>(0);
  const [storageSizeUnit, setStorageSizeUnit] = useState<string>("Byte");
  useEffect(() => {
    getStorageSize();
  }, []);
  const getStorageSize = () => {
    getRemainingStorageSize()
      .then((res) => {
        const storageSizes: remainingStorageSizeType = res.data;
        const maxSize = convertByteToUpper(storageSizes.max_storage_size);
        const usedSize = convertByteByUnit(
          storageSizes.used_storage_size,
          maxSize.unit
        );
        setMaxStorageSize(maxSize.size);
        setStorageSizeUnit(maxSize.unit);
        setUsedStorageSize(usedSize);
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
        {maxStorageSize}
        {storageSizeUnit} 중 {usedStorageSize}
        {storageSizeUnit} 사용
      </p>
    </div>
  );
};

export default StorageSizeBar;
