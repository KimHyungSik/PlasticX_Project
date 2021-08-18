import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
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

import ScrollToTop from "./components/ScrollToTop";
import Auth from "./hoc/auth";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <ScrollToTop />
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
          <Route path="/privacy" component={Auth(Privacy, null)} />
          <Footer />
        </BrowserRouter>
      </>
    );
  }
}

export default App;
