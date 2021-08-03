import React from "react";
import { Link } from "react-router-dom";

import MyPageItems from "./MyPageItems";
import "./MyPageNavBar.css";

function MyPageNavBar() {
  return (
    <nav className="mypage-nav-menu">
      <ul className="mypage-nav-items">
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
  );
}

export default MyPageNavBar;
