import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';

import CloseIcon from '@mui/icons-material/Close';

function ErrorMessage({ msg }) {
    const [open, setOpen] = React.useState(true);

    function handleClose(e, reason) {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

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