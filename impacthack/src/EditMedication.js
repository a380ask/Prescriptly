import React, { Component } from "react";
import axios from 'axios';
import { NavLink } from 'react-router-dom';

let temp = [];
let medicationId = '6019f949ee17fd00bf0fb673'
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

    updateDB(idToUpdate, updatedName, updatedType, updatedMonth, updatedDay, updatedYear, updatedInstructions) {
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
    };

    filterData = () => {
        for(let i = 0; i < this.state.data.length; i++){
            if(this.state.data[i]._id === '6019f949ee17fd00bf0fb673' && this.isIncluded(this.state.data[i])){
                temp.push(this.state.data[i]);
            }
        }
    }

    isIncluded = (object) => {
        for(let i = 0; i < temp.length; i++){
            if(temp[i]._id === object._id){
                return false;
            }
        }
        return true;
    }

    render(){
        const { data } = this.state;
        this.filterData();
    return (
        <div>
            <h2>Edit Medication</h2>
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
                <NavLink to={"/" + window.location.href.substring(window.location.href.indexOf("#") + 1 + 1, window.location.href.indexOf("/", window.location.href.indexOf("#") + 1 + 1)) + "/currentmedications"}>
                    <button
                        type="submit"
                        onClick={() => this.updateDB(medicationId,
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
                </NavLink>
            </form>
        </div>
    );


    }
}

export default EditMedications;