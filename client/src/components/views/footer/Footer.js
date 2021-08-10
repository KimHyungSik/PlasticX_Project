import React from "react";
import { Link } from "react-router-dom";

import "./Footer.css";
import MenuItems from "../../views/navbar/MenuItems";

function Footer() {
  return (
    <footer className="footer-back">
      <div className="footer global-width">
        <div className="footer-plasticx-logo">
          <img
            className="plasticx-only-logo"
            alt="plasticx_only_logo"
            src="/img/plasticx_only_logo.png"
          />
          <span>A Life Changer</span>
        </div>
        <div className="footer-menu">
          <div className="footer-menu-items">
            <span className="footer-logo-name">PLASTICX</span>
            {MenuItems.map((item, index) => {
              return (
                <Link to={item.url} className={item.cName}>
                  <span key={index}>{item.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
