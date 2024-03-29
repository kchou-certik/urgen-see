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
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

// Icons
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

const axios = require('axios').default;


function PatientUpdate() {
    const { mrn } = useParams();
    const navigate = useNavigate();

    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘
    //  STATE VARIABLES
    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘

    const [status, setStatus] = React.useState(null); // success | error | deleted
    const [req, setReq] = useState(false);  // if text input field for 'other' sex is required
    const [loaded, setLoaded] = useState(false); // if patient's data is loaded from API 
    const [edited, setEdited] = useState(false); // if form has been changed from original data
    const [data, setData] = useState({      // form data
        first_name: "",
        last_name: "",
        date_of_birth: "",
        sex: "",
        phone_number: "",
        email: "",
        address_1: "",
        address_2: "",
        city: "",
        state: "",
        postal_code: "",
        insurance_policy: "",
        insurance_group: "",
        plan: null
    });

    // insurance selector/input state variables
    const [plans, setPlans] = useState([]);     // plan data
    const [insuranceNeeded, setInsuranceNeeded] = useState(true);   // is insurance data needed? false for self-pay
    const [planSelectorOpen, setPlanSelectorOpen] = useState(false);    // plan dropdown selector state

    // ∘₊✧──────✧₊∘
    //  HANDLERS
    // ∘₊✧──────✧₊∘

    function handleSubmit(e) {
        // submits API PUT request
        e.preventDefault();
        const body = { ...data }

        // convert date of birth to UTC
        const bday = body.date_of_birth + " 12:00:00"
        body.date_of_birth = new Date(bday);

        axios.put(`${process.env.REACT_APP_API}/patients/${mrn}`, body)
            .then((res) => setStatus("success"))
            .catch((err) => setStatus("error"));
    }

    // from https://reactjs.org/docs/forms.html#handling-multiple-inputs
    function handleInputChange(event) {
        // updates form data for controlled inputs
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

    const loading = planSelectorOpen && plans.length === 0; // from https://mui.com/material-ui/react-autocomplete/#load-on-open
    React.useEffect(() => {
        // load plan data for AutoComplete dropdown selector
        axios.get(`${process.env.REACT_APP_API}/plans`)
            .then((res) => {
                setPlans(res.data);
            })
            .catch((err) => {
                setStatus("error");
            });
    }, [loading]);

    React.useEffect(() => {
        // load patient data
        if (loaded) return;

        axios.get(`${process.env.REACT_APP_API}/patients/${mrn}`)
            .then((res) => {
                let resData = res.data;

                // change NULL values to empty strings
                Object.keys(resData).map((key) => {
                    if (resData[key] === null) {
                        resData[key] = "";
                    }
                    return null;
                });

                // format DOB so it works with calendar input field
                resData.date_of_birth = date.format(new Date(resData.date_of_birth), "YYYY-MM-DD");

                // checks if patient is not F/M and adjusts form accordingly
                if (resData.sex !== "M" && resData.sex !== "F") {
                    setReq(true);
                }

                // checks if patient is self-pay and adjusts form accordingly
                if (resData.insurance_policy === "" && resData.insurance_group === "" && resData.plan_ID === "") {
                    setInsuranceNeeded(false);
                }

                // update form data; `plan` is set to null as that is what Autocomplete component expects
                // (despite all the other inputs not liking null lol)
                if (resData.plan_ID) {
                    resData.plan = {
                        plan_ID: resData.plan_ID,
                        name: resData.plan_name
                    }
                } else {
                    resData.plan = null;
                }

                setData({ ...data, ...resData });
                setLoaded(true);
            })
            .catch((err) => {
                setStatus("error");
            });
    }, [mrn, data, loaded]);


    return (
        <>
            <Container component="main" maxWidth="md" sx={{ mb: 10 }} >
                {status === 'success' && <SuccessMessage msg="Successfully updated!" setStatus={setStatus} />}
                {status === "error" && <ErrorMessage msg="An error occurred! Please try again." setStatus={setStatus} />}
                {status === 'deleted' && <SuccessMessage msg="Successfully deleted." setStatus={setStatus} />}

                <Button onClick={() => navigate(-1)}><ArrowBackOutlinedIcon sx={{ mr: 0.5, mb: 0.2 }} /> Back</Button>
                <Typography variant="h4">Edit Patient Record</Typography>
                <Typography variant="subtitle1" gutterBottom>* denotes required</Typography>

                {
                    !loaded &&
                    <Loading />
                }

                {loaded &&
                    <Box component="form" onSubmit={handleSubmit}>
                        <Card sx={{ mb: 2, p: 2 }}>
                            <CardContent>
                                <Grid container spacing={2} mb={2}>
                                    <Grid item xs={12} sm={4}>
                                        <TextField required id="lastName" value={data.last_name} name="last_name" label="Last name" fullWidth onChange={handleInputChange} />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField required id="firstName" value={data.first_name} name="first_name" label="First name" fullWidth onChange={handleInputChange} />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField required id="dob" value={data.date_of_birth} type="date" name="date_of_birth" label="Date of birth" fullWidth onChange={handleInputChange} InputLabelProps={{
                                            shrink: true,
                                        }} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormLabel id="sex-radio">Sex *</FormLabel>
                                        <RadioGroup
                                            aria-labelledby="sex-radio"
                                            name="sex"
                                            value={data.sex}
                                            onChange={handleInputChange}
                                        >
                                            <FormControlLabel value="F" name="sex" control={<Radio size="small" />} label="Female" onClick={() => setReq(false)} />
                                            <FormControlLabel value="M" name="sex" control={<Radio size="small" />} label="Male" onClick={() => setReq(false)} />
                                            <FormControlLabel value="other" checked={data.sex !== 'M' && data.sex !== 'F'} name="sex" control={<Radio size="small" />} label="Other" onClick={() => setReq(true)} />
                                            <TextField name="sex" value={req ? data.sex : ""} size="small" label="Other" fullWidth required={req} disabled={!req} onChange={handleInputChange} />
                                        </RadioGroup>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField id="mrn" value={data.mrn} label="MRN" disabled />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                        <Card sx={{ mb: 2, p: 2 }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>Contact Info</Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField id="phone" required value={data.phone_number} type="tel" name="phone_number" label="Phone number" fullWidth onChange={handleInputChange} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField id="email" value={data.email} type="email" name="email" label="Email" fullWidth onChange={handleInputChange} />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField id="addr1" value={data.address_1} name="address_1" label="Address line 1" fullWidth onChange={handleInputChange} />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField id="addr2" value={data.address_2} name="address_2" label="Address line 2" fullWidth onChange={handleInputChange} />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField id="city" value={data.city} name="city" label="City" fullWidth onChange={handleInputChange} />
                                    </Grid>
                                    <Grid item xs={6} sm={4}>
                                        <TextField id="state" value={data.state} name="state" label="State" fullWidth onChange={handleInputChange} />
                                    </Grid>
                                    <Grid item xs={6} sm={4}>
                                        <TextField id="postalCode" value={data.postal_code} name="postal_code" label="Postal code" fullWidth onChange={handleInputChange} />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                        <Card sx={{ mb: 2, p: 2 }}>
                            <CardContent>
                                <Typography variant="h6" mt={3} gutterBottom>Primary Insurance</Typography>
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
                                    <Grid item xs={12} sm={4}>
                                        <TextField id="inspolicy" name="insurance_policy" required={insuranceNeeded} value={data.insurance_policy} label="Insurance Policy #" fullWidth onChange={handleInputChange} disabled={!insuranceNeeded} />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField id="insgrp" name="insurance_group" value={data.insurance_group} label="Insurance Group #" fullWidth onChange={handleInputChange} disabled={!insuranceNeeded} />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <Autocomplete id="plans"
                                            disabled={!insuranceNeeded}
                                            options={plans} groupBy={(option) => option.provider}
                                            getOptionLabel={(option) => option.name}
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
                                                                {loading ? <CircularProgress size={20} /> : null}
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
                            <DeleteButton text="Delete" route={"patients"} id={mrn} setStatus={setStatus} />
                        </Stack>
                    </Box>
                }
            </Container>
        </>
    )
}

export default PatientUpdate;