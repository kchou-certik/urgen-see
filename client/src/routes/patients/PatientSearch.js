import React from 'react';
import { Link } from 'react-router-dom';

function PatientRegistration() {
    function handleSubmit(e) {
        e.preventDefault();
        alert("Submitted!");
    }

    return (
        <>
            <header>
                <Link to="/patients">{"<-"} Patients</Link>
                <h1>Patient Search</h1>
            </header>
            <main>
                <form onSubmit={handleSubmit} >
                    <fieldset> <legend>Search Criteria</legend>
                        <p>
                            <label htmlFor="fname">First name
                                <input type="text" id="fname" name="first_name" />
                            </label>
                        </p>
                        <p>
                            <label htmlFor="fname">Last name
                                <input type="text" id="lname" name="last_name" />
                            </label>
                        </p>
                        <p>
                            <label htmlFor="dob">DOB
                                <input type="date" id="dob" name="date_of_birth" placeholder="MM/DD/YYYY" autoComplete="bday" />
                            </label>
                        </p>
                        <p>
                            <label htmlFor="dob">MRN
                                <input type="text" id="mrn" name="mrn" />
                            </label>
                        </p>
                    </fieldset>
                    <input type="submit" />
                </form>
            </main>
        </>
    )
}

export default PatientRegistration;