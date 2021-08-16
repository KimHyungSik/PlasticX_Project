import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { NavBar, Footer, Privacy } from "./components/views/ViewsIndex";

import {
  HomePage,
  Manual,
  LoginPage,
  RegisterPage,
  Company,
  Contact,
  FAQ,
  MyPage,
} from "./components/routes/RoutesIndex";

export default (
  <Router>
    <ScrollToTop />
    <NavBar />
    <Route exact path="/" component={HomePage} />
    <Route exact path="/manual" component={Manual} />
    <Route exact path="/company" component={Company} />
    <Route exact path="/faq" component={FAQ} />
    <Route exact path="/contact" component={Contact} />
    <Route exact path="/login" component={LoginPage} />
    <Route exact path="/register" component={RegisterPage} />
    <Route exact path="/mypage" component={MyPage} />
    <Route exact path="/privacy" component={Privacy} />
    <Footer />
  </Router>
);
