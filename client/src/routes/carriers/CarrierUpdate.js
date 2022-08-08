// Packages
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';


const axios = require('axios').default;


function CarrierUpdate() {

    const navigate = useNavigate();

    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘
    //  STATE VARIABLES
    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘

    const [data, setData] = React.useState({    // form data
        provider: null,
        phone_number: null
    });

    const [loaded, setLoaded] = React.useState(false);
    const [status, setStatus] = React.useState(null); // success | error | deleted
    const [edited, setEdited] = useState(false); // if form has been changed from original data

    const { carrier_ID } = useParams();


    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘
    //  API FETCH REQUESTS
    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘

    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/carriers/${carrier_ID}`)
            .then((res) => {
                setLoaded(true);
                setData(res.data);    // query returns an array 
            })
            .catch((err) => {
                setLoaded(true);
                setStatus("error");
            });

    }, [carrier_ID]);


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

        if (!edited) setEdited(true);
    }

    function handleSubmit(e) {
        e.preventDefault();
        axios.put(`${process.env.REACT_APP_API}/carriers/${carrier_ID}`, data)
            .then((res) => {
                if (res.data.affectedRows > 0) {
                    setStatus("success");
                } else {
                    setStatus("error");
                }
            })
            .catch((err) => {
                setStatus("error");
            });
    }

    return (
        <>
            <Container component="main" maxWidth="md" sx={{ mb: 10 }} >
                {status === 'success' && <SuccessMessage msg="Successfully updated!" setStatus={setStatus} />}
                {status === "error" && <ErrorMessage msg="An error occurred! Please try again." setStatus={setStatus} />}
                {status === 'deleted' && <SuccessMessage msg="Successfully deleted." setStatus={setStatus} />}

                <Button onClick={() => navigate(-1)}><ArrowBackOutlinedIcon sx={{ mr: 0.5, mb: 0.2 }} /> Back</Button>                <Typography variant="h4">Edit Insurance Carrier</Typography>
                <Typography variant="subtitle1" gutterBottom>* denotes required</Typography>
                {!loaded &&
                    <Loading />
                }
                {loaded &&
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
                        <Stack direction="row" spacing={2}>
                            <Button type="submit" variant="outlined" disabled={!edited}>Submit</Button>
                            <DeleteButton text="Delete" route={"carriers"} id={carrier_ID} setStatus={setStatus} />
                        </Stack>
                    </Box>
                }
            </Container>
        </>
    )
}

export default CarrierUpdate;