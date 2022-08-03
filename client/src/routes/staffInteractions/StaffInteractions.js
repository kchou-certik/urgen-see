import React from 'react';
import { Link } from 'react-router-dom';
import Table from '../../components/table/Table';
import ErrorMessage from '../../components/ErrorMessage';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PeopleIcon from '@mui/icons-material/People';

import date from 'date-and-time';

const axios = require('axios').default;

function StaffInteractions(props) {
    const [rows, setRows] = React.useState(null);
    const [loaded, setLoaded] = React.useState(false);
    const [error, setError] = React.useState(false);

    const tableOptions = {
        visit_staff_ID: false,
        patient_name: "Patient",
        date_of_birth: "DOB",
        mrn: "MRN",
        scheduled_time: "Visit Date",
        staff_name: "Staff"
    }

    // Load data
    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/staff-interactions`)
            .then((res) => {
                res.data.map((row) => {
                    row.date_of_birth = date.format(new Date(row.date_of_birth), "M/D/YYYY");
                    row.scheduled_time = date.format(new Date(row.scheduled_time), "M/D/YY HH:mm");
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
                <Link to="/visits">{"<-"} Visits</Link>
                <h1>Patient-Staff Visit Interactions</h1>
            </header>
            <main>
                <Stack direction="row" spacing="1em" sx={{ mb: 2 }}>
                    <Button component={Link} to="/staff-interactions/new" variant="outlined" endIcon={<PeopleIcon />}>
                        Add Interaction
                    </Button>
                </Stack>
                {
                    !loaded &&
                    <h3>Loading table...</h3>
                }
                {
                    error &&
                    <ErrorMessage msg="An error occurred while loading data. Please try again." />
                }
                {
                    loaded &&
                    <Table options={tableOptions} rows={rows} updatable pKey="visit_staff_ID" />
                }
            </main>
        </>

    );
}

export default StaffInteractions;