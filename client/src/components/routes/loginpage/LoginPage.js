import React from "react";

import "./LoginPage.css";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <section className="login">
        <div className="login-page">
          <form onSubmit={this.handleSubmit}>
            <h2>로그인</h2>
            <hr></hr>
            <b>이메일</b>
            <input
              type="text"
              placeholder="이메일"
              value={this.state.value}
              onChange={this.handleChange}
              required
            />

            <b>비밀번호</b>
            <input type="password" placeholder="비밀번호" required></input>

            <button type="submit" value="Submit">
              Log In
            </button>
            <div className="another-approach">
              아직 계정이 없으신가요? <a href="/register">계정 만들기</a>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default LoginPage;
