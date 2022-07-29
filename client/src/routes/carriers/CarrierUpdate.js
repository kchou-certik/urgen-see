import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import ErrorMessage from '../../components/ErrorMessage';
const axios = require('axios').default;

function CarrierUpdate() {
    const [data, setData] = React.useState({
        provider: null,
        phone_number: null
    });

    const [loaded, setLoaded] = React.useState(false);

    const [status, setStatus] = React.useState("loading");
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
        console.log(data);

        axios.put(`${process.env.REACT_APP_API}/carriers/${carrier_ID}`, data)
            .then((res) => {
                if (res.data.affectedRows > 0) {
                    setStatus("success");
                } else {
                    setStatus("error");
                }
            })
            .catch((err) => {
                console.log(err);
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
                <section>
                    {
                        status === "success" &&
                        <Alert severity="success">Successfully updated!</Alert>
                    }
                    {
                        status === "error" &&
                        <ErrorMessage />
                    }
                </section>
                <form onSubmit={handleSubmit} >
                    {!loaded &&
                        <h3>Loading fields...</h3>
                    }
                    {loaded &&
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
                    }
                    <input type="submit" />
                    <p>
                        <Button variant="outlined" color="warning" component={Link} to="#">Delete Carrier</Button>
                    </p>
                    <p>
                        <Button variant="text" component={Link} to="/carriers">Back</Button>
                    </p>
                </form>
            </main>
        </>
    )
}

export default CarrierUpdate;