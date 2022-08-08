// Packages
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import date from 'date-and-time';

// Components
import ErrorMessage from '../../components/ErrorMessage';
import SuccessMessage from '../../components/SuccessMessage';
import DeleteButton from '../../components/DeleteButton';
import Loading from '../../components/Loading';

// MUI Components
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

// Icons
import ScheduleIcon from '@mui/icons-material/Schedule';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

const axios = require('axios').default;


function VisitUpdate() {
    const { visit_ID } = useParams();
    const navigate = useNavigate();

    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘
    //  STATE VARIABLES
    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘
    const [status, setStatus] = React.useState(null); // success | error | deleted
    const [loaded, setLoaded] = useState(false); // if data is loaded from API 
    const [edited, setEdited] = useState(false); // if form has been changed from original data
    const [staffEdited, setStaffEdited] = useState(false); // if form has been changed from original data
    const [data, setData] = useState({      // form data
        first_name: "",
        last_name: "",
        date_of_birth: "",
        mrn: "",
        scheduled_time: "",
        check_in_time: "",
        discharge_time: "",
        primary_diagnosis: "",
        visit_type: "",
        plan: null,
        staff: []
    });

    // insurance selector/input state variables
    const [plans, setPlans] = useState([]);
    const [insuranceNeeded, setInsuranceNeeded] = useState(true);
    const [planSelectorOpen, setPlanSelectorOpen] = useState(false);

    // staff selector/input state variables
    const [staff, setStaff] = useState([]);
    const [staffSelectorOpen, setStaffSelectorOpen] = useState(false);

    // ∘₊✧──────✧₊∘
    //  HANDLERS
    // ∘₊✧──────✧₊∘
    function handleSubmit(e) {
        e.preventDefault();

        // update visit information
        axios.put(`${process.env.REACT_APP_API}/visits/${visit_ID}`, data)
            .then((res) => {
                if (staffEdited) {

                    // delete old interactions
                    axios.delete(`${process.env.REACT_APP_API}/staff-interactions?visit_ID=${visit_ID}`)
                        .then((res) => {
                            // add new interactions one by one
                            data.staff.map((entry) => {
                                axios.post(`${process.env.REACT_APP_API}/staff-interactions`, {
                                    insertId: visit_ID,
                                    data: {
                                        staffMember: {
                                            staff_ID: entry.staff_ID
                                        }
                                    }
                                })
                                return undefined;
                            });

                            setStatus("success");
                        })
                        .catch((err) => setStatus("error"));
                } else {
                    setStatus("success");
                }
            })
            .catch((err) => setStatus("error"));
    }

    // from https://reactjs.org/docs/forms.html#handling-multiple-inputs
    function handleInputChange(event) {
        const target = event.target;
        const name = target.name;

        setData({
            ...data,
            [name]: target.value
        });

        if (!edited) setEdited(true);
    }


    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘
    //  API FETCH REQUESTS
    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘

    // load plan data when dropdown opens
    const loadingPlans = planSelectorOpen && plans.length === 0; // from https://mui.com/material-ui/react-autocomplete/#load-on-open
    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/plans`)
            .then((res) => {
                setPlans(res.data);
            })
            .catch((err) => {
                setStatus("error");
            });
    }, [loadingPlans]);

    // load staff data when dropdown opens
    const loadingStaff = staffSelectorOpen && staff.length === 0; // from https://mui.com/material-ui/react-autocomplete/#load-on-open
    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/staff`)
            .then((res) => {
                setStaff(res.data);
            })
            .catch((err) => {
                setStatus("error");
            });
    }, [loadingStaff]);

    // load visit and interaction data
    React.useEffect(() => {
        if (loaded) return;

        axios.get(`${process.env.REACT_APP_API}/visits/${visit_ID}`)
            .then((res) => {
                let resData = res.data;

                // change NULL values to empty strings
                Object.keys(resData).map((key) => {
                    if (resData[key] === null) {
                        resData[key] = "";
                    }
                    return null;
                });

                // format dates so they work with calendar input field
                resData.date_of_birth = date.format(new Date(resData.date_of_birth), "YYYY-MM-DD");
                resData.scheduled_time = date.format(new Date(resData.scheduled_time), "YYYY-MM-DDTHH:mm");
                if (resData.check_in_time) resData.check_in_time = date.format(new Date(resData.check_in_time), "YYYY-MM-DDTHH:mm");
                if (resData.discharge_time) resData.discharge_time = date.format(new Date(resData.discharge_time), "YYYY-MM-DDTHH:mm");

                // checks if patient is self-pay and adjusts form accordingly
                if (resData.plan_ID === "") {
                    setInsuranceNeeded(false);
                }

                // update form data; `plan` is set to null as that is what Autocomplete component expects
                // (despite all the other inputs not liking null lol)

                if (resData.plan_ID) {
                    resData.plan = {
                        plan_ID: resData.plan_ID,
                        plan_name: resData.plan_name
                    }
                } else {
                    resData.plan = null;
                }

                setData({ ...data, ...resData });

                axios.get(`${process.env.REACT_APP_API}/staff-interactions?visit_ID=${visit_ID}`)
                    .then((res) => {

                        // change NULL values to empty strings
                        Object.keys(resData).map((key) => {
                            if (res.data[key] === null) {
                                res.data[key] = "";
                            }
                            return null;
                        });

                        setData({ ...data, staff: res.data });
                        setLoaded(true);
                    })
                    .catch((err) => {
                        setStatus("error");
                        setLoaded(true);
                    });
            })
            .catch((err) => {
                console.log(err)
                setStatus("error");
                setLoaded(true);
            });
    }, [visit_ID, data, loaded]);


    return (
        <>
            <Container component="main" maxWidth="md" sx={{ mb: 10 }} >
                {status === 'success' && <SuccessMessage msg="Successfully updated!" setStatus={setStatus} />}
                {status === "error" && <ErrorMessage msg="An error occurred! Please try again." setStatus={setStatus} />}
                {status === 'deleted' && <SuccessMessage msg="Successfully deleted." setStatus={setStatus} />}

                <Button onClick={() => navigate(-1)}><ArrowBackOutlinedIcon sx={{ mr: 0.5, mb: 0.2 }} /> Back</Button>
                <Typography variant="h4">Edit Appointment Details</Typography>
                <Typography variant="subtitle1" gutterBottom>* denotes required</Typography>

                {
                    (!loaded) &&
                    < Loading />
                }

                {
                    (loaded) &&
                    <Box component="form" onSubmit={handleSubmit}>
                        <Card sx={{ mb: 2, p: 2 }}>
                            <CardContent>
                                <Typography component="h2" variant="h6" gutterBottom>Patient Info</Typography>
                                <Grid container spacing={2} mb={2}>
                                    <Grid item xs={12} sm={4}>
                                        <TextField id="lastName" value={data.last_name} label="Last name" variant="standard" fullWidth InputProps={{
                                            readOnly: true,
                                        }} />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField id="firstName" value={data.first_name} label="First name" variant="standard" fullWidth InputProps={{
                                            readOnly: true,
                                        }} />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField id="dob" value={data.date_of_birth} type="date" label="Date of birth" variant="standard" fullWidth InputProps={{
                                            readOnly: true,
                                        }} />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField id="mrn" value={data.mrn} label="MRN" variant="standard" fullWidth InputProps={{
                                            readOnly: true,
                                        }} />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                        <Card sx={{ mb: 2, p: 2 }}>
                            <CardContent>
                                <Typography component="h2" variant="h6" gutterBottom>Scheduling</Typography>
                                <Grid container spacing={2} mb={2}>
                                    <Grid item xs={12} sm={12}>
                                        <TextField id="time" type="datetime-local" label="Scheduled Time" required name="scheduled_time" value={data.scheduled_time} fullWidth onChange={handleInputChange}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            InputProps={{
                                                startAdornment: <ScheduleIcon />
                                            }} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField id="checkIn" type="datetime-local" label="Check-in" name="check_in_time" value={data.check_in_time} fullWidth onChange={handleInputChange}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            InputProps={{
                                                startAdornment: <LoginIcon />
                                            }} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField id="checkOut" type="datetime-local" label="Check-out" name="discharge_time" value={data.discharge_time} fullWidth onChange={handleInputChange}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            InputProps={{
                                                startAdornment: <LogoutIcon />
                                            }} />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                        <Card sx={{ mb: 2, p: 2 }}>
                            <CardContent>
                                <Typography component="h2" variant="h6" gutterBottom>Details</Typography>
                                <Grid container spacing={2} mb={2}>
                                    <Grid item xs={12} sm={12}>
                                        <TextField id="diagnosis" label="Primary Diagnosis" name="primary_diagnosis" value={data.primary_diagnosis} fullWidth onChange={handleInputChange} />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField id="type" label="Visit Type / Notes" name="visit_type" required value={data.visit_type} fullWidth multiline onChange={handleInputChange} />
                                    </Grid>
                                </Grid>
                                <Typography variant="subtitle1" mt={3} gutterBottom>Visit Insurance</Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={4}>
                                        <FormControlLabel label="Self-pay" control={<Switch checked={!insuranceNeeded} />} onChange={(e) => {
                                            if (e.target.checked) {
                                                setData({ ...data, insurance_policy: "", insurance_group: "", plan: null });
                                            }
                                            setInsuranceNeeded(!e.target.checked);
                                            if (!edited) setEdited(true)
                                        }} />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <Autocomplete id="plans"
                                            disabled={!insuranceNeeded}
                                            options={plans} groupBy={(option) => option.provider}
                                            getOptionLabel={(option) => option.plan_name ? option.plan_name : option.provider + " " + option.name}
                                            isOptionEqualToValue={(option, val) => option.plan_ID === val.plan_ID}
                                            value={data.plan}
                                            onChange={(e, val) => {
                                                setData({ ...data, plan: val });
                                                if (!edited) setEdited(true);
                                            }}
                                            open={planSelectorOpen}
                                            onOpen={() => {
                                                setPlanSelectorOpen(true);
                                            }}
                                            onClose={() => {
                                                setPlanSelectorOpen(false);
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params} label="Insurance Plan" fullWidth
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        endAdornment: (
                                                            <>
                                                                {loadingPlans ? <CircularProgress size={20} /> : null}
                                                                {params.InputProps.endAdornment}
                                                            </>
                                                        )
                                                    }}
                                                />)}
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                        <Card sx={{ mb: 2, p: 2 }}>
                            <CardContent>
                                <Typography component="h2" variant="h6" gutterBottom>Staff Interactions</Typography>
                                <Grid container spacing={2} mb={2}>
                                    <Grid item xs={12} sm={12}>
                                        <Autocomplete multiple filterSelectedOptions id="staff"
                                            options={staff} groupBy={(option) => option.practitioner_type}
                                            getOptionLabel={(option) => option.staff_name ? option.staff_name : option.name + ", " + option.practitioner_type}
                                            isOptionEqualToValue={(option, val) => option.staff_ID === val.staff_ID}
                                            value={data.staff}
                                            onChange={(e, val) => {
                                                setData({ ...data, staff: val });
                                                if (!edited) setEdited(true);
                                                if (!staffEdited) setStaffEdited(true);
                                            }}
                                            open={staffSelectorOpen}
                                            onOpen={() => {
                                                setStaffSelectorOpen(true);
                                            }}
                                            onClose={() => {
                                                setStaffSelectorOpen(false);
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params} label="Select staff member(s)" fullWidth
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        endAdornment: (
                                                            <>
                                                                {loadingStaff ? <CircularProgress size={20} /> : null}
                                                                {params.InputProps.endAdornment}
                                                            </>
                                                        )
                                                    }}
                                                />)}
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                        <Stack direction="row" spacing={2}>
                            <Button type="submit" variant="outlined" disabled={!edited}>Submit</Button>
                            <DeleteButton text="Delete" route={"visits"} id={visit_ID} setStatus={setStatus} />
                        </Stack>
                    </Box>
                }
            </Container>
        </>
    )
}

export default VisitUpdate;