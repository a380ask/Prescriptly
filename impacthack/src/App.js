import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import PastMedications from "./PastMedications";
import Reminders from "./Reminders";
import "./App.css";
import axios from 'axios';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <h1>Cool Name</h1>
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/pastmedications">Past Medications</NavLink></li>
            <li><NavLink to="/reminders">Reminders</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/pastmedications" component={PastMedications} />
            <Route path="/reminders" component={Reminders} /> 
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
