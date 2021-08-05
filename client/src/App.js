import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar, Footer } from "./components/views/ViewsIndex";

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

import Auth from "./hoc/auth";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <NavBar />
          <Route exact path="/" component={Auth(HomePage, null)} />

          {/* NavMenu */}
          <Route path="/manual" component={Auth(Manual, null)} />
          <Route path="/company" component={Auth(Company, null)} />
          {/* <Route path="/shop" component={Shop} /> */}
          <Route path="/faq" component={Auth(FAQ, null)} />
          <Route path="/contact" component={Auth(Contact, null)} />
          <Route path="/login" component={Auth(LoginPage, false)} />
          <Route path="/register" component={Auth(RegisterPage, false)} />
          <Route path="/mypage" component={Auth(MyPage, true)} />
          <Footer />
        </Router>
      </>
    );
  }
}

export default App;
