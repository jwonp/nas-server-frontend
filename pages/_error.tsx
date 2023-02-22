import Link from "next/link";
import styles from "../styles/_error.module.css";
function Error({ statusCode }) {
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.warning}`}>
        해당 요청을 처리할 수 없습니다.
        {statusCode ? `  Error ${statusCode}` : ""}
      </div>
      <div className={`${styles.button}`}>
        <Link href={"/storage/내_드라이브"}>메인으로 돌아가기</Link>
      </div>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
