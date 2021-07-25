import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Collapse from "react-bootstrap/Collapse";

import MenuItems from "./MenuItems";
import Button from "./Button";
import "./NavBar.css";

function NavBar() {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <div className="nav-container">
      <nav className="navbar global-width">
        <div>
          <Link to="/">
            <img
              className="plasticx-logo"
              alt="plasticx_logo"
              src="img/plasticx_logo.png"
            />
          </Link>
        </div>
        <ul className="nav-menu">
          {MenuItems.map((item, index) => {
            return (
              <Link to={item.url}>
                <li className={item.cName} key={index}>
                  {item.title}
                </li>
              </Link>
            );
          })}
          <Link to="/login">
            <li>
              <Button>Login</Button>
            </li>
          </Link>
          <Link to="/register">
            <li>
              <Button>Sign In</Button>
            </li>
          </Link>
        </ul>
        <div
          className="collapsible"
          onClick={() => setIsOpen(!isOpen)}
          aria-controls="navCollapseMenu"
          aria-expanded={isOpen}
        >
          <Button>
            <i className={isOpen ? "fas fa-times" : "fas fa-bars"}></i>
          </Button>
        </div>
      </nav>
      <Collapse in={isOpen}>
        <div id="navCollapseMenu">
          <ul className="nav-collapse-menu">
            {MenuItems.map((item, index) => {
              return (
                <Link to={item.url}>
                  <li className={item.cName} key={index}>
                    {item.title}
                  </li>
                </Link>
              );
            })}
            <li>
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            </li>
            <li>
              <Link to="/register">
                <Button>Sign In</Button>
              </Link>
            </li>
          </ul>
        </div>
      </Collapse>
    </div>
  );
}

export default NavBar;
