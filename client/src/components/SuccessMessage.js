// Packages
import React from 'react';
import { useNavigate } from 'react-router-dom';

// MUI Components
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

// Icons
import CloseIcon from '@mui/icons-material/Close';


function SuccessMessage({ msg, setStatus }) {
    // A success message MUI snackbar notification
    //
    // msg: String - the text to display on the message
    // setStatus: Function - a function returned by the setState() hook which
    //      accepts status strings like "success" and "error"

    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘
    //  STATE VARIABLES
    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘

    const navigate = useNavigate();
    const [open, setOpen] = React.useState(true);   // if notification is open (i.e. displayed)

    // ∘₊✧──────✧₊∘
    //  HANDLERS
    // ∘₊✧──────✧₊∘

    function handleClose(e, reason) {
        setOpen(false);     // close notif
        setStatus(null);    // remove "success" status from parent component
    };

    // action buttons to nest inside Snackbar notif
    // BACK button pops the browser history stack
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