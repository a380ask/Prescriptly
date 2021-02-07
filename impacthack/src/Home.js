import React, { Component, useState, useEffect } from "react";
import {
    NavLink,
} from "react-router-dom";
import axios from "axios"

async function genMess() {
    sessionStorage.setItem("message", "Successfully signed out");
}
const Home = () => {
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");

    const quoteApi = async () => {
        let arrayOfQuotes = [];
        try {
            const data = await axios.get("https://api.quotable.io/random");
            arrayOfQuotes = data.data;
        } catch (error) {
            console.log(error);
        }

        try {
            setQuote(arrayOfQuotes.content);
            setAuthor(arrayOfQuotes.author);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        quoteApi()
    }, []);
    return (
        <div>
            <ul>
                <li><NavLink to="/" onClick={genMess}>Sign Out</NavLink></li>
                <li><NavLink to={"/" + window.location.href.substring(window.location.href.indexOf("#") + 1 + 1, window.location.href.indexOf("/", window.location.href.indexOf("#") + 1 + 1)) + "/pastmedications"}>Past Medications</NavLink></li>
                <li><NavLink to={"/" + window.location.href.substring(window.location.href.indexOf("#") + 1 + 1, window.location.href.indexOf("/", window.location.href.indexOf("#") + 1 + 1)) + "/currentmedications"}>Current Medications</NavLink></li>
                <li><NavLink to={"/" + window.location.href.substring(window.location.href.indexOf("#") + 1 + 1, window.location.href.indexOf("/", window.location.href.indexOf("#") + 1 + 1)) + "/reminders"}>Reminders</NavLink></li>
                <li><NavLink to={"/" + window.location.href.substring(window.location.href.indexOf("#") + 1 + 1, window.location.href.indexOf("/", window.location.href.indexOf("#") + 1 + 1)) + "/home"}>Home</NavLink></li>
            </ul>
            <h2>Welcome!</h2>
            <div className="quotes">
                <div className="quote">
                    {quote}
                </div>
                <div className="author">
                    {author}
                </div>
            </div>
            <div className="get">
                <button onClick={quoteApi}> Get Quote</button>
            </div>
        </div>
    );
};

export default Home;