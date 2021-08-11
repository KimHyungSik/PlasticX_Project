import React from "react";
import Button from "../../../views/navbar/Button";
import { Link } from "react-router-dom";
import AccountUser from "./AccountUser";
import AccountCurrentTumbler from "./AccountCurrentTumbler";

import "./Account.css";
import axios from "axios";

//const path = require("path");
// const modelsPath = path.resolve(
//   __dirname,
//   "..",
//   "..",
//   "..",
//   "..",
//   "..",
//   "..",
//   "models"
// );
// const fcmPath = path.resolve(
//   __dirname,
//   "..",
//   "..",
//   "..",
//   "..",
//   "..",
//   "..",
//   "config"
// );

const { Client } = require("node-rest-client");
//const { Tumbler } = require(path.resolve(modelsPath, "Tumbler"));
//const { User } = require(path.resolve(modelsPath, "User"));
//const FCM = require(path.resolve(fcmPath, "fcm"));

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

  expiryNotification = async () => {
    // 1. 데이터 불러오기
    const {
      data: { _id },
    } = await axios.get("/api/user/auth");

    const tumblersInfo = await axios.get(`/api/user/list/${_id}`);

    //   let tumbler = await Tumbler.findOne({ _id: tumblersInfo }).populate(
    //     "model"
    //   );
    //   // 2. 날짜 검사
    //   // 최대 대여할 수 있는 날짜 변수
    //   const miliseconds = 1000;
    //   const seconds = 60;
    //   const minutes = 60;
    //   const hours = 24;
    //   const days = 7;
    //   let maxLoanDays = miliseconds * seconds * minutes * hours * days;
    //   // 텀블러가 대여된 날짜 변수
    //   let loanedDate = tumbler.date;

    //   // 3. 날짜 연산
    //   // current date - loaned date >= 7 days
    //   // 4. 텀블러의 to_id (현재 사용중 사용자 아이디) 찾기
    //   let user = await User.findById(tumbler.to_id);

    //   // 5. 알림을 보내기
    //   if (tumbler.state == true && Date.now() - loanedDate >= maxLoanDays) {
    //     console.log(
    //       `[LOGIN]\n${user.name}님의 ${tumbler.model.name}의 대여 기간이 만료되었습니다.`
    //     );
    //     var client = new Client();

    //     let args = {
    //       data: {
    //         to: user.fcm_token,
    //         notification: {
    //           title: `[LOGIN]\n${user.name}님의 ${tumbler.model.name}의 대여 기간이 만료되었습니다.`,
    //         },
    //       },
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: FCM.TOKEN,
    //       },
    //     };
    //     await client.post(FCM.BASE_URI + FCM.SEND_URI, args, (data, result) => {
    //       console.log(data);
    //       console.log("사용자한데 알림 전송 선공");
    //     });
    //   }
  };

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
