import React from 'react';
import { Link } from 'react-router-dom';
import Table from '../../components/table/Table';
import ErrorMessage from '../../components/ErrorMessage';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const axios = require('axios').default;

function Staff(props) {
    const [rows, setRows] = React.useState(null);
    const [loaded, setLoaded] = React.useState(false);
    const [error, setError] = React.useState(false);

    const tableOptions = {
        staff_ID: "ID",
        practitioner_type: "Type",
        first_name: "First Name",
        last_name: "Last Name",
        phone_number: "Phone Number",
        email: "Email",
        address_1: "Address 1",
        address_2: "Address 2",
        city: "City",
        state: "State",
        postal_code: "Postcode"
    }

    // Load data
    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/staff`)
            .then((res) => {
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
                <h1>Staff List</h1>
            </header>
            <Stack direction="row" spacing="1em" sx={{ mb: 2 }}>
                <Button component={Link} to="/staff/new" variant="outlined" endIcon={<PersonAddIcon />}>
                    Add Staff
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
                <Table options={tableOptions} rows={rows} updatable pKey="staff_ID" />
            }
        </main >

    );
}

export default Staff;