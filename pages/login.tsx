import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";
import styles from "../styles/login.module.css";
import { submitLogin as requestLogin } from "../components/tools/requests";
import { loginDataType } from "../public/static/types/loginDataType";
const Login = () => {
  const router = useRouter();
  const $title = useRef<HTMLHeadingElement>(null);
  const $user_id = useRef<HTMLInputElement>(null);
  const $user_password = useRef<HTMLInputElement>(null);
  const submitLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const login_data: loginDataType = {
      "user_id": $user_id.current.value,
      "user_password": $user_password.current.value,
    };
    requestLogin(login_data, (res) => {
      router.push(
        `https://api.ikiningyou.com/users/o/authorize/?response_type=code&code_challenge=${process.env.NEXT_PUBLIC_CODE_CHALLENGE}&code_challenge_method=S256&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=https://www.ikiningyou.com/`
      );
    }).catch((err) => {
      $user_id.current.value = "";
      $user_password.current.value = "";
      $title.current.innerText = "입력 정보가 잘못되었습니다.";
      $title.current.classList.add(styles.fail);
    });
  };

  return (
    <div className={`${styles.wrapper}`}>
      <h1 ref={$title} className={`${styles.title}`}>
        로그인
      </h1>
      <form className={`${styles.form}`}>
        <div className={`${styles.input_wrapper}`}>
          <label htmlFor="user_id" className={`${styles.label}`}>
            ID
          </label>
          <input
            ref={$user_id}
            id="user_id"
            className={`${styles.input}`}
            type="text"
          />
        </div>
        <div className={`${styles.input_wrapper}`}>
          <label htmlFor="user_password" className={`${styles.label}`}>
            PASSWORD
          </label>
          <input
            ref={$user_password}
            id="user_password"
            className={`${styles.input}`}
            type="password"
          />
        </div>
        <div className={`${styles.input_wrapper} ${styles.btn_wrapper} `}>
          <button
            type="submit"
            className={`${styles.btn}`}
            onClick={(e) => {
              submitLogin(e);
              // e.preventDefault();
              // console.log("submit");
              // const getfolders = async () => {
              //   return await axios.post("/test/getfolders");
              // };
              // getfolders().then((res) => {
              //   console.log(res.data);
              // });
            }}
          >
            로그인
          </button>
          <Link href={"/register"} className={`${styles.btn}`}>
            회원가입
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
