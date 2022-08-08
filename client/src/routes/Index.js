import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Table from '../components/table/Table';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import ErrorMessage from '../components/ErrorMessage';

import date from 'date-and-time';
import Loading from '../components/Loading';

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
            <header>
                <h1>Urgen-See Patient Booking</h1>
                <span>* Working Title</span>
            </header>
            <main>
                <Container maxWidth="xl">
                    <h2>Daily Schedule</h2>
                    <h3>{date.transform(dateVal, 'YYYY-MM-DD', 'dddd, MMMM D, YYYY')}</h3>
                    <TextField variant="outlined" type="date" label="Date" value={dateVal} onChange={handleChange} />
                    <Stack direction="row" spacing="1em" sx={{ mb: 2 }}>
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
                        <Table options={tableOptions} rows={rows} updatable pKey="visit_ID" />
                    }
                </Container>
            </main>
        </>
    );
}

export default Index;