import React, { Component } from "react";
import axios from 'axios';

import { NavLink } from 'react-router-dom';

async function genMess() {
    sessionStorage.setItem("message", "Successfully signed out");
}
class CurrentMedications extends Component {
    state = {
        data: [],
        id: 0,
        name: '',
        type: '',
        prescribedMonth: 0,
        prescribedDay: 0,
        prescribedYear: 0,
        instructions: '',
        userID: null

    };
    // when component mounts, first thing it does is fetch all existing data in our db
    // then we incorporate a polling logic so that we can easily see if our db has
    // changed and implement those changes into our UI
    componentDidMount() {
        this.getDataFromDb();
        if (!this.state.intervalIsSet) {
            let interval = setInterval(this.getDataFromDb, 1000);
            this.setState({ intervalIsSet: interval });
        }
    }

    // never let a process live forever
    // always kill a process everytime we are done using it
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

    putDataToDB = (name, type, prescribedMonth, prescribedDay, prescribedYear, instructions) => {
        let currentIds = this.state.data.map((data) => data.id);
        let idToBeAdded = 0;
        while (currentIds.includes(idToBeAdded)) {
            ++idToBeAdded;
        }

        axios.post('http://localhost:3001/api/putMedicationData', {
            id: idToBeAdded,
            name: name,
            type: type,
            prescribedMonth: prescribedMonth,
            prescribedDay: prescribedDay,
            prescribedYear: prescribedYear,
            instructions: instructions

        });
    };

    //Moves data to past medication page and removes it from this page
    putPastDataToDB = (name, type, prescribedMonth, prescribedDay, prescribedYear, instructions) => {
        let currentIds = this.state.data.map((data) => data.id);
        let idToBeAdded = 0;
        while (currentIds.includes(idToBeAdded)) {
            ++idToBeAdded;
        }

        axios.post('http://localhost:3001/api/putPastMedicationData', {
            id: idToBeAdded,
            name: name,
            type: type,
            prescribedMonth: prescribedMonth,
            prescribedDay: prescribedDay,
            prescribedYear: prescribedYear,
            instructions: instructions

        });
    };

    // our delete method that uses our backend api
    // to remove existing database information
    deleteFromDB = (idTodelete) => {
        let objIdToDelete = null;
        this.state.data.forEach((dat) => {
            if (dat._id == idTodelete) {
                objIdToDelete = dat._id;
            }
        });

        axios.delete('http://localhost:3001/api/deleteMedicationData', {
            data: {
                id: objIdToDelete,
            },
        });
    };



    render() {
        const { data } = this.state;

        return (
            <div>
                <h2>Current Medications</h2>
                <ul>
                    <li><NavLink to={"/" + window.location.href.substring(window.location.href.indexOf("#") + 1 + 1, window.location.href.indexOf("/", window.location.href.indexOf("#") + 1 + 1)) + "/home"}>Home</NavLink></li>
                    <li><NavLink to={"/" + window.location.href.substring(window.location.href.indexOf("#") + 1 + 1, window.location.href.indexOf("/", window.location.href.indexOf("#") + 1 + 1)) + "/currentmedications"}>Current Medications</NavLink></li>
                    <li><NavLink to={"/" + window.location.href.substring(window.location.href.indexOf("#") + 1 + 1, window.location.href.indexOf("/", window.location.href.indexOf("#") + 1 + 1)) + "/pastmedications"}>Past Medications</NavLink></li>
                    <li><NavLink to={"/" + window.location.href.substring(window.location.href.indexOf("#") + 1 + 1, window.location.href.indexOf("/", window.location.href.indexOf("#") + 1 + 1)) + "/reminders"}>Reminders</NavLink></li>
                    <li><NavLink to="/silly">Silly</NavLink></li>
                    <li><NavLink to="/" onClick={genMess}>Sign Out</NavLink></li>
                </ul>
                <form>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        id="name"
                    />
                    <input
                        type="text"
                        name="type"
                        placeholder="Type of Medication"
                        id="type"
                    />
                    <input
                        type="number"
                        min="1"
                        max="12"
                        name="prescribedMonth"
                        placeholder="Month"
                        id="prescribedMonth"
                    />
                    <input
                        type="number"
                        min="1"
                        max="31"
                        name="prescribedDay"
                        placeholder="Day"
                        id="prescribedDay"
                    />
                    <input
                        type="number"
                        min="1900"
                        max="2050"
                        name="prescribedYear"
                        placeholder="Year"
                        id="prescribedYear"
                    />
                    <input
                        type="text"
                        name="instructions"
                        placeholder="Instructions for Medication"
                        id="instructions"
                    />
                    <button
                        type="submit"
                        onClick={() => this.putDataToDB(
                            document.getElementById('name').value,
                            document.getElementById('type').value,
                            document.getElementById('prescribedMonth').value,
                            document.getElementById('prescribedDay').value,
                            document.getElementById('prescribedYear').value,
                            document.getElementById('instructions').value)}
                    >
                        Add New Medication
                    </button>
                </form>
                <ul>
                    {data.length <= 0 ? 'NO DB ENTRIES YET' : data.map((dat) => (
                        <li style={{ padding: '10px' }} key={data._id}>
                            <span style={{ color: 'gray' }}> id: </span> {dat._id} <br />
                            <span style={{ color: 'gray' }}> Medication: </span> {dat.name} <br />
                            <span style={{ color: 'gray' }}> Type: </span> {dat.type} <br />
                            <span style={{ color: 'gray' }}> Prescribed Date: </span> {dat.prescribedMonth}/{dat.prescribedDay}/{dat.prescribedYear} <br />
                            <span style={{ color: 'gray' }}> Instructions: </span> {dat.instructions} <br />

                            <NavLink to={"/" + window.location.href.substring(window.location.href.indexOf("#") + 1 + 1, window.location.href.indexOf("/", window.location.href.indexOf("#") + 1 + 1)) + "/editmedication/" + dat._id} >
                                <button>EDIT</button> <br />
                            </NavLink>

                            <button onClick={() => this.deleteFromDB(dat._id)}>
                                DELETE
                                </button> <br />

                            <button onClick={() => {
                                this.putPastDataToDB(dat.name, dat.type, dat.prescribedMonth, dat.prescribedDay, dat.prescribedYear, dat.instructions);
                                this.deleteFromDB(dat._id);
                            }}>
                                MOVE TO PAST MEDICATION
                                </button> <br />
                        </li>
                    ))}
                </ul>
            </div>

        );
    }
}

export default CurrentMedications;