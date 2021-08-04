import React from "react";
import axios from "axios";
import "./History.css";

class History extends React.Component {
  render() {
    return (
      <section className="mypage-content">
        <span>이용 내역</span>
        <div className="mypage-history-content">
          <div>
            <img className="tumbler-example" src="../img/tumbler_example.jpg" />
          </div>
          <ul>
            <li>
              <span>이름</span>
              <h3>PlasticMan</h3>
            </li>
            <li>
              <span>이메일</span>
              <h5>plastic@naver.com</h5>
            </li>
            <li>
              <span>잔액</span>
              <h5>21-08-03 ~ 21-08-10</h5>
            </li>
          </ul>
        </div>
      </section>
    );
  }
}

export default History;
