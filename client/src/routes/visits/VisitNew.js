import React from 'react';
import { Link } from 'react-router-dom';

function VisitNew() {
    function handleSubmit(e) {
        e.preventDefault();
        alert("Submitted!");
    }

    return (
        <>
            <header>
                <Link to="/visits">{"<-"} Visits</Link>
                <h1>Appointment Booking</h1>
                <section>
                    <p>
                        <h2>Alex, Alex</h2>
                        <em>Last Name, First Name</em>
                    </p>
                    <p>
                        <strong>DOB: 01/01/1990</strong>
                        <br />
                        <strong>MRN: 1</strong>
                    </p>
                </section>
            </header>
            <main>
                <form onSubmit={handleSubmit} >
                    <fieldset> <legend>Appointment Details</legend>
                        <p>
                            <label htmlFor="time">Scheduled Time
                                <input type="datetime-local" id="time" name="scheduled_time" />
                            </label>
                        </p>
                        <p>
                            <label htmlFor="primarydx">Primary Diagnosis
                                <textarea id="primarydx" name="primary_diagnosis" />
                            </label>
                        </p>
                        <p>
                            <label htmlFor="visittype">Visit Type / Details
                                <textarea id="visittype" name="visit_type" />
                            </label>
                        </p>
                    </fieldset>
                    <input type="submit" />
                </form>
            </main>
        </>
    )
}

export default VisitNew;