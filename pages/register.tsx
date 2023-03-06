import axios from "axios";
import { useRouter } from "next/router";
import { useRef } from "react";
import { checkRegisterData } from "../components/tools/functions";
import { registUser } from "../components/tools/requests";
import { auth_uri } from "../public/static/Strings";
import { userRegistType } from "../public/static/types/userRegistType";
import styles from "../styles/register.module.css";
const Register = () => {
  const router = useRouter();
  const $title = useRef<HTMLDivElement>(null);
  const $user_id = useRef<HTMLInputElement>(null);
  const $user_password = useRef<HTMLInputElement>(null);
  const $user_email = useRef<HTMLInputElement>(null);
  const $user_last_name = useRef<HTMLInputElement>(null);
  const $user_first_name = useRef<HTMLInputElement>(null);
  const submit_register = async () => {
    const register_data: userRegistType = {
      "user_id": $user_id.current.value,
      "user_password": $user_password.current.value,
      "user_email": $user_email.current.value,
      "user_last_name": $user_last_name.current.value,
      "user_first_name": $user_first_name.current.value,
    };

    const checkResult = checkRegisterData(register_data);
    for (const id of Object.keys(checkResult)) {
      console.log(id);

      if (checkResult[id] == false) {
        document
          .getElementById(id)
          .classList.toggle(styles.warning_border, true);
      } else {
        document
          .getElementById(id)
          .classList.toggle(styles.warning_border, false);
      }
    }
    $title.current.innerHTML = "해당 입력란을 다시 확인해주세요.";

    if (Object.values(checkResult).includes(false) == false) {
      registUser(register_data, (res) => {
        if (typeof res.data === "number") {
          $title.current.classList.add(styles.warning);
          $title.current.innerText =
            "더 이상 계정을 생성할 수 없습니다. 관리자에게 문의하세요.";
        } else {
          router.push(auth_uri);
        }
      });
    }
  };

  return (
    <div className={`${styles.wrapper}`}>
      <div ref={$title} className={`${styles.title}`}>
        회원가입
      </div>
      <form>
        <div className={`${styles.input_wrapper}`}>
          <label htmlFor="user_id">아이디</label>
          <input ref={$user_id} id="user_id" type={"text"} />
        </div>
        <div className={`${styles.input_wrapper}`}>
          <label htmlFor="user_password">패스워드</label>
          <input ref={$user_password} id="user_password" type={"password"} />
        </div>
        <div className={`${styles.input_wrapper}`}>
          <label htmlFor="user_email">이메일</label>
          <input ref={$user_email} id="user_email" type={"email"} />
        </div>
        <div className={`${styles.name_wrapper}`}>
          <span className={`${styles.input_wrapper}`}>
            <label htmlFor="user_last_name">성</label>
            <input ref={$user_last_name} id="user_last_name" type={"text"} />
          </span>
          <span className={`${styles.input_wrapper}`}>
            <label htmlFor="user_first_name">이름</label>
            <input ref={$user_first_name} id="user_first_name" type={"text"} />
          </span>
        </div>

        <button
          className={`${styles.submit_btn}`}
          onClick={(e) => {
            e.preventDefault();
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
