import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
const Home = () => {
  const router = useRouter();
  const EMAIL = "tkdel222@gmail.com";
  const PHONE = "010-7963-1093";
  const copyStringToClipboard = (
    text: string,
    target: EventTarget & HTMLDivElement
  ) => {
    window.navigator.clipboard.writeText(text).then(() => {
      const pre = target.innerText;
      target.innerText = "복사 완료";
      setInterval(() => {
        target.innerText = pre;
      }, 2000);
    });
  };
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.item}`}>
        ID : TEST / PASSWORD : qwerty 로 로그인 할 수 있습니다.
      </div>
      <br />
      <div className={`${styles.item}`}>Name : 박주원</div>
      <div
        className={`${styles.item}`}
        onClick={(e) => {
          copyStringToClipboard(PHONE, e.currentTarget);
        }}
      >{`Phone : ${PHONE}`}</div>
      <div
        className={`${styles.item}`}
        onClick={(e) => {
          copyStringToClipboard(EMAIL, e.currentTarget);
        }}
      >
        {`E-mail : ${EMAIL}`}
      </div>
      <div className={`${styles.item}`}>
        Github :{" "}
        <span
          className={` ${styles.cursor}`}
          onClick={() => {
            router.push("https://github.com/jwonp");
          }}
        >
          https://github.com/jwonp
        </span>
      </div>
    </div>
  );
};

export default Home;
