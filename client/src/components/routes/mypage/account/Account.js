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
  };

  getUser = async () => {
    const {
      data: { _id },
    } = await axios.get("/api/user/auth");

    const userInfo = await axios.get(`/api/user/info/${_id}`);
    this.setState({ userInfo: userInfo.data });
  };

  getCurrentTumbler = async () => {
    const {
      data: { _id },
    } = await axios.get("/api/user/auth");

    const tumblersInfo = await axios.get(`/api/user/list/${_id}`);
    this.setState({ tumblersInfo: tumblersInfo.data.tumblers });
    console.log(tumblersInfo.data.tumblers);
  };

  componentDidMount() {
    this.getUser();
    this.getCurrentTumbler();
  }

  render() {
    const { userInfo, tumblersInfo } = this.state;
    return (
      <section className="mypage-content">
        <span>내 정보</span>
        <div className="mypage-user-content">
          <div className="mypage-user-img">
            <i class="far fa-user fa-5x"></i>
            <Link to="/mypage/settings">
              <Button>Edit Profile</Button>
            </Link>
          </div>
          <ul>
            <li>
              <label>이름</label>
              <AccountUser name={userInfo.name} />
            </li>
            <li>
              <label>이메일</label>
              <AccountUser email={userInfo.email} />
            </li>
            <li>
              <label>잔액</label>
              <AccountUser deposit={userInfo.deposit} />
            </li>
          </ul>
        </div>
        <span>현재 사용중인 텀블러</span>
        {tumblersInfo.map((tumbler) => {
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
                  <label>Cafe</label>
                  <AccountCurrentTumbler shop={tumbler.shop} />
                  <label>Rental Period</label>
                  <AccountCurrentTumbler
                    borrowed_date={tumbler.borrowed_date}
                  />
                  <AccountCurrentTumbler
                    usable_period_date={tumbler.usable_period_date}
                  />
                  {/* <label>Name</label>
              <AccountCurrentTumbler model={tumblersInfo.model} />
            </li>
            <li>
              <label>Cafe</label>
              <AccountCurrentTumbler shop={tumblersInfo.shop} />
            </li>
            <li>
              <label>Rental Period</label>
              <AccountCurrentTumbler
                borrowed_date={tumblersInfo.borrowed_date}
              />
              <AccountCurrentTumbler
                usable_period_date={tumblersInfo.usable_period_date}
              /> */}
                </li>
              </ul>
            </div>
          );
        })}
      </section>
    );
  }
}

export default Account;
