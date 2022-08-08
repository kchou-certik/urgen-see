import React from 'react';
import { Link } from 'react-router-dom';
import Table from '../../components/table/Table';

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';

import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';

const axios = require('axios').default;

function Carriers(props) {
    const [rows, setRows] = React.useState(null);
    const [loaded, setLoaded] = React.useState(false);
    const [error, setError] = React.useState(false);

    const tableOptions = {
        carrier_ID: false,
        phone_number: "Phone Number",
        provider: "Name"
    }

    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/carriers`)
            .then((res) => {
                setLoaded(true);
                setRows(res.data);
            })
            .catch((err) => {
                setError(true);
            });
    }, []);

    return (
        <>
            <header>
                <Typography component="h2" variant="h3" sx={{ mb: 3 }}>Insurance Carriers</Typography>
            </header>
            <main>
                <Stack direction="row" spacing="1em" sx={{ mb: 2 }}>
                    <Button component={Link} to="/carriers/new" variant="outlined" endIcon={<PostAddOutlinedIcon />}>
                        Add Carrier
                    </Button>
                </Stack>
                {
                    !loaded &&
                    <Loading />
                }
                {
                    error &&
                    <ErrorMessage msg="An error occurred! Please try again." />
                }
                {
                    loaded &&
                    <Table options={tableOptions} rows={rows} updatable={true} pKey="carrier_ID" />
                }
            </main>
        </>

    );

}

export default Carriers;