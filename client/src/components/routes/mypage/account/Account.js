import React from "react";
import Button from "../../../views/navbar/Button";
import { Link } from "react-router-dom";

import "./Account.css";

class Account extends React.Component {
  render() {
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
              <h3>PlasticMan</h3>
            </li>
            <li>
              <label>이메일</label>
              <h5>plastic@naver.com</h5>
            </li>
            <li>
              <label>잔액</label>
              <h5>21-08-03 ~ 21-08-10</h5>
            </li>
          </ul>
        </div>
        <span>현재 사용중인 텀블러</span>
        <div className="mypage-tumbler-content">
          <div>
            <img className="tumbler-example" src="../img/tumbler_example.jpg" />
          </div>
          <ul>
            <li>
              <label>Name</label>
              <h3>깔쌈한 텀블러</h3>
            </li>
            <li>
              <label>Cafe</label>
              <h5>스타벅스 강남점</h5>
            </li>
            <li>
              <label>Rental Period</label>
              <h5>21-08-03 ~ 21-08-10</h5>
            </li>
          </ul>
        </div>
      </section>
    );
  }
}

export default Account;
