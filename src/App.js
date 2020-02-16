import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import About from "./components/windows/About";
import Ansøg from "./components/windows/Ansøg";
import Privatliv from "./components/windows/Privatliv";
import Faq from "./components/windows/Faq";

import Oversigt from "./components/admin/Oversigt";

import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";

import M from "materialize-css/dist/js/materialize.min.js"; // Deleted to not overwrite css, but might be necessary for Sidenav
/* import "materialize-css/dist/css/materialize.min.css"; */ class App extends Component {
  componentDidMount() {
    var elem = document.querySelector(".sidenav");
    // eslint-disable-next-line
    var instance = M.Sidenav.init(elem, {
      edge: "left",
      inDuration: 250
    });

    var elems = document.querySelectorAll(".fixed-action-btn");

    // eslint-disable-next-line
    var instances = M.FloatingActionButton.init(elems);
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div className="main container">
            <Switch>
              <Route exact path="/" component={About} />
              <Route path="/faq" component={Faq} />
              <Route path="/ansøg" component={Ansøg} />
              <Route path="/privatliv" component={Privatliv} />

              <Route path="/oversigt" component={Oversigt} />

              <Route path="/login" component={SignIn} />
              <Route path="/opret" component={SignUp} />
            </Switch>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
