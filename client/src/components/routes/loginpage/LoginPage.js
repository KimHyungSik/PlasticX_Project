import React from "react";
import "./LoginPage.css";

class LoginPage extends React.Component {
  render() {
    return (
      <div className="login-page">
        {/* <h2>로그인</h2>
        <form method="post">
          <input></input>
          <input></input>
        </form> */}

        <b>이메일</b>
        <input type="text" placeholder="이메일" required></input>

        <b>비밀번호</b>
        <input type="password" placeholder="비밀번호" required></input>

        <button type="submit">Login</button>

        <b>아직 계정이 없으신가요? 계정 만들기</b>
      </div>
    );
  }
}

export default LoginPage;
