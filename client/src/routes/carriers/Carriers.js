import React from 'react';
import { Link } from 'react-router-dom';
import Table from '../../components/table/Table';
import axios from 'axios';

import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';

function Carriers(props) {
    const [rows, setRows] = React.useState(null);
    const [loaded, setLoaded] = React.useState(false);
    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/carriers`)
            .then((res) => {
                setLoaded(true);
                setRows(res.data);
            });
    }, []);

    const cols = ["carrier_ID", "phone_number", "provider"];

    return (
        <>
            <header>
                <h1>Insurance Carriers</h1>
            </header>
            <main>
                <Stack direction="row" spacing="1em" sx={{ mb: 2 }}>
                    <Button component={Link} to="/carriers/new" variant="outlined" endIcon={<PostAddOutlinedIcon />}>
                        Add Carrier
                    </Button>
                </Stack>
                {
                    loaded &&
                    <Table cols={cols} rows={rows} updateLink="/carriers/test/update" />
                }
            </main>
        </>

    );

}

export default Carriers;