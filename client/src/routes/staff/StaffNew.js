// Packages
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import ErrorMessage from '../../components/ErrorMessage';
import SuccessMessage from '../../components/SuccessMessage';

// MUI Components
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

// Icons
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

const axios = require('axios').default;


function StaffNew() {
    const navigate = useNavigate();

    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘
    //  STATE VARIABLES
    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘

    const [status, setStatus] = React.useState(null); // success | error
    const [data, setData] = useState({      // form data
        first_name: "",
        last_name: "",
        practitioner_type: "",
        phone_number: "",
        email: "",
        address_1: "",
        address_2: "",
        city: "",
        state: "",
        postal_code: "",
    });

    // ∘₊✧──────✧₊∘
    //  HANDLERS
    // ∘₊✧──────✧₊∘

    function handleSubmit(e) {
        // submits API POST request
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API}/staff`, data)
            .then((res) => setStatus("success"))
            .catch((err) => setStatus("error"));
    }

    // From https://reactjs.org/docs/forms.html#handling-multiple-inputs
    function handleInputChange(event) {
        // updates form data for controlled inputs
        const target = event.target;
        const name = target.name;

        setData({
            ...data,
            [name]: target.value
        });
    }


    return (
        <>
            <Container component="main" maxWidth="md" sx={{ mb: 10 }} >
                {status === 'success' && <SuccessMessage msg="Successfully added!" setStatus={setStatus} />}
                {status === "error" && <ErrorMessage msg="An error occurred! Please try again." setStatus={setStatus} />}

                <Button onClick={() => navigate(-1)}><ArrowBackOutlinedIcon sx={{ mr: 0.5, mb: 0.2 }} /> Back</Button>
                <Typography variant="h4">Staff Registration</Typography>
                <Typography variant="subtitle1" gutterBottom>* denotes required</Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <Card sx={{ mb: 2, p: 2 }}>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <TextField required id="lastName" value={data.last_name} name="last_name" label="Last name" fullWidth onChange={handleInputChange} />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField required id="firstName" value={data.first_name} name="first_name" label="First name" fullWidth onChange={handleInputChange} />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth required>
                                        <InputLabel id="typeLabel">Practitioner Type</InputLabel>
                                        <Select
                                            labelId="typeLabel"
                                            id="type"
                                            value={data.practitioner_type}
                                            label="Practitioner Type"
                                            onChange={handleInputChange}
                                            name="practitioner_type"
                                        >
                                            <MenuItem value="MD">MD</MenuItem>
                                            <MenuItem value="DO">DO</MenuItem>
                                            <MenuItem value="PA">PA</MenuItem>
                                            <MenuItem value="RN">RN</MenuItem>
                                            <MenuItem value="RN">MA</MenuItem>
                                        </Select>
                                    </FormControl>
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
                    <Button type="submit" variant="outlined">Submit</Button>
                </Box>
            </Container>
        </>
    )
}

export default StaffNew;