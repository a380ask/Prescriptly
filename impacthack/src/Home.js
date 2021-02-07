import React, { Component, useState, useEffect } from "react";
import {
    NavLink,
} from "react-router-dom";
import axios from "axios"
import logo from './logo.png'; 
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
            <h2>Welcome to Prescriptly!</h2>
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
            <p>Our inspiration behind creating this website is to make use of technology to make it easier for people with health issues, especially the elderly.
               Through prescriptly, the user is able to keep track of all the  medications that they have taken in the past and the ones they are taking currently. 
            </p>
            <p>This website allows the user to input their current medications and previous medications through a form. They are able to move current medications to
                the past medication list if they are no longer using it. They are able to make changes to the information related to the medication. The user can also 
                fill out a form that creates a reminder for them which will be sent by email at the time that they inputed. On the home page, an inspirational quote is 
                displayed to motivate the user to make the best of their day.  

            </p>
            <p>Hope you enjoy our website!</p>
            <p> ~ Kriti, Atharva, Khushaal</p>
            <div className="footer">
                    <p>Contact Us: </p>
                </div>
        </div>
    );
};

export default Home;