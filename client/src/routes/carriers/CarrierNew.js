// Packages
import React from 'react';
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
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

const axios = require('axios').default;

function CarrierNew() {

    const navigate = useNavigate();

    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘
    //  STATE VARIABLES
    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘

    const [data, setData] = React.useState({
        provider: "",
        phone_number: ""
    });

    const [status, setStatus] = React.useState(null);

    // ∘₊✧──────✧₊∘
    //  HANDLERS
    // ∘₊✧──────✧₊∘

    // from https://reactjs.org/docs/forms.html#handling-multiple-inputs
    function handleChange(e) {
        const target = e.target;
        const name = target.name;

        setData({
            ...data,
            [name]: target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_API}/carriers`, data)
            .then((res) => {
                setStatus("success");
            })
            .catch((err) => {
                setStatus("error");
            });
    }

    return (
        <>
            <Container component="main" maxWidth="md" sx={{ mb: 10 }} >
                {status === 'success' && <SuccessMessage msg="Successfully added!" setStatus={setStatus} />}
                {status === "error" && <ErrorMessage msg="An error occurred! Please try again." setStatus={setStatus} />}

                <Button onClick={() => navigate(-1)}><ArrowBackOutlinedIcon sx={{ mr: 0.5, mb: 0.2 }} /> Back</Button>
                <Typography variant="h4">New Insurance Carrier</Typography>
                <Typography variant="subtitle1" gutterBottom>* denotes required</Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <Card sx={{ mb: 2, p: 2 }}>
                        <CardContent>
                            <Grid container spacing={2} mb={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField required id="name" label="Carrier Name" name="provider" value={data.provider} onChange={handleChange} fullWidth />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField type="tel" label="Phone Number" required id="phone" name="phone_number" value={data.phone_number} onChange={handleChange} fullWidth />
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

export default CarrierNew;