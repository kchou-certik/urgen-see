// Packages
import React from 'react';
import { Link } from 'react-router-dom'
import date from 'date-and-time';

// Components
import Table from '../../components/table/Table'
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';

// MUI Components
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import Typography from '@mui/material/Typography';

const axios = require('axios').default;


function Visits(props) {

    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘
    //  STATE VARIABLES
    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘

    const [rows, setRows] = React.useState(null);   // visit data
    const [loaded, setLoaded] = React.useState(false);  // if data is loaded
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

    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘
    //  API FETCH REQUESTS
    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘

    React.useEffect(() => {
        // Load visit data
        axios.get(`${process.env.REACT_APP_API}/visits`)
            .then((res) => {
                res.data.map((row) => {
                    row.scheduled_time = date.format(new Date(row.scheduled_time), "M/D/YY HH:mm");
                    if (row.check_in_time) row.check_in_time = date.format(new Date(row.check_in_time), "HH:mm");
                    if (row.discharge_time) row.discharge_time = date.format(new Date(row.discharge_time), "HH:mm");
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
                <Typography component="h2" variant="h3" sx={{ mb: 3 }}>Patient Visits</Typography>
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
                    <Table options={tableOptions} rows={rows} updatable clickable pKey="visit_ID" />
                }

            </main>
        </>

    );
}

export default Visits;