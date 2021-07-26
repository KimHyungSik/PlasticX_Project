import React from "react";
import { Link } from "react-router-dom";

import "./RegisterPage.css";

class RegisterPage extends React.Component {
  render() {
    return (
      <section className="login">
        <div className="login-page">
          <h2>계정 만들기</h2>
          <hr></hr>
          <label htmlFor="user_name">이름</label>
          <input type="text" id="user_name" placeholder="이름" required></input>

          <label htmlFor="user_email">이메일</label>
          <input
            type="email"
            id="user_email"
            placeholder="이메일"
            required
          ></input>

          <label htmlFor="user_password">
            비밀번호 (소문자와 숫자 포함 최소 6자)
          </label>
          <input
            type="password"
            id="user_password"
            placeholder="비밀번호"
            required
          ></input>

          <label htmlFor="user_password_check"></label>
          <input
            type="password"
            id="user_password_check"
            placeholder="비밀번호 확인"
            required
          ></input>

          <button type="submit">Create Account</button>
          <div className="another-approach">
            이미 계정이 있으신가요? &emsp;<Link to="/login">로그인하기</Link>
          </div>
        </div>
      </section>
    );
  }
}

export default RegisterPage;
