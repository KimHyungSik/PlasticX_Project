import React from "react";
import "./Company.css";

function Company() {
  return (
    <section className="company-page">
      <div className="page-header">
        <h2>회사</h2>
        <hr></hr>
      </div>

      <div className="images">
        <img className="user-img" alt="user" src="img/user.svg" />
        <img className="user-img" alt="user" src="img/user.svg" />
        <img className="user-img" alt="user" src="img/user.svg" />
        <img className="user-img" alt="user" src="img/user.svg" />
      </div>

      <div className="article">
        <h3 className="first-header">내용 넣어주세요</h3>
        <div className="block-one">내용</div>
        <h3 className="second-header">내용 넣어주세요</h3>
        <div className="block-two">내용</div>
      </div>
    </section>
  );
}

export default Company;
