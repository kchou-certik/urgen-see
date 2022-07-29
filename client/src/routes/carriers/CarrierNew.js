import React from 'react';
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
const axios = require('axios').default;

function CarrierNew() {
    const [data, setData] = React.useState({
        provider: "",
        phone_number: ""
    });

    const [status, setStatus] = React.useState(null);

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

        axios.post(`${process.env.REACT_APP_API}/carriers`, data)
            .then((res) => {
                setStatus("success");
            })
            .catch((err) => {
                setStatus("error");
            });
    }

    return (
        <>
            <header>
                <Link to="/carriers">{"<-"} Carriers</Link>
                <h1>New Insurance Carrier</h1>
            </header>
            <main>
                <section>
                    {
                        status === "success" &&
                        <Alert severity="success">Successfully added!</Alert>
                    }
                    {
                        status === "error" &&
                        <Alert severity="error">There was an error processing your request. Please try again!</Alert>
                    }
                </section>
                <form onSubmit={handleSubmit} >
                    <fieldset> <legend>Carrier Details</legend>
                        <p>
                            <label htmlFor="name">
                                Carrier Name
                                <input type="text" required id="name" name="provider" value={data.provider} onChange={handleChange} />
                            </label>
                        </p>
                        <p>
                            <label htmlFor="phone">
                                Phone Number
                                <input type="tel" required id="phone" name="phone_number" value={data.phone_number} onChange={handleChange} />
                            </label>
                        </p>
                    </fieldset>
                    <input type="submit" />
                </form>
                <Button variant="text" component={Link} to="/carriers">Back</Button>
            </main>
        </>
    )
}

export default CarrierNew;