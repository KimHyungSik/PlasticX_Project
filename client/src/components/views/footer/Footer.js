import React from "react";
import { Link } from "react-router-dom";

import "./Footer.css";
import MenuItems from "../../views/navbar/MenuItems";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-plasticx-logo">
        <img
          className="plasticx-only-logo"
          alt="plasticx_only_logo"
          src="img/plasticx_only_logo.png"
        />
        <span>A Life Changer</span>
      </div>
      <div className="footer-menu">
        <span>PLASTICX</span>
        <ul className="footer-menu-items">
          {MenuItems.map((item, index) => {
            return (
              <Link to={item.url}>
                <li className={item.cName} key={index}>
                  {item.title}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Footer;
