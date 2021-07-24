import React from "react";
import "./LoginPage.css";

class LoginPage extends React.Component {
  render() {
    return (
      <section className="login">
        <div class="container">
          <div className="login-page">
            <h2>로그인</h2>
            <hr></hr>
            <b>이메일</b>
            <input type="text" placeholder="이메일" required></input>

            <b>비밀번호</b>
            <input type="password" placeholder="비밀번호" required></input>

            <button type="submit">Log In</button>

            <div class="another-approach">
              아직 계정이 없으신가요? <a href="/register">계정 만들기</a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default LoginPage;
