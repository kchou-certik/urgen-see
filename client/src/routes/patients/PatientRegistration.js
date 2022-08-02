import React, { useState } from 'react';
import PlanSelect from '../../components/PlanSelect';
import { Link } from 'react-router-dom';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Autocomplete from '@mui/material/Autocomplete';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
const axios = require('axios').default;

function PatientRegistration() {
    const [req, setReq] = useState(false);
    const [data, setData] = useState({
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
        insurance_group: ""
    });
    const [plans, setPlans] = useState([]);
    const [insuranceNeeded, setInsuranceNeeded] = useState(true);

    const [rows, setRows] = React.useState(null);
    const [loaded, setLoaded] = React.useState(false);
    const [error, setError] = React.useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        alert("Submitted!");
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

    // Load data
    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/plans`)
            .then((res) => {
                setLoaded(true);
                setPlans(res.data);
            })
            .catch((err) => {
                setError(true);
            });
    }, []);

    return (
        <>
            <Container component="main" maxWidth="md">
                <Button component={Link} to="/patients">{"<-"} Patients</Button>
                <Typography variant="h4" gutterBottom>Patient Registration</Typography>
                <p>{JSON.stringify(data)}</p>
                <Box component="form" onSubmit={handleSubmit} >
                    <Grid container spacing={2} my={2}>
                        <Grid item xs={12} sm={4}>
                            <TextField required id="firstName" value={data.first_name} name="first_name" label="First name" fullWidth autoComplete="given-name" onChange={handleInputChange} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField required id="lastName" value={data.last_name} name="last_name" label="Last name" fullWidth autoComplete="family-name" onChange={handleInputChange} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField required id="dob" value={data.date_of_birth} type="date" name="date_of_birth" label="Date of birth" fullWidth autoComplete="bday" onChange={handleInputChange} InputLabelProps={{
                                shrink: true,
                            }} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormLabel id="sex-radio">Sex</FormLabel>
                            <RadioGroup
                                aria-labelledby="sex-radio"
                                name="sex"
                                value={data.sex}
                                onChange={handleInputChange}
                            >
                                <FormControlLabel value="female" control={<Radio required size="small" />} label="Female" onClick={() => setReq(false)} />
                                <FormControlLabel value="male" control={<Radio size="small" />} label="Male" onClick={() => setReq(false)} />
                                <FormControlLabel value="other" control={<Radio size="small" />} label="Other" onClick={() => setReq(true)} />
                                <TextField name="sex" value={req ? data.sex : ""} size="small" label="Other" fullWidth required={req} disabled={!req} onChange={handleInputChange} />
                            </RadioGroup>
                        </Grid>
                    </Grid>
                    <Typography variant="h6" mt={3} gutterBottom>Contact Info</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField id="phone" value={data.phone_number} autoComplete="tel" name="phone_number" label="Phone number" fullWidth onChange={handleInputChange} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField id="email" value={data.email} autoComplete="email" name="email" label="Email" fullWidth onChange={handleInputChange} />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField id="addr1" value={data.address_1} autoComplete="address-line1" name="address_1" label="Address line 1" fullWidth onChange={handleInputChange} />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField id="addr2" value={data.address_2} autoComplete="address-line2" name="address_2" label="Address line 2" fullWidth onChange={handleInputChange} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField id="city" value={data.city} autoComplete="address-level2" name="city" label="City" fullWidth onChange={handleInputChange} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField id="state" value={data.state} autoComplete="address-level1" name="state" label="State" fullWidth onChange={handleInputChange} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField id="postalCode" value={data.postal_code} autoComplete="postal-code" name="postal_code" label="Postal code" fullWidth onChange={handleInputChange} />
                        </Grid>
                    </Grid>
                    <Typography variant="h6" mt={3} gutterBottom>Primary Insurance</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <FormControlLabel label="Self-pay" control={<Switch checked={!insuranceNeeded} />} onChange={(e) => {
                                if (e.target.checked) {
                                    setData({ ...data, insurance_policy: "", insurance_group: "" });
                                }
                                setInsuranceNeeded(!e.target.checked);
                            }} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField id="inspolicy" name="insurance_policy" value={data.insurance_policy} label="Insurance Policy #" fullWidth onChange={handleInputChange} disabled={!insuranceNeeded} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField id="insgrp" name="insurance_group" value={data.insurance_group} label="Insurance Group #" fullWidth onChange={handleInputChange} disabled={!insuranceNeeded} />
                        </Grid>
                    </Grid>

                    {/* TODO IMPLEMENT INSURANCE PLAN CHOOSER */}
                    <p>
                        <label htmlFor="inscarrier">
                            Insurance Carrier
                            <select id="inscarrier" name="carrier" value={data.carrier} onChange={(e) => setData({ ...data, carrier: e.target.value })} disabled={!insuranceNeeded}>
                                <option value="empireBcbs">Empire BCBS</option>
                                <option value="aetna">Aetna</option>
                            </select>
                        </label>
                    </p>
                    <p>
                        <label htmlFor="insplan">
                            Insurance Plan
                            <PlanSelect carrier={data.carrier} disabled={!insuranceNeeded} />
                        </label>
                    </p>

                    <Button type="submit" variant="outlined">Submit</Button>
                </Box>
            </Container>
        </>
    )
}

export default PatientRegistration;