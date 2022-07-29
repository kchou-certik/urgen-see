import React from 'react';
import { Link } from 'react-router-dom';
import Table from '../../components/table/Table';

import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';

function Plans(props) {
    const cols = ["plan_ID", "referral_required", "carrier_ID", "carrier.provider", "name"];
    const rows = [
        [1, 1, 1, "Empire BCBS", "HealthPlus"],
        [2, 0, 2, "Aetna", "Bronze PPO"],
        [3, 1, 2, "Aetna", "HMO"]
    ]

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
                <Table cols={cols} rows={rows} updatable pKey="plans_ID" />
            </main>
        </>

    );
}

export default Plans;