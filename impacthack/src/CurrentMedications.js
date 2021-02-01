import React, { Component } from "react";
import axios from 'axios';

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

        axios.post('http://localhost:3001/api/putData', {
            id: idToBeAdded,
            name: name,
            type: type,
            prescribedMonth: prescribedMonth,
            prescribedDay: prescribedDay, 
            prescribedYear: prescribedYear, 
            instructions: instructions

        });
    };

    

    render() {
        const { data } = this.state;
        return (
            <div>
                <h2>Current Medications</h2>
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
                        type="test"
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
                    {data.length <= 0
                        ? 'NO DB ENTRIES YET'
                        : data.map((dat) => (
                            <li style={{ padding: '10px' }} key={data.name}>
                                <span style={{ color: 'gray' }}> id: </span> {dat._id} <br />
                                <span style={{ color: 'gray' }}> Name: </span> {dat.name} <br />
                                <span style={{ color: 'gray' }}> Type: </span> {dat.type} <br />
                                <span style={{ color: 'gray' }}> Date Prescribed: </span> {dat.prescribedMonth} / {dat.prescribedDay} / {dat.prescribedYear}<br />
                                <span style={{ color: 'gray' }}> Instructions: </span> {dat.instructions} <br />
                            </li>
                        ))}
                </ul>
            </div>
        );
    }
}

export default CurrentMedications;