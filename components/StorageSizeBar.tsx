import { useEffect } from "react";
import { remainingStorageSizeType } from "../public/static/types/remainingStorageSizeType";
import styles from "../styles/StorageSizeBar.module.css";
import { getRemainingStorageSize } from "./tools/requests";
import { convertByteByUnit, convertByteToUpper } from "./tools/functions";

import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  getMax,
  getUnit,
  getUsed,
  setMax,
  setUnit,
  setUsed,
} from "../redux/features/storageSize";
const StorageSizeBar = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const maxStorageSize = useAppSelector(getMax);
  const usedStorageSize = useAppSelector(getUsed);
  const storageSizeUnit = useAppSelector(getUnit);

  useEffect(() => {
    if (router.isReady) {
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

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
