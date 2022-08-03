import React from 'react';
import { useNavigate } from 'react-router-dom';

import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

import CloseIcon from '@mui/icons-material/Close';

function SuccessMessage({ msg }) {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(true);

    function handleClose(e, reason) {
        setOpen(false);
    };

    const action = (
        <>
            <Button size="small" color="inherit" onClick={() => navigate(-1)}>BACK</Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </>
    );

    return (
        <Snackbar
            open={open}
            onClose={handleClose}
            message={msg}
        >
            <Alert onClose={handleClose} severity="success" action={action} >
                {msg}
            </Alert>
        </Snackbar>
    )
}

export default SuccessMessage;