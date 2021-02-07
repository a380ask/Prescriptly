import React, { Component } from "react";
import axios from 'axios';
import { NavLink, Redirect } from 'react-router-dom';
import logo from './logo2 (2).png';
var signedIn = false;
class Register extends Component {
    state = {
        data: [],
        id: 0,
        name: '',
        email: '',
        password: '',
        redirect: null
    };

    componentDidMount() {
        this.getDataFromDb();
        if (!this.state.intervalIsSet) {
            let interval = setInterval(this.getDataFromDb, 1000);
            this.setState({ intervalIsSet: interval });
        }
    }

    componentWillUnmount() {
        if (this.state.intervalIsSet) {
            clearInterval(this.state.intervalIsSet);
            this.setState({ intervalIsSet: null });
        }
    }

    getDataFromDb = () => {
        fetch('http://localhost:3001/api/getUserData')
            .then((data) => data.json())
            .then((res) => this.setState({ data: res.data }));
    };

    checkData = (name, email, password) => {
        const allData = this.state.data;
        for (let i = 0; i < allData.length; i++) {
            if (allData[i].email !== email) {
                signedIn = true;
            } else {
                signedIn = false;
                break;
            }
        }
        if (!signedIn) {
            sessionStorage.clear();
            sessionStorage.setItem("message", "Your email already exists. Please sign in");
        } else {
            this.putDataToDB(name, email, password);
            sessionStorage.clear();
            sessionStorage.setItem("message", "Please sign in");
            this.setState({ redirect: "/" });
        }
    }

    putDataToDB = (name, email, password) => {
        let currentIds = this.state.data.map((data) => data.id);
        let idToBeAdded = 0;
        while (currentIds.includes(idToBeAdded)) {
            ++idToBeAdded;
        }

        axios.post('http://localhost:3001/api/putSigninData', {
            id: idToBeAdded,
            name: name,
            email: email,
            password: password
        });
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div>
                <ul>
                    <NavLink to={"/"}><img src={logo} width="10%" /></NavLink>
                    <li><NavLink to="/">SIGN IN</NavLink></li>
                    <li><NavLink to="/register">REGISTER</NavLink></li>
                </ul>
                <h2>REGISTER</h2>
                <p>{sessionStorage.getItem("message")}</p>
                <fieldset>
                    <form>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            id="name"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            id="email"
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            id="password"
                        />
                    </form>
                    <button
                        type="submit"
                        className="newButton"
                        onClick={() => this.checkData(document.getElementById('name').value,
                            document.getElementById('email').value, document.getElementById('password').value)}
                    >
                        Register
                    </button>
                </fieldset>
                <div className="footer">
                    <p>Contact Us: medicationstime@gmail.com</p>
                </div>
            </div>
        );
    }
}

export default Register;