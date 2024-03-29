// Packages
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Components
import ErrorMessage from '../../components/ErrorMessage';
import SuccessMessage from '../../components/SuccessMessage';
import DeleteButton from '../../components/DeleteButton';

// MUI Components
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

// Icons
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

const axios = require('axios').default;


function InteractionUpdate() {
    const { visit_staff_ID } = useParams();
    const navigate = useNavigate();

    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘
    //  STATE VARIABLES
    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘

    const [status, setStatus] = React.useState(null); // success | error | deleted
    const [loaded, setLoaded] = useState(false); // if patient's data is loaded from API 
    const [edited, setEdited] = useState(false); // if form has been changed from original data
    const [data, setData] = useState({      // form data
        staff_ID: "",
    });

    // staff selector/input state variables
    const [staffInput, setStaffInput] = useState([]);
    const [staffSelectorOpen, setStaffSelectorOpen] = useState(false);

    // ∘₊✧──────✧₊∘
    //  HANDLERS
    // ∘₊✧──────✧₊∘

    function handleSubmit(e) {
        // submits API PUT request
        e.preventDefault();
        axios.put(`${process.env.REACT_APP_API}/staff-interactions/${visit_staff_ID}`, data)
            .then((res) => setStatus("success"))
            .catch((err) => setStatus("error"));
    }

    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘
    //  API FETCH REQUESTS
    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘

    const loading = staffSelectorOpen && staffInput.length === 0; // from https://mui.com/material-ui/react-autocomplete/#load-on-open
    React.useEffect(() => {
        // load Staff data for AutoComplete selector dropdown
        axios.get(`${process.env.REACT_APP_API}/staff`)
            .then((res) => {
                setStaffInput(res.data);
            })
            .catch((err) => {
                setStatus("error");
            });
    }, [loading]);

    React.useEffect(() => {
        // load Staff Interaction data
        if (loaded) return;

        axios.get(`${process.env.REACT_APP_API}/staff-interactions/${visit_staff_ID}`)
            .then((res) => {
                let resData = res.data;

                // change NULL values to empty strings
                Object.keys(resData).map((key) => {
                    if (resData[key] === null) {
                        resData[key] = "";
                    }
                    return null;
                });

                // build data object that we will use as initial form data
                // defaults to Null
                if (resData.staff_ID) {
                    resData.staffMember = {
                        staff_ID: resData.staff_ID,
                        name: resData.last_name + ", " + resData.first_name,
                        practitioner_type: resData.practitioner_type
                    }
                } else {
                    resData.staffMember = null;
                }
                setData({ ...data, ...resData });
                setLoaded(true);
            })
            .catch((err) => {
                setStatus("error");
            });
    }, [visit_staff_ID, data, loaded]);


    return (
        <>
            <Container component="main" maxWidth="md" sx={{ mb: 10 }} >
                {status === 'success' && <SuccessMessage msg="Successfully updated!" setStatus={setStatus} />}
                {status === "error" && <ErrorMessage msg="An error occurred! Please try again." setStatus={setStatus} />}
                {status === 'deleted' && <SuccessMessage msg="Successfully deleted." setStatus={setStatus} />}

                <Button onClick={() => navigate(-1)}><ArrowBackOutlinedIcon sx={{ mr: 0.5, mb: 0.2 }} /> Back</Button>
                <Typography variant="h4">Edit Patient-Staff Interaction</Typography>
                <Typography variant="subtitle1" gutterBottom>* denotes required</Typography>

                {!loaded && <Box sx={{ display: 'flex', alignItems: 'center' }}><CircularProgress /></Box>}

                {loaded &&
                    <Box component="form" onSubmit={handleSubmit}>
                        <Card sx={{ mb: 2, p: 2 }}>
                            <CardContent>
                                <Typography variant="h6" mt={3} gutterBottom>Staff Interaction</Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12}>
                                        <Autocomplete id="staffInput"
                                            options={staffInput}
                                            getOptionLabel={(option) => option.name + ", " + option.practitioner_type}
                                            isOptionEqualToValue={(option, val) => option.staff_ID === val.staff_ID}
                                            value={data.staffMember}
                                            onChange={(e, val) => {
                                                setData({ ...data, staffMember: val });
                                                if (!edited) setEdited(true);
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
                                                    {...params} label="Staff Member *" fullWidth
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
                            <DeleteButton text="Delete" route={"staff-interactions"} id={visit_staff_ID} setStatus={setStatus} />
                        </Stack>
                    </Box>
                }
            </Container>
        </>
    )
}

export default InteractionUpdate;