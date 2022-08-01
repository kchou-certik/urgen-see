import React from 'react';
import Table from '../../components/table/Table'
import { Link } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';

import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const axios = require('axios').default;

function Patients(props) {
    const [rows, setRows] = React.useState(null);
    const [loaded, setLoaded] = React.useState(false);
    const [error, setError] = React.useState(false);

    // Load data
    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/patients`)
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
            {
                !loaded &&
                <h3>Loading table...</h3>
            }
            {
                error &&
                <ErrorMessage />
            }
            {
                loaded &&
                <Table rows={rows} updatable pKey="mrn" />
            }
        </main >
    );
}

export default Patients;