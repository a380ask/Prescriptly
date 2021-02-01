import React, { Component } from "react";
import axios from 'axios';

class Register extends Component {
    state = {
        data: [],
        id: 0,
        name: '',
        email: '',
        password: '',
    };
 
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
        return (
            <div>
                <h2>Register!</h2>
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
                    <button
                        type="submit"
                        onClick={() => this.putDataToDB(document.getElementById('name').value, 
                            document.getElementById('email').value, document.getElementById('password').value)}
                    >
                        Register
                    </button>
                </form>
            </div>
        );
    }
}

export default Register;