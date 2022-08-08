import React from 'react';
import Table from '../../components/table/Table'
import { Link, useParams } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

import date from 'date-and-time';

const axios = require('axios').default;

function VisitView(props) {
    // STATE VARIABLES
    const { visit_ID } = useParams();
    const [error, setError] = React.useState(false);

    // patient
    const [data, setData] = React.useState(null);
    const [visitLoaded, setVisitLoaded] = React.useState(false);

    // patient's visits
    const [rows, setRows] = React.useState(null);
    const [staffLoaded, setStaffLoaded] = React.useState(false);

    const tableOptions = {
        visit_staff_ID: false,
        patient_name: false,
        date_of_birth: false,
        mrn: false,
        scheduled_time: false,
        staff_name: "Staff",
        staff_ID: false
    }

    // API FETCH REQUESTS

    // visit
    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/visits/${visit_ID}`)
            .then((res) => {
                const resData = res.data;
                resData.scheduled_time = date.format(new Date(resData.scheduled_time), "DD/MM/YY at HH:mm");
                if (resData.check_in_time) resData.check_in_time = date.format(new Date(resData.check_in_time), "HH:mm");
                if (resData.discharge_time) resData.discharge_time = date.format(new Date(resData.discharge_time), "HH:mm");

                setVisitLoaded(true);
                setData(resData);
            })
            .catch((err) => {
                setError(true);
            });
    }, [visit_ID]);

    // visit interactions
    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/staff-interactions?visit_ID=${visit_ID}`)
            .then((res) => {
                setStaffLoaded(true);
                setRows(res.data);
            })
            .catch((err) => {
                setError(true);
            });
    }, [visit_ID]);


    return (
        <main>
            {
                !visitLoaded &&
                <Loading />
            }
            {
                error &&
                <ErrorMessage msg="An error occurred while loading data. Please try again." />
            }
            {
                visitLoaded &&
                <Grid container>
                    <Grid item sm={4} sx={{ pt: 3, px: 2 }} width="100%">
                        <Card variant="outlined">
                            <CardContent>
                                <Box sx={{ my: 3, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <Typography component="h1" variant="h5">{data.last_name}, {data.first_name}</Typography>
                                    <Typography variant="subtitle1" sx={{ fontStyle: "oblique" }} gutterBottom>Last, First</Typography>
                                    <Typography variant="body1">MRN: {data.mrn}</Typography>
                                    <Typography variant="body1">DOB: {date.format(new Date(data.date_of_birth), "MM/DD/YYYY")}</Typography>
                                    <Typography variant="body1"> Sex: {data.sex}</Typography>
                                </Box>
                            </CardContent>
                            <CardActions>
                                <Button component={Link} to={`/patients/${data.mrn}`} size="small">View Patient</Button>
                            </CardActions>
                        </Card>
                        <Divider flexItem sx={{ my: 2 }} variant="middle">Visit Info</Divider>
                        <Box sx={{ my: 3, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Typography variant="body2">Scheduled for</Typography>
                            <Typography variant="body1" gutterBottom>{data.scheduled_time}</Typography>
                            <Typography variant="body2">Check-in</Typography>
                            {data.check_in_time ?
                                <Typography variant="body1" gutterBottom>{data.check_in_time}</Typography>
                                :
                                <Typography variant="body1" gutterBottom>n/a</Typography>
                            }
                            <Typography variant="body2">Check-out</Typography>
                            {data.discharge_time ?
                                <Typography variant="body1" gutterBottom>{data.discharge_time}</Typography>
                                :
                                <Typography variant="body1" gutterBottom>n/a</Typography>
                            }
                            {data.primary_diagnosis &&
                                <p>
                                    <Typography variant="body2">Primary diagnosis</Typography>
                                    <Typography variant="body1">{data.primary_diagnosis}</Typography>
                                </p>
                            }
                            <p>
                                <Typography variant="body2">Visit details</Typography>
                                <Typography variant="body1">{data.visit_type}</Typography>
                            </p>
                        </Box>
                        <Divider flexItem sx={{ my: 2 }} variant="middle">Insurance</Divider>
                        {!data.insurance_policy &&
                            <Box sx={{ my: 3, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <Typography variant="body1" gutterBottom>Self-pay</Typography>
                            </Box>}
                        {data.insurance_policy &&
                            <Box sx={{ my: 3, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <Typography variant="body1">{data.plan_name}</Typography>
                            </Box>
                        }
                    </Grid>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Grid item sm={7} width="100%" sx={{ px: 2 }}>
                        {
                            !staffLoaded &&
                            <Loading />
                        }
                        {
                            error &&
                            <ErrorMessage msg="An error occurred while loading data. Please try again." />
                        }
                        {
                            staffLoaded &&
                            <Box sx={{ my: 5, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <Typography component="h2" variant="h6" gutterBottom>Visit Staff</Typography>
                                <Table options={tableOptions} rows={rows} updatable pKey="visit_staff_ID" />
                            </Box>
                        }
                        <Button variant="outlined" component={Link} to={`/visits/${visit_ID}/edit`} fullWidth>Edit Visit</Button>
                    </Grid>
                </Grid>
            }
        </main >
    );
}

export default VisitView;