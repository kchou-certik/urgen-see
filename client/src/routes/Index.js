import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';
import Table from '../components/table/Table';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import MoreTimeIcon from '@mui/icons-material/MoreTime';
import PersonAddIcon from '@mui/icons-material/PersonAdd';


import date from 'date-and-time';


const axios = require('axios').default;

const today = new Date();
const todayFormatted = date.format(today, "YYYY-MM-DD");

// From https://v5.reactrouter.com/web/example/query-parameters
function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Index(props) {
    const navigate = useNavigate();
    const query = useQuery();
    const dateQueryVal = query.get("date");

    const [rows, setRows] = React.useState(null);
    const [loaded, setLoaded] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [dateVal, setDate] = React.useState(dateQueryVal ? dateQueryVal : todayFormatted);

    function handleChange(e) {
        navigate(`?date=${e.target.value}`, { replace: true });
    }

    const tableOptions = {
        visit_ID: false,
        mrn: "MRN",
        plan_ID: false,
        carrier_ID: false,
        primary_diagnosis: false,
        scheduled_time: "Scheduled",
        check_in_time: "Checked In",
        discharge_time: "Checked Out",
        visit_type: "Visit Type",
        patient_name: "Patient",
        visit_insurance: false
    }

    // Load data
    React.useEffect(() => {
        let dateQueryStr;

        if (dateQueryVal) {
            setDate(dateQueryVal);
            dateQueryStr = `?date=${dateQueryVal}`
        } else {
            dateQueryStr = `?date=${todayFormatted}`;
        }

        // Gets TODAY with only YYYY-MM-DD
        axios.get(`${process.env.REACT_APP_API}/visits${dateQueryStr}`)
            .then((res) => {
                res.data.map((row) => {
                    row.scheduled_time = date.format(new Date(row.scheduled_time), "HH:mm");
                    if (row.check_in_time) row.check_in_time = date.format(new Date(row.check_in_time), "HH:mm");
                    if (row.discharge_time) row.discharge_time = date.format(new Date(row.discharge_time), "HH:mm");
                    return row;
                });
                setLoaded(true);
                setRows(res.data);
            })
            .catch((err) => {
                setError(true);
            });
    }, [dateQueryVal]);

    return (
        <>
            <Container component="main" maxWidth="xl">
                <Typography component="h2" variant="h4">Daily Schedule</Typography>
                <Typography component="h3" variant="h5" gutterBottom>{date.transform(dateVal, 'YYYY-MM-DD', 'dddd, MMMM D, YYYY')}</Typography>
                <TextField variant="standard" type="date" label="Choose Date" value={dateVal} onChange={handleChange} sx={{ my: 2 }} />
                <Stack direction="row" spacing="1em" sx={{ mb: 3 }}>
                    <Button component={Link} to="/visits/new" variant="contained" endIcon={<MoreTimeIcon />}>
                        Book Appointment
                    </Button>
                    <Button component={Link} to="/patients/new" variant="outlined" endIcon={<PersonAddIcon />}>
                        Register
                    </Button>
                </Stack>
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
                    <Table options={tableOptions} rows={rows} updatable clickable pKey="visit_ID" />
                }
            </Container>
        </>
    );
}

export default Index;