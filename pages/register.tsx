import axios from "axios";
import { useRef } from "react";
import styles from "../styles/register.module.css";
const Register = () => {
  const $user_id = useRef<HTMLInputElement>(null);
  const $user_password = useRef<HTMLInputElement>(null);
  const $user_email = useRef<HTMLInputElement>(null);
  const $user_last_name = useRef<HTMLInputElement>(null);
  const $user_first_name = useRef<HTMLInputElement>(null);
  const submit_register = async () => {
    const register_data = {
      "user_id": $user_id.current.value,
      "user_password": $user_password.current.value,
      "user_email": $user_email.current.value,
      "user_last_name": $user_last_name.current.value,
      "user_first_name": $user_first_name.current.value,
    };

    await axios.post("/test/register", register_data, {
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": document.cookie.split("=")[1],
      },
    });
  };

  return (
    <div className={`${styles.wrapper}`}>
      <h2 className={`${styles.title}`}>회원가입</h2>
      <form>
        <div className={`${styles.input_wrapper}`}>
          <label htmlFor="user_id">아이디</label>
          <input
            ref={$user_id}
            id="user_id"
            type={"text"}
            defaultValue="prodge"
          />
        </div>
        <div className={`${styles.input_wrapper}`}>
          <label htmlFor="user_password">패스워드</label>
          <input
            ref={$user_password}
            id="user_password"
            type={"password"}
            defaultValue="password"
          />
        </div>
        <div className={`${styles.input_wrapper}`}>
          <label htmlFor="user_email">이메일</label>
          <input
            ref={$user_email}
            id="user_email"
            type={"email"}
            defaultValue="prodge@gmail.com"
          />
        </div>
        <div className={`${styles.name_wrapper}`}>
          <span className={`${styles.input_wrapper}`}>
            <label htmlFor="user_last_name">성</label>
            <input
              ref={$user_last_name}
              id="user_last_name"
              type={"text"}
              defaultValue="joowon"
            />
          </span>
          <span className={`${styles.input_wrapper}`}>
            <label htmlFor="user_first_name">이름</label>
            <input
              ref={$user_first_name}
              id="user_first_name"
              type={"text"}
              defaultValue="park"
            />
          </span>
        </div>

        <button
          className={`${styles.submit_btn}`}
          onClick={() => {
            submit_register();
          }}
        >
          등록
        </button>
      </form>
    </div>
  );
};

export default Register;
