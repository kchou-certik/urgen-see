// Packages
import React from 'react';
import { Link } from 'react-router-dom';
import date from 'date-and-time';

// Components
import Table from '../../components/table/Table'
import ErrorMessage from '../../components/ErrorMessage';
import PatientSearchButton from '../../components/PatientSearchButton';
import Loading from '../../components/Loading';

// MUI Components
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const axios = require('axios').default;


function Patients(props) {

    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘
    //  STATE VARIABLES
    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘

    const [rows, setRows] = React.useState(null);   // patient data
    const [loaded, setLoaded] = React.useState(false);  // if data is loaded
    const [error, setError] = React.useState(false);

    const tableOptions = {
        mrn: "MRN",
        first_name: "First Name",
        last_name: "Last Name",
        sex: "Sex",
        date_of_birth: "DOB",
        phone_number: "Phone Number",
        email: "Email",
        address_1: "Address 1",
        address_2: "Address 2",
        city: "City",
        state: "State",
        postal_code: "Postcode",
        insurance_policy: "Policy #",
        insurance_group: "Group #",
        plan_ID: false,
        plan_name: "Plan"
    };

    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘
    //  API FETCH REQUESTS
    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘

    React.useEffect(() => {
        // load patient data
        axios.get(`${process.env.REACT_APP_API}/patients`)
            .then((res) => {
                res.data.map((row) => {
                    // format DOB
                    row.date_of_birth = date.format(new Date(row.date_of_birth), "M/D/YYYY");
                    return row;
                });
                setLoaded(true);
                setRows(res.data);
            })
            .catch((err) => {
                setError(true);
            });
    }, []);


    return (
        <main>
            <header>
                <Typography component="h2" variant="h3" sx={{ mb: 3 }}>Patient Registry</Typography>
            </header>
            <Stack direction="row" spacing="1em" sx={{ mb: 2 }}>
                <PatientSearchButton />
                <Button component={Link} to="/patients/new" variant="outlined" endIcon={<PersonAddIcon />}>
                    Register
                </Button>
            </Stack>
            {
                !loaded &&
                <Loading />
            }
            {
                error &&
                <ErrorMessage msg="An error occurred while loading data. Please try again." />
            }
            {
                loaded &&
                <Table options={tableOptions} rows={rows} updatable clickable pKey="mrn" />
            }
        </main >
    );
}

export default Patients;