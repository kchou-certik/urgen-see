// Packages
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import date from 'date-and-time';

// Components
import Table from '../../components/table/Table'
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';

// MUI Components
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

// Icons
import PhoneIcon from '@mui/icons-material/Phone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import EditIcon from '@mui/icons-material/Edit';

const axios = require('axios').default;


function Patients(props) {
    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘
    //  STATE VARIABLES
    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘

    const { mrn } = useParams();
    const [error, setError] = React.useState(false);

    // patient
    const [data, setData] = React.useState(null);
    const [patientLoaded, setPatientLoaded] = React.useState(false);

    // patient's visits
    const [rows, setRows] = React.useState(null);
    const [visitsLoaded, setVisitsLoaded] = React.useState(false);

    const tableOptions = {
        visit_ID: false,
        mrn: false,
        plan_ID: false,
        carrier_ID: false,
        primary_diagnosis: "Diagnosis",
        scheduled_time: "Scheduled",
        check_in_time: "In",
        discharge_time: "Out",
        visit_type: "Visit Type",
        patient_name: false,
        visit_insurance: "Visit Insurance"
    }

    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘
    //  API FETCH REQUESTS
    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘

    React.useEffect(() => {
        // gets patient data
        axios.get(`${process.env.REACT_APP_API}/patients/${mrn}`)
            .then((res) => {
                setPatientLoaded(true);
                setData(res.data);
            })
            .catch((err) => {
                setError(true);
            });
    }, [mrn]);

    React.useEffect(() => {
        // gets patient's visits
        axios.get(`${process.env.REACT_APP_API}/patients/${mrn}/visits`)
            .then((res) => {
                res.data.map((row) => {
                    // formats dates/times
                    row.scheduled_time = date.format(new Date(row.scheduled_time), "DD/MM/YY HH:mm");
                    if (row.check_in_time) row.check_in_time = date.format(new Date(row.check_in_time), "HH:mm");
                    if (row.discharge_time) row.discharge_time = date.format(new Date(row.discharge_time), "HH:mm");
                    return row;
                });
                setVisitsLoaded(true);
                setRows(res.data);
            })
            .catch((err) => {
                setError(true);
            });
    }, [mrn]);


    return (
        <main>
            {
                !patientLoaded &&
                <Loading />
            }
            {
                error &&
                <ErrorMessage msg="An error occurred while loading data. Please try again." />
            }
            {
                patientLoaded &&
                <Grid container>
                    <Grid item sm={4} sx={{ pt: 3 }} width="100%">
                        <Box sx={{ my: 3, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Typography component="h1" variant="h5">{data.last_name}, {data.first_name}</Typography>
                            <Typography variant="subtitle1" sx={{ fontStyle: "oblique" }} gutterBottom>Last, First</Typography>
                            <Typography variant="body1">MRN: {data.mrn}</Typography>
                            <Typography variant="body1">DOB: {date.format(new Date(data.date_of_birth), "MM/DD/YYYY")}</Typography>
                            <Typography variant="body1"> Sex: {data.sex}</Typography>
                        </Box>
                        <Divider flexItem sx={{ my: 2 }} variant="middle">Contact Info</Divider>
                        <Box sx={{ my: 3, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                            {data.email && <Typography variant="body1" gutterBottom><AlternateEmailIcon sx={{ fontSize: 14 }} /> {data.email}</Typography>}
                            <Typography variant="body1" gutterBottom><PhoneIcon sx={{ fontSize: 14 }} /> {data.phone_number}</Typography>
                            {data.address_1 &&
                                <p>
                                    <Typography variant="body2">{data.address_1}</Typography>
                                    <Typography variant="body2">{data.address_2}</Typography>
                                    <Typography variant="body2">{data.city}, {data.state}, {data.postal_code}</Typography>
                                </p>
                            }
                        </Box>
                        <Divider flexItem sx={{ my: 2 }} variant="middle">Insurance</Divider>
                        {!data.insurance_policy &&
                            <Box sx={{ my: 3, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <Typography variant="body1" gutterBottom>Self-pay</Typography>
                            </Box>}
                        {data.insurance_policy &&
                            <Box sx={{ my: 3, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <Typography variant="body2" gutterBottom>Policy: {data.insurance_policy}</Typography>
                                {data.insurance_group && <Typography variant="body2" gutterBottom>Group: {data.insurance_group}</Typography>}
                                <Typography variant="body1">{data.plan_name}</Typography>
                                <Typography variant="body2"><PhoneIcon sx={{ fontSize: 12 }} /> {data.carrier_phone}</Typography>
                            </Box>
                        }
                        <Box alignItems="center" display="flex" flexDirection="column">
                            <IconButton component={Link} to={`/patients/${mrn}/edit`} sx={{ mt: 2 }}>
                                <EditIcon />
                            </IconButton>
                        </Box>
                    </Grid>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Grid item sm={7} width="100%">
                        {
                            !visitsLoaded &&
                            <Loading />
                        }
                        {
                            error &&
                            <ErrorMessage msg="An error occurred while loading data. Please try again." />
                        }
                        {
                            visitsLoaded &&
                            <Box sx={{ my: 5, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <Typography component="h2" variant="h6" gutterBottom>Patient Visits</Typography>
                                <Table options={tableOptions} rows={rows} updatable clickable pKey="visit_ID" />
                            </Box>
                        }

                    </Grid>
                </Grid>
            }
        </main >
    );
}

export default Patients;