import React from 'react';
import { Link } from 'react-router-dom';
import Table from '../../components/table/Table';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PeopleIcon from '@mui/icons-material/People';

function StaffInteractions(props) {
    const cols = ["visit_staff_ID", "visit_ID", "visit.scheduled_time", "patient.first_name", "patient.last_name", "patient.date_of_birth", "staff_ID", "staff.first_name", "staff.last_name", "staff.practitioner_type"];
    const rows = [
        [1, 1, "10/07/2022 10:30", "Alex", "Alex", "01/01/1990", 2, "Florence", "Nightingale", "RN"],
        [2, 1, "10/07/2022 10:30", "Alex", "Alex", "01/01/1990", 3, "Bill", "Billingson", "PA"]
    ]

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
                <Table cols={cols} rows={rows} updatable pKey="visit_staff_ID" />
            </main>
        </>

    );
}

export default StaffInteractions;