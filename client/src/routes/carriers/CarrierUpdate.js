import React from 'react';
import { Link, useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ErrorMessage from '../../components/ErrorMessage';
import SuccessMessage from '../../components/SuccessMessage';
import DeleteButton from '../../components/DeleteButton';

const axios = require('axios').default;

function CarrierUpdate() {
    // STATE VARIABLES

    const [data, setData] = React.useState({    // form data
        provider: null,
        phone_number: null
    });
    const [loaded, setLoaded] = React.useState(false);
    const [status, setStatus] = React.useState(null); // success | error | deleted

    const { carrier_ID } = useParams();


    // API FETCH REQUESTS

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


    // HANDLERS

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
                    setStatus("success");
                } else {
                    setStatus("error");
                }
            })
            .catch((err) => {
                setStatus("error");
            });
    }

    return (
        <>
            <header>
                <Link to="/carriers">{"<-"} Carriers</Link>
                <h1>Update Carrier</h1>
            </header>
            <main>
                {status === 'success' && <SuccessMessage msg="Successfully added!" setStatus={setStatus} />}
                {status === "error" && <ErrorMessage msg="An error occurred! Please try again." setStatus={setStatus} />}
                {status === 'deleted' && <SuccessMessage msg="Successfully deleted." setStatus={setStatus} />}

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
                    <DeleteButton text="Delete carrier" route="carriers" id={carrier_ID} setStatus={setStatus} />
                    <p>
                        <Button variant="text" component={Link} to="/carriers">Back</Button>
                    </p>
                </form>
            </main>
        </>
    )
}

export default CarrierUpdate;