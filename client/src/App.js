import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { NavBar, Footer } from "./components/views/ViewsIndex";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  Company,
  Contact,
  FAQ,
  Shop,
} from "./components/routes/RoutesIndex";

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
          <Route path="/company" component={Company} />
          <Route path="/shop" component={Shop} />
          <Route path="/faq" component={FAQ} />
          <Route path="/contact" component={Contact} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
        </Router>
        <Footer />
      </>
    );
  }
}

export default App;
