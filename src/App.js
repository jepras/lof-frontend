import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";

import About from "./components/windows/About";
import Ansøg from "./components/windows/Ansøg";
import Privatliv from "./components/windows/Privatliv";
import Faq from "./components/windows/Faq";

import Oversigt from "./components/admin/Oversigt";

import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
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
      </BrowserRouter>
    );
  }
}

export default App;
