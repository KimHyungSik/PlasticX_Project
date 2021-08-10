import React from "react";
import Button from "../../../views/navbar/Button";
import { Link } from "react-router-dom";
import AccountUser from "./AccountUser";
import AccountCurrentTumbler from "./AccountCurrentTumbler";

import "./Account.css";
import axios from "axios";

class Account extends React.Component {
  state = {
    userInfo: [],
    tumblersInfo: [],
    isLoading: true,
  };

  getUser = async () => {
    const {
      data: { _id },
    } = await axios.get("/api/user/auth");

    const userInfo = await axios.get(`/api/user/info/${_id}`);
    this.setState({ userInfo: userInfo.data, isLoading: false });
  };

  getCurrentTumbler = async () => {
    const {
      data: { _id },
    } = await axios.get("/api/user/auth");

    const tumblersInfo = await axios.get(`/api/user/list/${_id}`);

    this.setState({
      tumblersInfo: tumblersInfo.data.tumblers,
      isLoading: false,
    });
  };

  componentDidMount() {
    this.getUser();
    this.getCurrentTumbler();
  }

  render() {
    const { userInfo, tumblersInfo, isLoading } = this.state;

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
            <span className="mypage-content-title">내 정보</span>
            <div className="mypage-user-content">
              <div className="mypage-user-img">
                <i class="far fa-user fa-5x"></i>
                <Link to="/mypage/settings">
                  <Button>Edit Profile</Button>
                </Link>
              </div>
              <ul>
                <li>
                  <label>Name</label>
                  <AccountUser name={userInfo.name} />
                </li>
                <li>
                  <label>Email</label>
                  <AccountUser email={userInfo.email} />
                </li>
                <li>
                  <label>잔액</label>
                  <AccountUser
                    deposit={userInfo.deposit
                      .toString()
                      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                      .concat("원")}
                  />
                </li>
              </ul>
            </div>
            <span className="mypage-content-title">현재 사용중인 텀블러</span>

            {tumblersInfo.length === 0 ? (
              <div className="mypage-tumbler-content no-list">
                <span>현재 사용중인 텀블러가 없습니다.</span>
              </div>
            ) : (
              <>
                {tumblersInfo.map((tumbler) => {
                  console.log(tumbler);
                  return (
                    <div className="mypage-tumbler-content">
                      <div>
                        <img
                          className="tumbler-example"
                          src="../img/tumbler_example.jpg"
                        />
                      </div>
                      <ul>
                        <li>
                          <label>Name</label>
                          <AccountCurrentTumbler model={tumbler.model} />
                        </li>
                        <li>
                          <label>Cafe</label>
                          <AccountCurrentTumbler shop={tumbler.shop} />
                        </li>
                        <li>
                          <label>Rental Period</label>
                          <AccountCurrentTumbler
                            borrowed_date={tumbler.borrowed_date}
                          />
                          <AccountCurrentTumbler
                            usable_period_date={tumbler.usable_period_date}
                          />
                        </li>
                      </ul>
                    </div>
                  );
                })}
              </>
            )}
          </>
        )}
      </section>
    );
  }
}

export default Account;
