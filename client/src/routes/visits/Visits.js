import React from 'react';
import Table from '../../components/table/Table'
import { Link } from 'react-router-dom'

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MoreTimeIcon from '@mui/icons-material/MoreTime';

function Visits(props) {
    const cols = ["visit_ID", "mrn", "plan_ID", "carrier.provider", "plan.name", "primary_diagnosis", "scheduled_time", "check_in_time", "discharge_time", "visit_type"];
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
                <Stack direction="row" spacing="1em" sx={{ mb: 2 }}>
                    <Button component={Link} to="/visits/new" variant="outlined" endIcon={<MoreTimeIcon />}>
                        Book Appointment
                    </Button>
                </Stack>
                <Table cols={cols} rows={rows} updatable pKey="visit_ID" />
            </main>
        </>

    );
}

export default Visits;