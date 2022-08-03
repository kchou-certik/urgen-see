import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { DialogContentText } from '@mui/material';

const axios = require('axios').default;

function DeleteButton({ text, route, id, setStatus }) {
    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);

    // delete modal:
    function handleOpen() {
        setDeleteModalOpen(true);
    }

    function handleClose() {
        setDeleteModalOpen(false);
    }

    // DELETE HANDLER & API CALL 
    function handleDelete() {
        axios.delete(`${process.env.REACT_APP_API}/${route}/${id}`)
            .then((res) => {
                if (res.data.affectedRows > 0) {
                    setStatus("deleted");
                } else {
                    setStatus("error");
                }
            })
            .catch((err) => {
                setStatus("error");
            });

        handleClose();
    }

    return (
        <>
            <p>
                <Button variant="outlined" color="warning" onClick={handleOpen}>{text}</Button>
            </p>
            <Dialog
                open={deleteModalOpen}
                onClose={handleClose}
                aria-labelledby="dialog-title"
                aria-describedby="dialog-desc"
            >
                <DialogTitle id="dialog-title">
                    Delete this record?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="dialog-desc">
                        Are you sure you want to delete this? This action is irreversible and may affect other entities in the database!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>Cancel</Button>
                    <Button variant="outlined" color="warning" onClick={handleDelete}>{text}</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DeleteButton;