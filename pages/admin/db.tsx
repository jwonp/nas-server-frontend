import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";

import styles from "../../styles/db.module.css";

const KEY = {
  files: "files",
  users: "users",
  folders: "folders",
  storages: "storages",
} as const;
const GRID_COLS = {
  "files": styles.grid_5_cols,
  "users": styles.grid_13_cols,
  "folders": styles.grid_5_cols,
  "storages": styles.grid_4_cols,
};
export type KEY = typeof KEY[keyof typeof KEY];

const DB = () => {
  const router = useRouter();
  const [data, setData] = useState<any[]>([{ key: "Null" }]);
  const [key, setKey] = useState<KEY>(KEY.files);
  const [selected, setSelected] = useState<any[]>([]);
  const grid = useMemo(() => {
    return GRID_COLS[key];
  }, [key]);
  const checkAdmin = async () => {
    await axios
      .get("https://api.ikiningyou.com/users/checkadmin/")
      .catch((err) => {
        router.push("/storage/내_드라이브");
      });
  };
  const getData = async (key: KEY) => {
    setSelected([]);
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
        const data = res.data as any[];
        if (data.length === 0) setData([{ key: "Null" }]);
        else setData(data);
      });
  };
  const deleteData = async () => {
    await axios
      .post(
        "https://api.ikiningyou.com/users/deletedata/",
        {
          table: key,
          selected: selected,
        },
        {
          headers: {
            "Authorization": `Bearer ${window.localStorage.getItem(
              "access_token"
            )}`,
          },
        }
      )
      .then((res) => {
        const data = res.data as any[];
        if (data.length === 0) setData([{ key: "Null" }]);
        else setData(data);
      });
  };
  useEffect(() => {
    checkAdmin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getData(key);
  }, [key]);
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.toolbar}`}>
        <div className={`${styles.selector_wrapper} ${styles.grid_4_cols}`}>
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
        <div
          className={`${styles.action_bar} ${
            selected.length > 0 ? "" : styles.hidden
          }`}
        >
          <div
            onClick={() => {
              deleteData();
            }}
          >
            삭제
          </div>
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
              <div
                key={idx}
                className={`${styles.values_row} ${grid}`}
                onClick={(e) => {
                  if (selected.includes(object)) {
                    setSelected(
                      selected.filter((item) => {
                        return item != object;
                      })
                    );
                  } else {
                    setSelected([...selected, object]);
                  }
                  (e.currentTarget as HTMLDivElement).classList.toggle(
                    styles.selected
                  );
                }}
              >
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
