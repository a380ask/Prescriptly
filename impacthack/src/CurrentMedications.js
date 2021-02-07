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
        if(deleteOrMove == 'delete'){
            message = "Are you sure you want to delete this medication?";
        } else if (deleteOrMove == 'move'){
            message = "Are you sure you want to move this medication to past medication?";
        }
        
        if(window.confirm(message)){
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
        for(let i = 0; i < this.state.data.length; i++){
            if(this.state.data[i].userID == userIdString && this.isIncluded(this.state.data[i])){
                filtered.push(this.state.data[i]);
            }
        }
    };
    
    isIncluded = (object) => {
        for(let i = 0; i < filtered.length; i++){
            if(filtered[i]._id === object._id){
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
            <div>
                <ul>
                <li><NavLink to="/" onClick={genMess}>Sign Out</NavLink></li>
                <li><NavLink to="/silly">Silly</NavLink></li>
                <li><NavLink to={"/" + window.location.href.substring(window.location.href.indexOf("#") + 1 + 1, window.location.href.indexOf("/", window.location.href.indexOf("#") + 1 + 1)) + "/pastmedications"}>Past Medications</NavLink></li>
                <li><NavLink to={"/" + window.location.href.substring(window.location.href.indexOf("#") + 1 + 1, window.location.href.indexOf("/", window.location.href.indexOf("#") + 1 + 1)) + "/currentmedications"}>Current Medications</NavLink></li>
                <li><NavLink to={"/" + window.location.href.substring(window.location.href.indexOf("#") + 1 + 1, window.location.href.indexOf("/", window.location.href.indexOf("#") + 1 + 1)) + "/reminders"}>Reminders</NavLink></li>
                <li><NavLink to={"/" + window.location.href.substring(window.location.href.indexOf("#") + 1 + 1, window.location.href.indexOf("/", window.location.href.indexOf("#") + 1 + 1)) + "/home"}>Home</NavLink></li>
                </ul>
                <h2>Current Medications</h2>
                <form>
                    <label htmlFor="name">Name:  </label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        id="name"
                    /><br/>
                    <label htmlFor="type">Type:  </label>
                    <input
                        type="text"
                        name="type"
                        placeholder="Type of Medication"
                        id="type"
                    /><br/>
                    <label htmlFor="date">Starting Date:  </label>
                    <input
                        type="date"
                        name="date"
                        placeholder="Select Start Date: "
                        id="date"
                    /><br/>
                    <label htmlFor="instructions">Instructions:  </label>
                    <input
                        type="text"
                        name="instructions"
                        placeholder="Instructions for Medication"
                        id="instructions"
                    /><br/>
                    
                    <button
                        type="submit"
                        onClick={() => this.putDataToDB(
                            document.getElementById('name').value,
                            document.getElementById('type').value,
                            document.getElementById('date').value,
                            document.getElementById('instructions').value
                            )}
                    >
                        Add New Medication
                    </button>
                </form>
                <ul>
                    {filtered.length <= 0 ? 'NO DB ENTRIES YET' : filtered.map((dat) => (
                        <li style={{ padding: '10px' }} key={dat._id}>
                            <span style={{ color: 'gray' }}> id: </span> {dat._id} <br />
                            <span style={{ color: 'gray' }}> Medication: </span> {dat.name} <br />
                            <span style={{ color: 'gray' }}> Type: </span> {dat.type} <br />
                            <span style={{ color: 'gray' }}> Prescribed Date: </span> {dat.prescribedMonth}/{dat.prescribedDay}/{dat.prescribedYear} <br />
                            <span style={{ color: 'gray' }}> Instructions: </span> {dat.instructions} <br />

                            <NavLink to={"/" + window.location.href.substring(window.location.href.indexOf("#") + 1 + 1, window.location.href.indexOf("/", window.location.href.indexOf("#") + 1 + 1)) + "/editmedication/" + dat._id} >
                                <button>EDIT</button> <br />
                            </NavLink>

                            <button onClick={() => this.deleteFromDB(dat._id, 'delete')}>
                                DELETE
                                </button> <br />

                            <button onClick={() => {
                                this.putPastDataToDB(dat.name, dat.type, dat.prescribedMonth, dat.prescribedDay, dat.prescribedYear, dat.instructions);
                                this.deleteFromDB(dat._id, 'move');
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