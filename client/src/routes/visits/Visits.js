import React from 'react';
import Table from '../../components/table/Table'
import { Link } from 'react-router-dom'

function Visits(props) {
    const cols = ["visit_ID", "patient_ID", "visit_insurance", "carrier.name", "plan.name", "primary_diagnosis", "scheduled_time", "check_in_time", "discharge_time", "visit_type"];
    const rows = [
        [1, 1, 1, "Empire BCBS ", "HealthPlus", "exposure to covid-19", "10/07/2022 10:30", "10/07/2022 10:30", "10/07/2022 11:00", "WALKIN covid test"]
    ]

    return (
        <>
            <header>
                <Link to="/patients">{"<-"} Patients</Link>
                <h1>Patient Visits</h1>
                {/* Consider modularizing patient headers if we use them a lot */}
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
                <Link to="/visits/new">Book Appointment</Link>
                <Table cols={cols} rows={rows} />
            </main>
        </>

    );
}

export default Visits;