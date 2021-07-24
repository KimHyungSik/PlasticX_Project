import React from "react";
import "./RegisterPage.css";

class RegisterPage extends React.Component {
  render() {
    return (
      <section className="login">
        <div class="container">
          <div className="login-page">
            <h2>계정 만들기</h2>
            <hr></hr>
            <b>이름</b>
            <input type="text" placeholder="이름" required></input>

            <b>이메일</b>
            <input type="text" placeholder="이메일" required></input>

            <b>비밀번호 (소문자와 숫자 포함 최소 6자)</b>
            <input type="password" placeholder="비밀번호" required></input>

            <b>비밀번호 확인</b>
            <input type="password" placeholder="비밀번호 확인" required></input>

            <button type="submit">Create Account</button>
          </div>
        </div>
      </section>
    );
  }
}

export default RegisterPage;
