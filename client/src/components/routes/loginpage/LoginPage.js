import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import loginUser from "../../../_actions/user_action";

import "./LoginPage.css";

function LoginPage(props) {
  const dispath = useDispatch();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      email: Email,
      password: Password,
    };

    dispath(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        props.history.push("/");
      } else {
        alert("Error");
      }
    });
  };

  return (
    <section className="login">
      <div className="login-page">
        <form onSubmit={onSubmitHandler}>
          <h2>로그인</h2>
          <hr></hr>
          <label htmlFor="user_email">이메일</label>
          <input
            type="email"
            id="user_email"
            placeholder="이메일"
            value={Email}
            onChange={onEmailHandler}
            required
          ></input>
          <label htmlFor="user_password">비밀번호</label>
          <input
            type="password"
            id="user_password"
            value={Password}
            onChange={onPasswordHandler}
            placeholder="비밀번호"
            required
          ></input>
          <button type="submit" value="Submit">
            Log In
          </button>
          <div className="another-approach">
            아직 계정이 없으신가요? &emsp;
            <Link to="/register">계정 만들기</Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default LoginPage;
