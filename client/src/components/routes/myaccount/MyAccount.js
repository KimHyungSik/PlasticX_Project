import React from "react";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";

import { Wallet, Settings, History, CurrentInfo } from "../RoutesIndex";

import "./MyAccount.css";
import MyAccountNavBar from "./MyAccountNavBar";

class MyAccount extends React.Component {
  render() {
    return (
      <Router>
        <div className="page-header">
          <h2>내계정</h2>
          <hr></hr>
        </div>
        <MyAccountNavBar />

        <Route exact path="/myaccount" component={Wallet} />

        {/* NavMenu */}
        <Route path="/myaccount/wallet" component={Wallet} />
        <Route path="/myaccount/currentinfo" component={CurrentInfo} />
        <Route path="/myaccount/history" component={History} />
        <Route path="/myaccount/settings" component={Settings} />
      </Router>
    );
  }
}

export default MyAccount;
