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
    <Footer />
  </Router>
);
