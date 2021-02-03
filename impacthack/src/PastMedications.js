import React, { Component } from "react";
import axios from 'axios';

class PastMedications extends Component {
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
        fetch('http://localhost:3001/api/getPastMedicationData')
            .then((data) => data.json())
            .then((res) => this.setState({ data: res.data }));
    };

    //Moves data to current medication page and removes it from this page
    putCurrentDataToDB = (name, type, prescribedMonth, prescribedDay, prescribedYear, instructions) => {
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


    deleteFromDB = (idTodelete) => {
        let objIdToDelete = null;
        this.state.data.forEach((dat) => {
            if (dat._id == idTodelete) {
                objIdToDelete = dat._id;
            }
        });

        axios.delete('http://localhost:3001/api/deletePastMedicationData', {
            data: {
                id: objIdToDelete,
            },
        });
    };

    render() {
        const { data } = this.state;
        return (
            
            <div>
                <h2>Past medications</h2>
                <ul>
                    {data.length <= 0 ? 'NO DB ENTRIES YET': data.map((dat) => (
                            <li style={{ padding: '10px' }} key={data._id}>
                                <span style={{ color: 'gray' }}> id: </span> {dat._id} <br />
                                <span style={{ color: 'gray' }}> Medication: </span> {dat.name} <br />
                                <span style={{ color: 'gray' }}> Type: </span> {dat.type} <br />
                                <span style={{ color: 'gray' }}> Prescribed Date: </span> {dat.prescribedMonth}/{dat.prescribedDay}/{dat.prescribedYear} <br />
                                <span style={{ color: 'gray' }}> Instructions: </span> {dat.instructions} <br />
                                <button onClick={() => console.log("Edit Not Implemented Yet")}>
                                    EDIT - Not Implemented Yet :(
                                </button> <br />
                                <button onClick={() => this.deleteFromDB(dat._id)}>
                                    DELETE
                                </button> <br />
                                <button onClick={() => {
                                    this.putCurrentDataToDB(dat.name, dat.type, dat.prescribedMonth, dat.prescribedDay, dat.prescribedYear, dat.instructions);
                                    this.deleteFromDB(dat._id);
                                    }}>
                                    RETURN TO CURRENT MEDICATION
                                </button> <br />
                            </li>
                        ))}
                </ul>
            </div>
        );
    }
}

export default PastMedications;