import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import styles from "../../styles/db.module.css";

const KEY = {
  files: "files",
  users: "users",
  folders: "folders",
  storages: "stoarages",
} as const;
const GRID_COLS = {
  "files": styles.grid_5_cols,
  "users": styles.grid_13_cols,
  "folders": styles.grid_5_cols,
  "storages": styles.grid_4_cols,
};
export type KEY = typeof KEY[keyof typeof KEY];

const DB = () => {
  const [data, setData] = useState<any[]>([{ key: "Null" }]);
  const [key, setKey] = useState<KEY>(KEY.files);
  const grid = useMemo(() => {
    return GRID_COLS[key];
  }, [key]);

  const getData = async (key: KEY) => {
    await axios
      .post(
        "https://api.ikiningyou.com/users/data/",
        { key: key },
        {
          headers: {
            "Authorization": `Bearer ${window.localStorage.getItem(
              "access_token"
            )}`,
          },
        }
      )
      .then((res) => {
        setData(res.data);
      });
  };
  useEffect(() => {
    getData(key);
  }, [key]);
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.selector_wrapper} ${styles.grid_4_rows}`}>
        <div
          className={`${styles.selector_item}`}
          onClick={() => {
            setKey(KEY.files);
          }}
        >
          files
        </div>
        <div
          className={`${styles.selector_item}`}
          onClick={() => {
            setKey(KEY.users);
          }}
        >
          users
        </div>
        <div
          className={`${styles.selector_item}`}
          onClick={() => {
            setKey(KEY.folders);
          }}
        >
          folders
        </div>
        <div
          className={`${styles.selector_item}`}
          onClick={() => {
            setKey(KEY.storages);
          }}
        >
          stoarges
        </div>
      </div>
      <br />
      <div className={`${styles.data_wrapper}`}>
        <div className={`${styles.keys_wrapper} ${grid}`}>
          {Object.keys(data[0]).map((value, index) => {
            return (
              <div key={index} className={`${styles.keys_item}`}>
                {value}
              </div>
            );
          })}
        </div>
        <div className={`${styles.values_wrapper}`}>
          {data.map((object, idx) => {
            return (
              <div key={idx} className={`${styles.values_row} ${grid}`}>
                {Object.values(object).map((value: any, index) => {
                  return (
                    <div key={index} className={`${styles.values_item}`}>
                      {value}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DB;
