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
        <div className="khs">
          <img className="user-img" alt="user" src="img/company_khs.svg" />
          <p className="names">김형식</p>
          <p className="duty">앱 개발자</p>
        </div>

        <div className="pky">
          <img className="user-img" alt="user" src="img/company_pky.svg" />
          <p className="names">박경용</p>
          <p className="duty">기계 개발자</p>
        </div>

        <div className="jjh">
          <img className="user-img" alt="user" src="img/company_jjh.svg" />
          <p className="names">주정하</p>
          <p className="duty">API/웹 개발자</p>
        </div>

        <div className="jyb">
          <div className="circle">
            <img className="user-img" alt="user" src="img/company_jyb.svg" />
          </div>
          <p className="names">조유빈</p>
          <p className="duty">API/웹 디자인</p>
        </div>
      </div>

      <h4 className="first-header">
        회사의 가치관, 영감, 다음 옥표 그리고 하고 싶은 말 내용 넣어주세요
      </h4>
      <div className="block-one">
        학교교육 및 평생교육을 포함한 교육제도와 그 운영, 교육재정 및 교원의
        지위에 관한 기본적인 사항은 법률로 정한다. 대한민국은 통일을 지향하며,
        자유민주적 기본질서에 입각한 평화적 통일 정책을 수립하고 이를 추진한다.
      </div>

      <h4 className="second-header">
        회사의 가치관, 영감, 다음 옥표 그리고 하고 싶은 말 내용 넣어주세요
      </h4>
      <div className="block-two">
        학교교육 및 평생교육을 포함한 교육제도와 그 운영, 교육재정 및 교원의
        지위에 관한 기본적인 사항은 법률로 정한다. 대한민국은 통일을 지향하며,
        자유민주적 기본질서에 입각한 평화적 통일 정책을 수립하고 이를 추진한다.
      </div>
    </section>
  );
}

export default Company;
