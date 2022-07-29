import React from 'react';
import Button from '@mui/material/Button';

function DeleteButton({ text, handleDelete }) {
    return (
        <Button variant="outlined" color="warning" onClick={handleDelete}>{text}</Button>
    )
}

export default DeleteButton;