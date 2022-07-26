import React from 'react';
import Table from '../../components/table/Table'
import { Link } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PersonAddIcon from '@mui/icons-material/PersonAdd';



function Patients(props) {
    const cols = ["mrn", "first_name", "last_name", "sex", "date_of_birth", "phone_number", "email", "address_1", "address_2", "city", "state", "postal_code", "insurance_policy", "insurance_group", "plan_ID", "carrier.provider", "plan.name"];

    const rows = [
        [1, "Alex", "Alex", "F", "1990-01-01", "111-222-3333", "alex@alex.com", "1 1st Street", null, "New York City", "NY", "10010", "12345abc", "xyz", 1, "Empire BCBS", "HealthPlus"],
        [2, "Betty", "Betty", "MTF", "1980-01-01", "444-555-6666", "betty@betty.com", "2 2nd Street", "Unit 1A", "New York City", "NY", "10011", "67890def", "def", 2, "Aetna", "Bronze PPO"]
    ];
    return (
        <main>
            <header>
                <h1>Patients</h1>
            </header>
            <Stack direction="row" spacing="1em" sx={{ mb: 2 }}>
                <Button component={Link} to="/patients/search" variant="outlined" endIcon={<PersonSearchIcon />}>
                    Search
                </Button>
                <Button component={Link} to="/patients/new" variant="outlined" endIcon={<PersonAddIcon />}>
                    Register
                </Button>
            </Stack>
            <Table cols={cols} rows={rows} updateLink={"/patients/test/update"} deleteLink={null} />
        </main >
    );
}

export default Patients;