import React, { Component } from "react";
import {
  Route,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import PastMedications from "./PastMedications";
import Reminders from "./Reminders";
import Silly from "./Silly";
import Signin from "./Signin";
import Register from "./Register";
import CurrentMedications from "./CurrentMedications";
import EditMedication from "./EditMedication";
import "./App.css";

// async function windowLoc() {
//     var loc = window.location.href;
//     var indexHash = window.location.href.indexOf("#"); 
//     var indexSecondSlash = window.location.href.indexOf("#") + 1;
//     var indexThirdSlash = window.location.href.indexOf("/", window.location.href.indexOf("#") + 1 + 1);
//     userId = window.location.href.substring(window.location.href.indexOf("#") + 1 + 1, window.location.href.indexOf("/", window.location.href.indexOf("#") + 1 + 1));
// }

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <div className="content" id="id">
            <Route exact path="/:userId/home" component={Home} />
            <Route exact path="/:userId/currentmedications" component={CurrentMedications} />
            <Route exact path="/:userId/editmedication/:medicationId" component={EditMedication} />
            <Route exact path="/:userId/pastmedications" component={PastMedications} />
            <Route exact path="/:userId/reminders" component={Reminders} />
            <Route exact path="/silly" component={Silly} />
            <Route exact path="/" component={Signin} />
            <Route exact path="/register" component={Register} />
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
