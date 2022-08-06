import React from 'react';
import { Link } from 'react-router-dom';
import Table from '../../components/table/Table';
import ErrorMessage from '../../components/ErrorMessage';

import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';

const axios = require('axios').default;

function Plans(props) {
    const [rows, setRows] = React.useState(null);
    const [loaded, setLoaded] = React.useState(false);
    const [error, setError] = React.useState(false);

    const tableOptions = {
        name: 'Plan Name',
        plan_ID: false,
        referral_required: 'Referral Required',
        carrier_ID: false,
        provider: 'Carrier'
    };

    // Load data
    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/plans`)
            .then((res) => {
                const data = res.data.map((row) => {
                    if (row.referral_required === 1) {
                        row.referral_required = "Yes";
                    } else if (row.referral_required === 0) {
                        row.referral_required = "No";
                    } else {
                        row.referral_required = "";
                    }
                    return row;
                })
                setLoaded(true);
                setRows(data);
            })
            .catch((err) => {
                setError(true);
            });
    }, []);

    return (
        <>
            <header>
                <Link to="/carriers">{"<- "}Carriers</Link>
                <h1>Insurance Plans</h1>
            </header>
            <main>
                <Stack direction="row" spacing="1em" sx={{ mb: 2 }}>
                    <Button component={Link} to="/plans/new" variant="outlined" endIcon={<PostAddOutlinedIcon />}>
                        Add Plan
                    </Button>
                </Stack>
                {
                    !loaded &&
                    <h3>Loading table...</h3>
                }
                {
                    error &&
                    <ErrorMessage msg="An error occurred while loading data. Please try again." />
                }
                {
                    loaded &&
                    <Table options={tableOptions} rows={rows} updatable pKey="plan_ID" />
                }
            </main>
        </>

    );
}

export default Plans;