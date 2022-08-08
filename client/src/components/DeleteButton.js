// Packages
import React from 'react';

// MUI Components
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';

const axios = require('axios').default;


function DeleteButton({ text, route, id, setStatus }) {
    // A delete button which opens a modal to confirm deletion.
    // Deletes the specified resource when confirmed.
    //
    // text: String - the label for the delete button
    // route: String - the URL route for the resource type (e.g. "patients" if deleting a patient)
    // id: String - the primary key for the resource to delete
    // setStatus: Function - a function returned by the setState() hook which
    //      accepts the status string upon deletion/error

    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘
    //  STATE VARIABLES
    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘

    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false); // if delete modal is open

    // delete modal:
    function handleOpen() {
        setDeleteModalOpen(true);
    }

    function handleClose() {
        setDeleteModalOpen(false);
    }

    // ∘₊✧──────✧₊∘
    //  HANDLERS
    // ∘₊✧──────✧₊∘

    function handleDelete() {
        // API DELETE request
        // route: route prop
        // id: id prop
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