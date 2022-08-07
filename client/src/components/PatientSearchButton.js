import React, { useState } from 'react';
import date from 'date-and-time';
import ErrorMessage from './ErrorMessage';
import { Link, useNavigate } from 'react-router-dom';

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

import PersonSearchIcon from '@mui/icons-material/PersonSearch';

const axios = require('axios').default;


function PatientSearchButton() {
    const navigate = useNavigate();

    // STATE VARIABLES
    const [status, setStatus] = React.useState(null); // "error" | null

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

    function handlePatientSubmit(e) {
        e.preventDefault();
        const params = { ...patientData };
        Object.keys(params).map((key) => {
            if (params[key] === "") {
                params[key] = null;
            }
            return undefined;
        });

        axios.get(`${process.env.REACT_APP_API}/patients`, { params: patientData })
            .then((res) => {
                setPatients(res.data);
            })
            .catch((err) => setStatus("error"));
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
        navigate(`/patients/${patient.mrn}`);
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
            {status === "error" && <ErrorMessage msg="An error occurred with your patient search! Please try again." setStatus={setStatus} />}
            <Button onClick={handleOpen} variant="outlined" endIcon={<PersonSearchIcon />}>
                Patient Search
            </Button>
            <Dialog open={searchOpen} onClose={handleClose}>
                <DialogTitle>Patient Search</DialogTitle>
                <DialogContent>
                    <DialogContentText>Search for a patient with one or more of the following fields. Click a result to view patient information.</DialogContentText>
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
                        <Grid item xs={12}>
                            <Button variant="outlined" fullWidth onClick={handlePatientSubmit}>Search</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button component={Link} to="/patients/new" fullWidth variant="outlined" color="secondary">
                                New Patient
                            </Button>
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
                                {!patients.length && <TableBody><TableRow><TableCell>No patients found with your query.</TableCell></TableRow></TableBody>}
                                <TableBody>
                                    {patients.map((patient) => (
                                        <TableRow hover key={patient.mrn} onClick={() => handlePatientClick(patient)} sx={{ cursor: "pointer" }}>
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
        </>
    )
}


export default PatientSearchButton;