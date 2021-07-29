import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import "./LoginPage.css";

function LoginPage(props) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  let body = {
    email: Email,
    password: Password,
  };

  const onSubmitHandler = (event) => {
    //event.preventDefault();

    axios.post("/api/user/login", body).then((response) => {
      if (response.data.RESULT == 200) {
        props.history.push("/");
        //setIsLoggedIn(true);
      } else if (response.data.RESULT == 400 || response.data.RESULT == 401) {
        alert("이메일 또는 비밀번호가 틀립니다.");
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

export default withRouter(LoginPage);
