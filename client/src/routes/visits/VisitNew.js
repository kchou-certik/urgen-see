import React, { useState } from 'react';
import date from 'date-and-time';
import ErrorMessage from '../../components/ErrorMessage';
import SuccessMessage from '../../components/SuccessMessage';
import InfoMessage from '../../components/InfoMessage';
import { Link } from 'react-router-dom';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

const axios = require('axios').default;

function VisitNew() {
    // STATE VARIABLES

    const [status, setStatus] = React.useState(null); // success | error | nopatient
    const [data, setData] = useState({      // form data
        first_name: "",
        last_name: "",
        date_of_birth: "",
        mrn: "",
        scheduled_time: "",
        primary_diagnosis: "",
        visit_type: "",
        plan_ID: ""
    });

    // for patient search:
    const [patientData, setPatientData] = useState({      // patient search form data
        first_name: "",
        last_name: "",
        date_of_birth: "",
        mrn: ""
    });
    const [patients, setPatients] = useState(null); // patient search results
    const [searchOpen, setSearchOpen] = useState(false); // search modal open state

    // HANDLERS

    function handleSubmit(e) {
        e.preventDefault();

        if (!data.mrn) {
            setStatus("nopatient");
            return;
        }

        axios.post(`${process.env.REACT_APP_API}/visits`, data)
            .then((res) => setStatus("success"))
            .catch((err) => setStatus("error"));
    }

    function handlePatientSubmit(e) {
        e.preventDefault();
        const params = { ...patientData };
        Object.keys(params).map((key) => {
            if (params[key] === "") {
                params[key] = null;
            }
        });

        axios.get(`${process.env.REACT_APP_API}/patients`, { params: patientData })
            .then((res) => {
                console.log(res.data)
                setPatients(res.data);
            })
            .catch((err) => setStatus("error"));
    }

    // From https://reactjs.org/docs/forms.html#handling-multiple-inputs
    function handleInputChange(event) {
        const target = event.target;
        const name = target.name;

        setData({
            ...data,
            [name]: target.value
        });
    }

    function handlePatientInputChange(event) {
        const target = event.target;
        const name = target.name;

        setPatientData({
            ...patientData,
            [name]: target.value
        });
    }

    function handlePatientClick(patient) {
        setData({
            ...data,
            mrn: patient.mrn,
            first_name: patient.first_name,
            last_name: patient.last_name,
            date_of_birth: patient.date_of_birth,
            plan_ID: patient.plan_ID
        });

        handleClose();
    }

    // search modal open/close handlers
    function handleOpen() {
        setSearchOpen(true);
    }

    function handleClose() {
        setSearchOpen(false);
    }

    return (
        <>

            <Container component="main" maxWidth="md" sx={{ mb: 10 }} >
                {status === 'success' && <SuccessMessage msg="Successfully added!" setStatus={setStatus} />}
                {status === "error" && <ErrorMessage msg="An error occurred! Please try again." setStatus={setStatus} />}
                {status === "nopatient" && <InfoMessage msg="Please choose a patient first!" setStatus={setStatus} />}

                <Link to="/visits">{"<-"} Visits</Link>
                <Typography variant="h4">Appointment Booking</Typography>
                <Typography variant="subtitle1" gutterBottom>* denotes required</Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <Card sx={{ mb: 2, p: 2 }}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>Patient Info *</Typography>
                            <Grid container spacing={2} mb={2}>
                                <Grid item xs={12} sm={12}>
                                    <Button variant="outlined" onClick={handleOpen} fullWidth>Select a Patient</Button>
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <TextField id="lname1" label="Last Name" disabled fullWidth value={data.last_name} />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField id="fname1" label="First Name" disabled fullWidth value={data.first_name} />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField id="dob1" label="Date of Birth" disabled fullWidth value={date.format(new Date(data.date_of_birth), "MM/DD/YYYY")} />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField id="mrn1" label="MRN" placeholder="Select a patient" disabled fullWidth value={data.mrn} InputLabelProps={{
                                        shrink: true,
                                    }} />
                                </Grid>
                                <Dialog open={searchOpen} onClose={handleClose}>
                                    <DialogTitle>Patient Search</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>Search for a patient whom you wish to create an appointment for.</DialogContentText>
                                        <Grid container spacing={1} mt={2} component="form">
                                            <Grid item xs={12} sm={6}>
                                                <TextField id="lname" label="Last Name" fullWidth value={patientData.last_name} name="last_name" onChange={handlePatientInputChange} />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField id="fname" label="First Name" fullWidth value={patientData.first_name} name="first_name" onChange={handlePatientInputChange} />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField id="dob" label="Date of Birth" fullWidth value={patientData.date_of_birth} type="date" name="date_of_birth" onChange={handlePatientInputChange} InputLabelProps={{
                                                    shrink: true,
                                                }} />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField id="mrn" label="MRN" fullWidth value={patientData.mrn} name="mrn" onChange={handlePatientInputChange} />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Button variant="outlined" fullWidth onClick={handlePatientSubmit}>Search</Button>
                                            </Grid>
                                        </Grid>
                                        {patients &&
                                            <TableContainer sx={{ maxHeight: "40vh" }}>
                                                <Table stickyHeader>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Last Name</TableCell>
                                                            <TableCell>First Name</TableCell>
                                                            <TableCell>DOB</TableCell>
                                                            <TableCell>MRN</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    {!patients.length && <TableRow><TableCell>No patients found with your query.</TableCell></TableRow>}
                                                    <TableBody>
                                                        {patients.map((patient) => (
                                                            <TableRow hover key={patient.mrn} onClick={() => handlePatientClick(patient)}>
                                                                <TableCell>{patient.last_name}</TableCell>
                                                                <TableCell>{patient.first_name}</TableCell>
                                                                <TableCell>{date.format(new Date(patient.date_of_birth), "MM/DD/YYYY")}</TableCell>
                                                                <TableCell>{patient.mrn}</TableCell>
                                                            </TableRow>
                                                        ))
                                                        }
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        }
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose}>Close</Button>
                                    </DialogActions>
                                </Dialog>
                            </Grid>
                        </CardContent>
                    </Card>
                    <Card sx={{ mb: 2, p: 2 }}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>Appointment Info</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12}>
                                    <TextField id="time" type="datetime-local" label="Scheduled Time" required name="scheduled_time" value={data.scheduled_time} fullWidth onChange={handleInputChange} InputLabelProps={{
                                        shrink: true,
                                    }} />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <TextField id="diagnosis" label="Primary Diagnosis" name="primary_diagnosis" value={data.primary_diagnosis} fullWidth onChange={handleInputChange} />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <TextField id="type" label="Visit Type / Notes" name="visit_type" required value={data.visit_type} fullWidth multiline onChange={handleInputChange} />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    <Button type="submit" variant="outlined">Submit</Button>
                </Box>
            </Container>
        </>
    )
}

export default VisitNew;