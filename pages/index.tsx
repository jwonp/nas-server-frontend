import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
const Home = () => {
  const router = useRouter();
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.item}`}>
        ID : TEST / PASSWORD : qwerty 로 로그인 할 수 있습니다.
      </div>
      <br />
      <div className={`${styles.item}`}>Name : 박주원</div>
      <div className={`${styles.item}`}>Phone : 010-7963-1093</div>
      <div className={`${styles.item}`}>E-mail : tkdel222@gmail.com</div>
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
