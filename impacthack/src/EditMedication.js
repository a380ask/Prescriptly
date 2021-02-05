import React, { Component } from "react";
import axios from 'axios';
import { useParams, NavLink } from 'react-router-dom';

const EditMedication = () => {
    let state = {
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

    function updateDB(idToUpdate, updatedName, updatedType, updatedMonth, updatedDay, updatedYear, updatedInstructions) {
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

    let { medicationId } = useParams();

    const { data } = state;
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
                        onClick={() => updateDB(medicationId,
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

export default EditMedication;