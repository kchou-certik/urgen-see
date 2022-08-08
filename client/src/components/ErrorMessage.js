// Packages
import React from 'react';

// MUI Components
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';

// Icons
import CloseIcon from '@mui/icons-material/Close';


function ErrorMessage({ msg, setStatus }) {
    // An error message MUI snackbar notification
    //
    // msg: String - the text to display on the message
    // setStatus: Function - a function returned by the setState() hook which
    //      accepts status strings like "success" and "error"

    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘
    //  STATE VARIABLES
    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘

    const [open, setOpen] = React.useState(true);   // if notification is open (i.e. displayed)

    // ∘₊✧──────✧₊∘
    //  HANDLERS
    // ∘₊✧──────✧₊∘

    // From: https://mui.com/material-ui/react-snackbar/#simple-snackbars
    function handleClose(e, reason) {
        // disable clickaway dismissal of notification to ensure user doesn't accidentally miss it
        if (reason === 'clickaway') return;
        setOpen(false);     // close notif
        setStatus(null);    // remove "error" status from parent component
    };

    // action buttons to nest inside Snackbar notif
    const action = (
        <>
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
            autoHideDuration={10000}
            onClose={handleClose}
            action={action}
        >
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {msg}
            </Alert>
        </Snackbar>
    )
}

export default ErrorMessage;