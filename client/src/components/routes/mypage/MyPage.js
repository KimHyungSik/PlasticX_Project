import React from "react";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";

import { Account, Settings, History } from "../RoutesIndex";

import "./MyPage.css";
import MyPageItems from "./MyPageItems";
import MyPageNavBar from "./MyPageNavBar";

class MyPage extends React.Component {
  render() {
    return (
      <>
        <div className="page-header">
          <h2>마이 페이지</h2>
          <hr></hr>
        </div>
        <section className="mypage global-width">
          <Router>
            {/* 창 사이즈 1200px 일때 나오는 mypage nav */}
            <nav className="page-hidden-navbar">
              <ul>
                {MyPageItems.map((item, index) => {
                  return (
                    <Link to={item.url}>
                      <li className={item.cName} key={index}>
                        {item.title}
                      </li>
                    </Link>
                  );
                })}
              </ul>
            </nav>
            <MyPageNavBar />

            {/* NavMenu */}
            <Route path="/mypage/account" component={Account} />
            <Route path="/mypage/history" component={History} />
            <Route path="/mypage/settings" component={Settings} />
          </Router>
        </section>
      </>
    );
  }
}

export default MyPage;
