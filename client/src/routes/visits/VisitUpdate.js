import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';

function VisitUpdate() {
    function handleSubmit(e) {
        e.preventDefault();
        alert("Submitted!");
    }

    return (
        <>
            <header>
                <Link to="/visits">{"<-"} Visits</Link>
                <h1>Update Appointment</h1>
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
                    <p>
                        <h2><em>[SAMPLE DATA]</em></h2>
                    </p>
                </section>
            </header>
            <main>
                <form onSubmit={handleSubmit} >
                    <fieldset> <legend>Appointment Details</legend>
                        <p>
                            <label htmlFor="time">Scheduled Time
                                <input type="datetime-local" id="time" name="scheduled_time" value="2022-10-07T10:30" />
                            </label>
                        </p>
                        <p>
                            <label htmlFor="primarydx">Primary Diagnosis
                                <textarea id="primarydx" name="primary_diagnosis" placeholder="exposure to covid-19" />
                            </label>
                        </p>
                        <p>
                            <label htmlFor="visittype">Visit Type / Details
                                <textarea id="visittype" name="visit_type" placeholder="WALKIN covid test" />
                            </label>
                        </p>
                        <p>
                            <label htmlFor="insurance">Visit Insurance
                                <select id="insurance" name="plan">
                                    <option>Empire BCBS: HealthPlus</option>
                                </select>
                            </label>
                        </p>
                    </fieldset>
                    <p>
                        <label htmlFor="checkin">Check-in Time
                            <input type="datetime-local" id="checkin" name="check_in_time" value="2022-10-07T10:30" />
                        </label>
                    </p>
                    <p>
                        <label htmlFor="discharge">Discharge Time
                            <input type="datetime-local" id="discharge" name="discharge_time" value="2022-10-07T11:00" />
                        </label>
                    </p>

                    <input type="submit" />
                </form>
                <p>
                    <Button variant="outlined" color="warning" component={Link} to="#">Delete Appointment</Button>
                </p>
            </main>
        </>
    )
}

export default VisitUpdate;