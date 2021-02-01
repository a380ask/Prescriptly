import React, { Component } from "react";

class Signin extends Component {
    render() {
        return (
            <div>
                <h2>Sign in!</h2>
                <form>
                    <input
                        type="email"
                        name="email"
                    />
                    <input
                        type="password"
                        name="password"
                    />
                    <button
                        type="submit"
                    >
                        Sign in
                    </button>
                </form>
            </div>
        );
    }
}

export default Signin;