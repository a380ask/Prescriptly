import React, { Component } from "react";
import axios from 'axios';

import { NavLink } from 'react-router-dom';

async function genMess() {
    sessionStorage.setItem("message", "Successfully signed out");
}

let dataCopy = [];
let filtered = [];
let userIdString = '';

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
        userID: ''

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


    }


    //put current data into DB
    putDataToDB = (name, type, date, instructions) => {
        let prescribedMonth = date.substring(5, 7);
        let prescribedDay = date.substring(8);
        let prescribedYear = date.substring(0, 4);
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
            instructions: instructions,
            userID: userIdString

        });
    };

    //Moves data to past medication page and removes it from this page
    putPastDataToDB = (name, type, prescribedMonth, prescribedDay, prescribedYear, instructions) => {
        let currentIds = this.state.data.map((data) => data.id);
        let idToBeAdded = 0;
        while (currentIds.includes(idToBeAdded)) {
            ++idToBeAdded;
        }
        console.log("start");
        axios.post('http://localhost:3001/api/putPastMedicationData', {
            id: idToBeAdded,
            name: name,
            type: type,
            prescribedMonth: prescribedMonth,
            prescribedDay: prescribedDay,
            prescribedYear: prescribedYear,
            instructions: instructions,
            userID: userIdString
        });
    };

    // our delete method that uses our backend api
    // to remove existing database information
    deleteFromDB = (idTodelete, deleteOrMove) => {

        let message = '';
        if (deleteOrMove == 'delete') {
            message = "Are you sure you want to delete this medication?";
        } else if (deleteOrMove == 'move') {
            message = "Are you sure you want to move this medication to past medication?";
        }

        if (window.confirm(message)) {
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
        }
        window.location.reload();
    };

    filterData = () => {
        for (let i = 0; i < this.state.data.length; i++) {
            if (this.state.data[i].userID == userIdString && this.isIncluded(this.state.data[i])) {
                filtered.push(this.state.data[i]);
            }
        }
    };

    isIncluded = (object) => {
        for (let i = 0; i < filtered.length; i++) {
            if (filtered[i]._id === object._id) {
                return false;
            }
        }
        return true;
    };



    render() {
        const { data } = this.state;
        userIdString = window.location.href.substring(window.location.href.indexOf("#") + 1 + 1, window.location.href.indexOf("/", window.location.href.indexOf("#") + 1 + 1));
        this.filterData();
        return (
            <div className = "medications">
                <ul>
                    <li><NavLink to="/" onClick={genMess}>Sign Out</NavLink></li>
                    <li><NavLink to={"/" + window.location.href.substring(window.location.href.indexOf("#") + 1 + 1, window.location.href.indexOf("/", window.location.href.indexOf("#") + 1 + 1)) + "/pastmedications"}>Past Medications</NavLink></li>
                    <li><NavLink to={"/" + window.location.href.substring(window.location.href.indexOf("#") + 1 + 1, window.location.href.indexOf("/", window.location.href.indexOf("#") + 1 + 1)) + "/currentmedications"}>Current Medications</NavLink></li>
                    <li><NavLink to={"/" + window.location.href.substring(window.location.href.indexOf("#") + 1 + 1, window.location.href.indexOf("/", window.location.href.indexOf("#") + 1 + 1)) + "/reminders"}>Reminders</NavLink></li>
                    <li><NavLink to={"/" + window.location.href.substring(window.location.href.indexOf("#") + 1 + 1, window.location.href.indexOf("/", window.location.href.indexOf("#") + 1 + 1)) + "/home"}>Home</NavLink></li>
                </ul>
                <h2>Current Medications</h2>
                <div className="outside">
                <form className="left">
                    <label htmlFor="name">Name:  </label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        id="name"
                    /><br />
                    <label htmlFor="type">Type:  </label>
                    <input
                        type="text"
                        name="type"
                        placeholder="Type of Medication"
                        id="type"
                    /><br />
                    <label htmlFor="date">Starting Date:  </label>
                    <input
                        type="date"
                        name="date"
                        placeholder="Select Start Date: "
                        id="date"
                    /><br />
                    <label htmlFor="instructions">Instructions:  </label>
                    <input
                        type="text"
                        name="instructions"
                        placeholder="Instructions for Medication"
                        id="instructions"
                    /><br />

                    <button
                        className="newButton"
                        type="submit"
                        onClick={() => this.putDataToDB(
                            document.getElementById('name').value,
                            document.getElementById('type').value,
                            document.getElementById('date').value,
                            document.getElementById('instructions').value
                        )}
                    >
                        ADD NEW MEDICATION
                    </button>
                </form>
                <div className="right">
                    {filtered.length <= 0 ? 'NO DB ENTRIES YET' : filtered.map((dat) => (
                        <div className="container">
                            <div className="card" key={dat._id}>
                                {/* <span > id: </span> {dat._id} <br /> */}
                                <span > Medication: </span> {dat.name} <br />
                                <span > Type: </span> {dat.type} <br />
                                <span > Prescribed Date: </span> {dat.prescribedMonth}/{dat.prescribedDay}/{dat.prescribedYear} <br />
                                <span > Instructions: </span> {dat.instructions} <br />

                                <div className="buttonGroup">
                                    <NavLink className="newButton" type="button"  to={"/" + window.location.href.substring(window.location.href.indexOf("#") + 1 + 1, window.location.href.indexOf("/", window.location.href.indexOf("#") + 1 + 1)) + "/editmedication/" + dat._id} >
                                    EDIT</NavLink>

                                    <button className="newButton" style={{ paddingTop: "7px" }} onClick={() => this.deleteFromDB(dat._id, 'delete')}>
                                        DELETE
                                        </button>

                                    <button style={{ paddingTop: "8px" }} className="newButton" onClick={() => {
                                        this.putPastDataToDB(dat.name, dat.type, dat.prescribedMonth, dat.prescribedDay, dat.prescribedYear, dat.instructions);
                                        this.deleteFromDB(dat._id, 'move');
                                    }}>
                                        MOVE TO PAST MEDICATIONS
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                </div>
                <div className="footer">
                    <p>Contact Us: </p>
                </div>
            </div>

        );
    }
}

export default CurrentMedications;