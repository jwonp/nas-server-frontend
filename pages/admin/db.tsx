import axios from "axios";
import { useState } from "react";
import styles from "../../styles/db.module.css";

const KEY = {
  files: "files",
  users: "users",
  folders: "folders",
  storages: "stoarages",
} as const;

export type KEY = typeof KEY[keyof typeof KEY];
const DB = () => {
  const [data, setData] = useState<any[]>([]);
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
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.selector_wrapper}`}>
        <div
          className={`${styles.selector_item}`}
          onClick={() => {
            getData(KEY.files);
          }}
        >
          files
        </div>
        <div
          className={`${styles.selector_item}`}
          onClick={() => {
            getData(KEY.users);
          }}
        >
          users
        </div>
        <div
          className={`${styles.selector_item}`}
          onClick={() => {
            getData(KEY.folders);
          }}
        >
          folders
        </div>
        <div
          className={`${styles.selector_item}`}
          onClick={() => {
            getData(KEY.storages);
          }}
        >
          stoarges
        </div>
      </div>
      <br />
      <div className={`${styles.data_wrapper}`}>
        <div className={`${styles.keys_wrapper}`}>
          {Object.keys(data).map((value, index) => {
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
              <div key={idx} className={`${styles.values_row}`}>
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
