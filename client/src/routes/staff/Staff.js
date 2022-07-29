import React from 'react';
import { Link } from 'react-router-dom';
import Table from '../../components/table/Table';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function Staff(props) {
    const cols = ["staff_ID", "practitioner_type", "first_name", "last_name", "phone_number", "email", "address_1", "address_2", "city", "state", "postal_code"];

    const rows = [
        [1, "MD", "John", "Doolittle", "123-456-7890", "john@john.com", "111 1st Ave", "Apt 1A", "New York City", "NY", "10013"],
        [2, "RN", "Florence", "Nightingale", "234-567-8901", "florence@florence.com", "222 2nd Ave", "Apt 2A", "New York City", "NY", "10014"],
        [3, "PA", "Bill", "Billingson", "345-678-9012", "billings@billingson.com", "333 3rd Ave", "Apt 3A", "New York City", "NY", "10015"]

    ];
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
            <Table cols={cols} rows={rows} updatable pKey="staff_ID" />
        </main >

    );
}

export default Staff;