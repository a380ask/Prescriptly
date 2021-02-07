import React, { Component } from "react";
import axios from 'axios';
import { NavLink, Redirect } from 'react-router-dom';

async function genMess() {
    sessionStorage.setItem("message", "Successfully signed out");
}


let filtered = [];
let userIdString = '';
let medicationId = '';
let medName;
let medType;
let medMonth;
let medDay;
let medYear;
let medInstructions;
let medId;

class EditMedications extends Component {
    state = {
        data: [],
        id: 0,
        name: '',
        type: '',
        prescribedMonth: 0,
        prescribedDay: 0,
        prescribedYear: 0,
        instructions: '',
        userID: '',
        redirect: null

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

    updateDB(idToUpdate, updatedName, updatedType, updatedMonth, updatedDay, updatedYear, updatedInstructions) {
        if (updatedName === '') {
            updatedName = medName;
        }
        if (updatedType === '') {
            updatedType = medType;
        }
        if (updatedMonth === '') {
            updatedMonth = medMonth;
        }
        if (updatedDay === '') {
            updatedDay = medDay;
        }
        if (updatedYear === '') {
            updatedYear = medYear;
        }
        if (updatedInstructions === '') {
            updatedInstructions = medInstructions;
        }

        axios.post('http://localhost:3001/api/updateMedicationData', {
            id: idToUpdate,
            update: {
                name: updatedName,
                type: updatedType,
                prescribedMonth: updatedMonth,
                prescribedDay: updatedDay,
                prescribedYear: updatedYear,
                instructions: updatedInstructions

            },
        });
        alert("Medication has been updated")
    };

    filterData = () => {
        for (let i = 0; i < this.state.data.length; i++) {
            if (this.state.data[i].userID === userIdString && this.state.data[i]._id === medicationId && this.isIncluded(this.state.data[i])) {
                filtered.push(this.state.data[i]);
            }
        }
        filtered.map((dat) => (
            medName = dat.name,
            medType = dat.type,
            medMonth = dat.prescribedMonth,
            medDay = dat.prescribedDay,
            medYear = dat.prescribedYear,
            medInstructions = dat.instructions,
            medId = dat._id
        ))
    }

    isIncluded = (object) => {
        for (let i = 0; i < filtered.length; i++) {
            if (filtered[i]._id === object._id) {
                return false;
            }
        }
        return true;
    }

    redirectPage = () => {
        this.setState({ redirect: "/" + window.location.href.substring(window.location.href.indexOf("#") + 1 + 1, window.location.href.indexOf("/", window.location.href.indexOf("#") + 1 + 1)) + "/currentmedications" })
    }


    render() {
        const { data } = this.state;
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        userIdString = window.location.href.substring(window.location.href.indexOf("#") + 1 + 1, window.location.href.indexOf("/", window.location.href.indexOf("#") + 1 + 1));
        medicationId = window.location.href.substring(window.location.href.indexOf("editmedication") + 15);
        this.filterData();
        filtered.map((dat) => (
            medName = dat.name,
            medType = dat.type,
            medMonth = dat.prescribedMonth,
            medDay = dat.prescribedDay,
            medYear = dat.prescribedYear,
            medInstructions = dat.instructions
        ))
        return (
            <div>
                <h2>Edit Medication</h2>
                <NavLink to={"/" + window.location.href.substring(window.location.href.indexOf("#") + 1 + 1, window.location.href.indexOf("/", window.location.href.indexOf("#") + 1 + 1)) + "/currentmedications"}>Go Back to Current Medications</NavLink>

                <form>
                    <label htmlFor="name">Name:  </label>
                    <input
                        type="text"
                        name="name"
                        placeholder={medName}
                        id="name"
                    /><br />
                    <label htmlFor="type">Type:  </label>
                    <input
                        type="text"
                        name="type"
                        placeholder={medType}
                        id="type"
                    /><br />
                    <label htmlFor="prescribedMonth">Month:  </label>
                    <input
                        type="number"
                        min="1"
                        max="12"
                        name="prescribedMonth"
                        placeholder={medMonth}
                        id="prescribedMonth"
                    /><br />
                    <label htmlFor="prescribedDay">Day:  </label>
                    <input
                        type="number"
                        min="1"
                        max="31"
                        name="prescribedDay"
                        placeholder={medDay}
                        id="prescribedDay"
                    /><br />
                    <label htmlFor="prescribedYear">Year:  </label>
                    <input
                        type="number"
                        min="1940"
                        max="2050"
                        name="prescribedYear"
                        placeholder={medYear}
                        id="prescribedYear"
                    /><br />
                    <label htmlFor="instructions">Instructions:  </label>
                    <input
                        type="text"
                        name="instructions"
                        placeholder={medInstructions}
                        id="instructions"
                    /><br />
                    <button
                        type="submit"
                        onClick={() => this.updateDB(medId,
                            document.getElementById('name').value,
                            document.getElementById('type').value,
                            document.getElementById('prescribedMonth').value,
                            document.getElementById('prescribedDay').value,
                            document.getElementById('prescribedYear').value,
                            document.getElementById('instructions').value)
                        }
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        );


    }
}

export default EditMedications;