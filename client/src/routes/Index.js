import React from 'react';
import { Link } from 'react-router-dom';

import Table from '../components/table/Table';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function Index(props) {
    const cols = [
        "Time", "Last Name", "First Name", "MRN", "Check-In", "Discharged", "Visit Type"
    ]

    const rows = [
        ["10:30", "Alex", "Alex", 1, "10:30", "11:00", "WALKIN covid test"],
        ["13:00", "Betty", "Betty", 2, "13:00", "13:35", "WALKIN cut on hand"]

    ]

    return (
        <>
            <header>
                <h1>Urgen-See Patient Booking</h1>
                <span>* Working Title</span>
            </header>
            <main>
                <Container maxWidth="xl">
                    <h2>Daily Schedule</h2>
                    <h3>10/07/2022</h3>
                    <Stack direction="row" spacing="1em" sx={{ mb: 2 }}>
                        <Button component={Link} to="/visits/new" variant="contained" endIcon={<MoreTimeIcon />}>
                            Book Appointment
                        </Button>
                        <Button component={Link} to="/patients/new" variant="outlined" endIcon={<PersonAddIcon />}>
                            Register
                        </Button>
                    </Stack>
                    <Table cols={cols} rows={rows} updateLink="/visits/test/update" />
                </Container>
            </main>
        </>
    );
}

export default Index;