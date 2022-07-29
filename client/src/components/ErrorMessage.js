import React from 'react';
import Alert from '@mui/material/Alert';

function ErrorMessage() {
    return (
        <Alert severity="error">There was an error processing your request. Please try again!</Alert>
    )
}

export default ErrorMessage;