import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Collapse from "react-bootstrap/Collapse";

import MenuItems from "./MenuItems";
import Button from "./Button";
import "./NavBar.css";
import axios from "axios";

function NavBar() {
  let [isOpen, setIsOpen] = useState(false);
  let [isLoggedIn, setIsLoggedIn] = useState(false);

  const onClickHandler = () => {
    axios.get("/api/user/logout").then((response) => {
      alert("정상적으로 로그아웃 되었습니다.");
      setIsLoggedIn(false);
    });
  };

  useEffect(() => {
    axios.get("/api/user/auth").then((response) => {
      // RESULT === 400 이면 로그인 실패
      response.data.RESULT !== 400 ? setIsLoggedIn(true) : setIsLoggedIn(false);
    });
  }, [isLoggedIn]);

  return (
    <>
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

            {isLoggedIn ? (
              <>
                <Link to="/mypage/account">
                  <li className="nav-links">
                    <span>My Page</span>
                  </li>
                </Link>
                <Link to="/">
                  <li>
                    <Button onClick={onClickHandler}>Logout</Button>
                  </li>
                </Link>
              </>
            ) : (
              <>
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
              </>
            )}
          </ul>
          <div
            id="navMenuButton"
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
              {isLoggedIn ? (
                <>
                  <Link to="/mypage/account">
                    <li className="nav-links">
                      <span>My Page</span>
                    </li>
                  </Link>
                  <Link to="/">
                    <li>
                      <Button onClick={onClickHandler}>Logout</Button>
                    </li>
                  </Link>
                </>
              ) : (
                <>
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
                </>
              )}
            </ul>
          </div>
        </Collapse>
      </div>
      <div
        className={isOpen ? "nav-overlay nav-overlay-show" : "nav-overlay"}
        onClick={() => setIsOpen(!isOpen)}
      ></div>
    </>
  );
}

export default NavBar;
