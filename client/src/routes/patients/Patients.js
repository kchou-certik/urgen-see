import React from 'react';
import Table from '../../components/table/Table'
import { Link } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';
import PatientSearchButton from '../../components/PatientSearchButton';

import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import date from 'date-and-time';

const axios = require('axios').default;

function Patients(props) {
    const [rows, setRows] = React.useState(null);
    const [loaded, setLoaded] = React.useState(false);
    const [error, setError] = React.useState(false);

    const tableOptions = {
        mrn: "MRN",
        first_name: "First Name",
        last_name: "Last Name",
        sex: "Sex",
        date_of_birth: "DOB",
        phone_number: "Phone Number",
        email: "Email",
        address_1: "Address 1",
        address_2: "Address 2",
        city: "City",
        state: "State",
        postal_code: "Postcode",
        insurance_policy: "Policy #",
        insurance_group: "Group #",
        plan_ID: false,
        plan_name: "Plan"
    };

    // Load data
    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/patients`)
            .then((res) => {
                res.data.map((row) => {
                    row.date_of_birth = date.format(new Date(row.date_of_birth), "M/D/YYYY");
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
        <main>
            <header>
                <h1>Patients</h1>
            </header>
            <Stack direction="row" spacing="1em" sx={{ mb: 2 }}>
                <PatientSearchButton />
                <Button component={Link} to="/patients/new" variant="outlined" endIcon={<PersonAddIcon />}>
                    Register
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
                <Table options={tableOptions} rows={rows} updatable pKey="mrn" />
            }
        </main >
    );
}

export default Patients;