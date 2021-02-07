import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import axios from 'axios';

async function genMess() {
    sessionStorage.setItem("message", "Successfully signed out");
}
class Reminders extends Component {
    state = {
        data: [],
        medid: '',
        userid: '',
        hours: '',
        min: ''
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
        fetch('http://localhost:3001/api/getMedicationData')
            .then((data) => data.json())
            .then((res) => this.setState({ data: res.data }));
    };

    createReminder = (med, time, email) => {
        axios.post('http://localhost:3001/api/postReminders', {
            medname: med,
            userid: window.location.href.substring(window.location.href.indexOf("#") + 1 + 1, window.location.href.indexOf("/", window.location.href.indexOf("#") + 1 + 1)),
            useremail: email,
            hours: time[0] + time[1],
            min: time[3] + time[4]
        });
        sessionStorage.clear();
        sessionStorage.setItem("message", "Your reminder for " + med + " has been set for " + time + " daily");
        document.getElementById("meds").value = 'initial';
        document.getElementById("remindTime").value = '';
        document.getElementById("email").value = '';
    }

    render() {
        const { data } = this.state;
        return (
            <div>
                <h2>Reminders</h2>
                <ul>
                    <li><NavLink to={"/" + window.location.href.substring(window.location.href.indexOf("#") + 1 + 1, window.location.href.indexOf("/", window.location.href.indexOf("#") + 1 + 1)) + "/home"}>Home</NavLink></li>
                    <li><NavLink to={"/" + window.location.href.substring(window.location.href.indexOf("#") + 1 + 1, window.location.href.indexOf("/", window.location.href.indexOf("#") + 1 + 1)) + "/currentmedications"}>Current Medications</NavLink></li>
                    <li><NavLink to={"/" + window.location.href.substring(window.location.href.indexOf("#") + 1 + 1, window.location.href.indexOf("/", window.location.href.indexOf("#") + 1 + 1)) + "/pastmedications"}>Past Medications</NavLink></li>
                    <li><NavLink to={"/" + window.location.href.substring(window.location.href.indexOf("#") + 1 + 1, window.location.href.indexOf("/", window.location.href.indexOf("#") + 1 + 1)) + "/reminders"}>Reminders</NavLink></li>
                    <li><NavLink to="/silly">Silly</NavLink></li>
                    <li><NavLink to="/" onClick={genMess}>Sign Out</NavLink></li>
                </ul>
                <p id="message">{sessionStorage.getItem("message")}</p>
                <form>
                    <select id="meds">
                        <option disabled selected value="initial">---Select a medication---</option>
                        {data.length <= 0 ? 'No medications; please add' : data.map((dat) => (
                            <option value={dat.name} key={dat._id}>{dat.name}</option>
                        ))}
                    </select>
                    <label htmlfor="remindTime">Reminder daily at: </label>
                    <input
                        type="time"
                        id="remindTime"
                    />
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                    />
                </form>
                <button onClick={() => this.createReminder(document.getElementById("meds").value, document.getElementById("remindTime").value,
                    document.getElementById('email').value)}>Create Reminder</button>
            </div>
        );
    }
}

export default Reminders;