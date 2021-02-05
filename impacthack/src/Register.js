import React, { Component } from "react";
import axios from 'axios';
import { NavLink, Redirect } from 'react-router-dom';

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
                <h2>Register!</h2>
                <ul>
                    <li><NavLink to="/">Sign in</NavLink></li>
                    <li><NavLink to="/register">Register</NavLink></li>
                </ul>
                <p>{sessionStorage.getItem("message")}</p>
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
                    onClick={() => this.checkData(document.getElementById('name').value,
                        document.getElementById('email').value, document.getElementById('password').value)}
                >
                    Register
                    </button>
            </div>
        );
    }
}

export default Register;