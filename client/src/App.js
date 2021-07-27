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
  Shop,
  MyAccount,
} from "./components/routes/RoutesIndex";

import "./App.css";

class App extends React.Component {
  state = {
    isLoading: true,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 5000);
  }

  render() {
    return (
      <>
        <Router>
          <NavBar />
          <Route exact path="/" component={HomePage} />

          {/* NavMenu */}
          <Route path="/manual" component={Manual} />
          <Route path="/company" component={Company} />
          {/* <Route path="/shop" component={Shop} /> */}
          <Route path="/faq" component={FAQ} />
          <Route path="/contact" component={Contact} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/myaccount" component={MyAccount} />
          <Footer />
        </Router>
      </>
    );
  }
}

export default App;
