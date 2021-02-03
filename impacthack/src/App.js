import React, { Component } from "react";
import {
  Route,
  NavLink,
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

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <h1>Cool Name</h1>
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/currentmedications">Current Medications</NavLink></li>
            <li><NavLink to="/pastmedications">Past Medications</NavLink></li>
            <li><NavLink to="/reminders">Reminders</NavLink></li>
            <li><NavLink to="/silly">Silly</NavLink></li>
            <li><NavLink to="/signin">Sign in</NavLink></li>
            <li><NavLink to="/register">Register</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/currentmedications" component={CurrentMedications} />
            <Route path="/editmedication/:medicationId" component={EditMedication} />
            <Route path="/pastmedications" component={PastMedications} />
            <Route path="/reminders" component={Reminders} /> 
            <Route path="/silly" component={Silly} />
            <Route path="/signin" component={Signin} />
            <Route path="/register" component={Register} />
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
