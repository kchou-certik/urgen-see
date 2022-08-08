import React, { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage';
import SuccessMessage from '../../components/SuccessMessage';
import { useNavigate } from 'react-router-dom';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';

import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

const axios = require('axios').default;

function PlanNew() {
    const navigate = useNavigate();

    // STATE VARIABLES

    const [status, setStatus] = React.useState(null); // success | error | nocarrier
    const [data, setData] = useState({      // form data
        carrier: null,
        referral_required: "",
        name: ""
    });

    // insurance selector/input state variables
    const [carriers, setCarriers] = useState([]);
    const [carrierSelectorOpen, setCarrierSelectorOpen] = useState(false);


    // HANDLERS

    function handleSubmit(e) {
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_API}/plans`, data)
            .then((res) => setStatus("success"))
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


    // API FETCH REQUESTS

    // load Carrier data
    const loading = carrierSelectorOpen && carriers.length === 0; // from https://mui.com/material-ui/react-autocomplete/#load-on-open
    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/carriers`)
            .then((res) => {
                setCarriers(res.data);
            })
            .catch((err) => {
                setStatus("error");
            });
    }, [loading]);


    return (
        <>
            <Container component="main" maxWidth="md" sx={{ mb: 10 }} >
                {status === 'success' && <SuccessMessage msg="Successfully added!" setStatus={setStatus} />}
                {status === "error" && <ErrorMessage msg="An error occurred! Please try again." setStatus={setStatus} />}

                <Button onClick={() => navigate(-1)}><ArrowBackOutlinedIcon sx={{ mr: 0.5, mb: 0.2 }} /> Back</Button>
                <Typography variant="h4">New Insurance Plan</Typography>
                <Typography variant="subtitle1" gutterBottom>* denotes required</Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <Card sx={{ mb: 2, p: 2 }}>
                        <CardContent>
                            <Grid container spacing={2} mb={2}>
                                <Grid item xs={12} sm={6}>
                                    <Autocomplete id="carrier"
                                        options={carriers}
                                        getOptionLabel={(option) => option.provider}
                                        isOptionEqualToValue={(option, val) => option.carrier_ID === val.carrier_ID}
                                        value={data.carrier}
                                        onChange={(e, val) => {
                                            setData({ ...data, carrier: val });
                                        }}
                                        open={carrierSelectorOpen}
                                        onOpen={() => {
                                            setCarrierSelectorOpen(true);
                                        }}
                                        onClose={() => {
                                            setCarrierSelectorOpen(false);
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                required
                                                {...params} label="Insurance Carrier" fullWidth
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
                                <Grid item xs={12} sm={6}>
                                    <TextField id="name" required value={data.name} name="name" label="Plan name" fullWidth onChange={handleInputChange} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl>
                                        <FormLabel id="referral-label" required>Referral Required</FormLabel>
                                        <RadioGroup
                                            aria-labelledby="referral-label"
                                            name="referral_required"
                                            value={data.referral_required}
                                            onChange={handleInputChange}
                                        >
                                            <FormControlLabel value={1} control={<Radio />} label="Yes" />
                                            <FormControlLabel value={0} control={<Radio />} label="No" />
                                            <FormControlLabel value="" control={<Radio />} label="Unknown" />
                                        </RadioGroup>
                                    </FormControl>
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

export default PlanNew;