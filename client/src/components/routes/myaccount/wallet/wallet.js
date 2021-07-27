import React from "react";
import "./wallet.css";

class Wallet extends React.Component {
  render() {
    return (
      <section className="myaccount">
        <div className="container">
          <aside className="container-sidebar"></aside>
          <main className="container-main">
            <div className="wallet">
              <b>지갑</b>
              <div className="wallet-container">
                <div className="name">조유빈</div>
                <div className="userid">a5465-46sfd-23183</div>
                <div className="deposit">5,000 원</div>
                <div className="charge">충전</div>
                <div className="see-history">이용내역</div>
              </div>
            </div>

            <div className="current-info">
              <b>현재 대여 정보</b>
              <div>모델</div>
              <div>대여 카페</div>
              <div>대여 카페</div>
              <div>반납 날짜</div>
            </div>

            <div className="history">
              <b>이용내역 </b>
              <div>모델</div>
              <div>대여 카페</div>
              <div>대여 카페</div>
              <div>반납 날짜</div>
            </div>

            <div className="edit">
              <b>정보 수정</b>
              <div>이름</div>
              <div>이메일</div>
              <div>비밀번호</div>
            </div>
          </main>
        </div>
      </section>
    );
  }
}

export default Wallet;
