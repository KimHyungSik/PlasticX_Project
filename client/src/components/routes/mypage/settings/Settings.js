import React from "react";
import axios from "axios";

import "./Settings.css";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      isLoading: true,
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  getUser = async () => {
    const {
      data: { _id },
    } = await axios.get("/api/user/auth");

    const userInfo = await axios.get(`/api/user/info/${_id}`);
    this.setState({
      name: userInfo.data.name,
      email: userInfo.data.email,
      isLoading: false,
    });
  };

  onClickNameHandler = async () => {
    const {
      data: { _id },
    } = await axios.get("/api/user/auth");
    const userUpdatedName = await axios
      .put(`/api/user/info/change/${_id}`, {
        name: this.state.name,
      })
      .then((response) => {
        if (response.data.RESULT == 200) {
          alert("닉네임이 성공적으로 변경되었습니다.");
        }
      });
  };

  onClickEmailHandler = async () => {
    const {
      data: { _id },
    } = await axios.get("/api/user/auth");
    const userUpdatedEmail = await axios
      .put(`/api/user/info/change/${_id}`, {
        email: this.state.email,
      })
      .then((response) => {
        if (response.data.RESULT == 200) {
          alert("이메일이 성공적으로 변경되었습니다.");
        } else {
          console.log("이메일 형식으로 써주세요.");
        }
      });
  };

  componentDidMount() {
    this.getUser();
  }

  render() {
    const { isLoading } = this.state;
    return (
      <section className="mypage-content">
        {isLoading ? (
          <div className="loader">
            <div className="loading_container">
              <div className="loading"></div>
              <div className="loader_text">Loading...</div>
            </div>
          </div>
        ) : (
          <>
            <div className="account-setting-content">
              <div className="account-setting-input">
                <form>
                  <label htmlFor="user_name">User Name</label>
                  <input
                    type="name"
                    id="user_name"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  ></input>
                </form>
              </div>
              <div className="account-setting-content-btn">
                <button
                  onClick={this.onClickNameHandler}
                  className="settings-btn"
                >
                  Save
                </button>
              </div>
            </div>
            <div className="account-setting-content">
              <div className="account-setting-input">
                <form>
                  <label htmlFor="user_email">User Email</label>
                  <input
                    type="email"
                    id="user_email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  ></input>
                </form>
              </div>
              <div className="account-setting-content-btn">
                <button
                  onClick={this.onClickEmailHandler}
                  className="settings-btn"
                >
                  Change Email
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    );
  }
}

export default Settings;
