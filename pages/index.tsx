import styles from "../styles/Home.module.css";
const Home = () => {
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.item}`}>환영합니다.</div>
      <br />
      <div className={`${styles.item}`}>
        게스트 계정은 생성 제한이 있습니다.
      </div>
      <div className={`${styles.item}`}>
        회원 가입이 안 될 경우에는 <h3>all_time_low@naver.com</h3>로
        연락해주세요.
      </div>
    </div>
  );
};

export default Home;
