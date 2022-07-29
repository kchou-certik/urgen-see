import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ErrorMessage from '../../components/ErrorMessage';
import DeleteButton from '../../components/DeleteButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { DialogContentText } from '@mui/material';
const axios = require('axios').default;

function CarrierUpdate() {
    const [data, setData] = React.useState({
        provider: null,
        phone_number: null
    });
    const [loaded, setLoaded] = React.useState(false);
    const [status, setStatus] = React.useState({
        message: null,
        deleted: null
    });
    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);

    const { carrier_ID } = useParams();


    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/carriers/${carrier_ID}`)
            .then((res) => {
                setLoaded(true);
                setData(res.data);    // query returns an array 
            })
            .catch((err) => {
                setLoaded(true);
                setStatus("error");
            });

    }, [carrier_ID]);

    // FORM EDIT & SUBMIT
    function handleChange(e) {
        const target = e.target;
        const name = target.name;
        setData({
            ...data,
            [name]: target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        axios.put(`${process.env.REACT_APP_API}/carriers/${carrier_ID}`, data)
            .then((res) => {
                if (res.data.affectedRows > 0) {
                    setStatus({ ...status, message: "success" });
                } else {
                    setStatus({ ...status, message: "error" });
                }
            })
            .catch((err) => {
                console.log(err);
                setStatus({ ...status, message: "error" });
            });
    }

    // DELETE MODAL
    function handleOpen() {
        setDeleteModalOpen(true);
    }

    function handleClose() {
        setDeleteModalOpen(false);
    }

    // DELETE API CALL
    function handleDelete() {
        axios.delete(`${process.env.REACT_APP_API}/carriers/${carrier_ID}`)
            .then((res) => {
                if (res.data.affectedRows > 0) {
                    setStatus({ message: "deleted", deleted: res.data.affectedRows });
                } else {
                    setStatus({ ...status, message: "error" });
                }
            })
            .catch((err) => {
                console.log(err);
                setStatus({ ...status, message: "error" });
            });

        handleClose();
    }

    return (
        <>
            <header>
                <Link to="/carriers">{"<-"} Carriers</Link>
                <h1>Update Carrier</h1>
            </header>
            <main>
                <section>
                    {
                        status.message === "success" &&
                        <Alert severity="success">Successfully updated!</Alert>
                    }
                    {
                        status.message === "error" &&
                        <ErrorMessage />
                    }
                    {
                        status.message === "deleted" &&
                        <Alert severity="info">Deleted {status.deleted} record{status.deleted > 1 ? "s" : ""}!</Alert>
                    }
                </section>
                <form onSubmit={handleSubmit} >
                    {!loaded &&
                        <h3>Loading fields...</h3>
                    }
                    {loaded &&
                        <div>
                            <p>
                                <TextField required id="name" label="Carrier Name" name="provider" value={data.provider} onChange={handleChange} />
                            </p>
                            <p>
                                <TextField type="tel" label="Phone Number" required id="phone" name="phone_number" value={data.phone_number} onChange={handleChange} />
                            </p>
                        </div>
                    }
                    <input type="submit" />
                    <p>
                        <Button variant="outlined" color="warning" onClick={handleOpen}>Delete Carrier</Button>
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
                            <DeleteButton onClick={handleClose} handleDelete={handleDelete} text="Delete Carrier" />
                        </DialogActions>
                    </Dialog>
                    <p>
                        <Button variant="text" component={Link} to="/carriers">Back</Button>
                    </p>
                </form>
            </main>
        </>
    )
}

export default CarrierUpdate;