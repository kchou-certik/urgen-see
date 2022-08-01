import React from 'react';
import Table from '../../components/table/Table'
import { Link } from 'react-router-dom'
import ErrorMessage from '../../components/ErrorMessage';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MoreTimeIcon from '@mui/icons-material/MoreTime';

import date from 'date-and-time';

const axios = require('axios').default;

function Visits(props) {
    const [rows, setRows] = React.useState(null);
    const [loaded, setLoaded] = React.useState(false);
    const [error, setError] = React.useState(false);

    const tableOptions = {
        visit_ID: "ID",
        mrn: "MRN",
        plan_ID: "Plan",
        primary_diagnosis: "Primary Diagnosis",
        scheduled_time: "Scheduled",
        check_in_time: "Checked In",
        discharge_time: "Checked Out",
        visit_type: "Visit Type"
    };

    // Load data
    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/visits`)
            .then((res) => {
                res.data.map((row) => {
                    row.scheduled_time = date.format(new Date(row.scheduled_time), "M/D/YY HH:mm");
                    row.check_in_time = date.format(new Date(row.check_in_time), "M/D/YY HH:mm");
                    row.discharge_time = date.format(new Date(row.discharge_time), "M/D/YY HH:mm");
                    return row;
                });
                setLoaded(true);
                setRows(res.data);
            })
            .catch((err) => {
                setError(true);
            });
    }, []);

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
                {
                    !loaded &&
                    <h3>Loading table...</h3>
                }
                {
                    error &&
                    <ErrorMessage />
                }
                {
                    loaded &&
                    <Table options={tableOptions} rows={rows} updatable pKey="visit_ID" />
                }

            </main>
        </>

    );
}

export default Visits;