import React from 'react';
import Table from '../../components/table/Table'
import { Link } from 'react-router-dom'
import ErrorMessage from '../../components/ErrorMessage';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MoreTimeIcon from '@mui/icons-material/MoreTime';

import date from 'date-and-time';
import Loading from '../../components/Loading';

const axios = require('axios').default;

function Visits(props) {
    const [rows, setRows] = React.useState(null);
    const [loaded, setLoaded] = React.useState(false);
    const [error, setError] = React.useState(false);

    const tableOptions = {
        visit_ID: false,
        mrn: "MRN",
        plan_ID: false,
        carrier_ID: false,
        primary_diagnosis: "Primary Diagnosis",
        scheduled_time: "Scheduled",
        check_in_time: "Checked In",
        discharge_time: "Checked Out",
        visit_type: "Visit Type",
        patient_name: "Patient",
        visit_insurance: "Visit Insurance"
    };

    // Load data
    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/visits`)
            .then((res) => {
                res.data.map((row) => {
                    row.scheduled_time = date.format(new Date(row.scheduled_time), "M/D/YY HH:mm");
                    row.check_in_time = date.format(new Date(row.check_in_time), "HH:mm");
                    row.discharge_time = date.format(new Date(row.discharge_time), "HH:mm");
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
            </header>
            <main>
                <Stack direction="row" spacing="1em" sx={{ mb: 2 }}>
                    <Button component={Link} to="/visits/new" variant="outlined" endIcon={<MoreTimeIcon />}>
                        Book Appointment
                    </Button>
                </Stack>
                {
                    !loaded &&
                    <Loading />
                }
                {
                    error &&
                    <ErrorMessage msg="An error occurred while loading data. Please try again." />
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