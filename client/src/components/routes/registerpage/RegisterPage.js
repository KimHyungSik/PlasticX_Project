import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import registerUser from "../../../_actions/user_action";

import "./RegisterPage.css";

function RegisterPage(props) {
  let dispatch = useDispatch();

  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert("비밀번호가 서로 다릅니다.");
    }

    let body = {
      name: Name,
      email: Email,
      password: Password,
    };

    console.log(dispatch);
    dispatch(registerUser(body)).then((response) => {
      console.log(response);
      if (response.payload.RESULT == 200) {
        props.history.push("/login");
        alert("성공적으로 회원가입되었습니다.");
      } else if (response.payload.RESULT == 400) {
        alert("계정이 이미 존재합니다.");
      }
    });
  };

  return (
    <section className="login">
      <div className="login-page">
        <form onSubmit={onSubmitHandler}>
          <h2>계정 만들기</h2>
          <hr></hr>
          <label htmlFor="user_name">이름</label>
          <input
            type="text"
            id="user_name"
            value={Name}
            onChange={onNameHandler}
            placeholder="이름"
            required
          ></input>

          <label htmlFor="user_email">이메일</label>
          <input
            type="email"
            id="user_email"
            value={Email}
            onChange={onEmailHandler}
            placeholder="이메일"
            required
          ></input>

          <label htmlFor="user_password">
            비밀번호 (소문자와 숫자 포함 최소 6자)
          </label>
          <input
            type="password"
            id="user_password"
            value={Password}
            onChange={onPasswordHandler}
            placeholder="비밀번호"
            required
          ></input>

          <label htmlFor="user_password_check">비밀번호 확인</label>
          <input
            type="password"
            id="user_password_check"
            value={ConfirmPassword}
            onChange={onConfirmPasswordHandler}
            placeholder="비밀번호 확인"
            required
          ></input>

          <button type="submit" value="Submit">
            Create Account
          </button>
          <div className="another-approach">
            이미 계정이 있으신가요? &emsp;<Link to="/login">로그인하기</Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default RegisterPage;
