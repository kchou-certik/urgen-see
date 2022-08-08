// Packages
import React from 'react';
import date from 'date-and-time';

// Components
import Table from '../../components/table/Table';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';

// MUI Components
import Typography from '@mui/material/Typography';

const axios = require('axios').default;


function StaffInteractions(props) {
    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘
    //  STATE VARIABLES
    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘

    const [rows, setRows] = React.useState(null);   // staff-interaction data
    const [loaded, setLoaded] = React.useState(false);  // if data is loaded
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

    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘
    //  API FETCH REQUESTS
    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘

    React.useEffect(() => {
        // Load staff-interaction data
        axios.get(`${process.env.REACT_APP_API}/staff-interactions`)
            .then((res) => {
                res.data.map((row) => {
                    // format dates/times
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