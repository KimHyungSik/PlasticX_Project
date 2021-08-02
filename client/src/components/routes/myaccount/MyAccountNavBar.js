import React from "react";
import { Link } from "react-router-dom";

import MyAccountItems from "./MyAccountItems";
import "./MyAccountNavBar.css";

function MyAccountNavBar() {
  return (
    <div className="nav-wallet">
      <nav className="navbar global-width">
        <ul className="nav-menu">
          {MyAccountItems.map((item, index) => {
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
    </div>
  );
}

export default MyAccountNavBar;
