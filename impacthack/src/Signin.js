import React, { Component } from "react";
import { NavLink, Redirect } from 'react-router-dom';

var signedIn = false;

class Signin extends Component {
    state = {
        data: [],
        email: '',
        password: '',
        redirect: null
    }

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

    clickSignin = (email, password) => {
        signedIn = false;
        const allData = this.state.data;
        for (let i = 0; i < allData.length; i++) {
            if (allData[i].email === email && allData[i].password === password) {
                signedIn = true;
                this.setState({ redirect: allData[i]._id + "/home" });
                console.log("Signed in!");
                sessionStorage.clear();
            }
        }
        if (!signedIn) {
            sessionStorage.clear();
            sessionStorage.setItem("message", "Incorrect email or password");
        }
    };

    render() {
        const { data } = this.state;
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div>
                <ul>
                    <li><NavLink to="/">Sign in</NavLink></li>
                    <li><NavLink to="/register">Register</NavLink></li>
                </ul>
                <h2>Sign in!</h2>
                <p id="message">{sessionStorage.getItem("message")}</p>
                <form>
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
                    onClick={() => this.clickSignin(document.getElementById("email").value, document.getElementById("password").value)}
                >
                    Sign in
                    </button>




            </div>
        );
    }
}

export default Signin;