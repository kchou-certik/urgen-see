import React from 'react';
import Table from '../../components/table/Table';
import ErrorMessage from '../../components/ErrorMessage';

import date from 'date-and-time';
import Loading from '../../components/Loading';
import Typography from '@mui/material/Typography';

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
        staff_name: "Staff",
        staff_ID: "Staff ID"
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
                <Typography component="h2" variant="h3">Patient-Staff Visit Interactions</Typography>
                <Typography variant="subtitle1" sx={{ mb: 4 }}>To add interactions, edit a patient visit</Typography>
            </header>
            <main>
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
                    <Table options={tableOptions} rows={rows} updatable pKey="visit_staff_ID" />
                }
            </main>
        </>

    );
}

export default StaffInteractions;