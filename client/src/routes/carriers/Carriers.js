import React from 'react';
import { Link } from 'react-router-dom';
import Table from '../../components/table/Table';

import { Button } from '@mui/material';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';


function Carriers(props) {
    const cols = ["carrier_ID", "phone_number", "provider"];
    const rows = [
        [1, "800-888-8888", "Empire BCBS"],
        [2, "800-111-1111", "Aetna"]
    ]

    return (
        <>
            <header>
                <h1>Insurance Carriers</h1>
            </header>
            <main>
                <Button component={Link} to="/carriers/new" variant="outlined" endIcon={<PostAddOutlinedIcon />}>
                    Add Carrier
                </Button>
                <Table cols={cols} rows={rows} updateLink="/carriers/test/update" />
            </main>
        </>

    );
}

export default Carriers;