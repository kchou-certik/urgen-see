import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';

function CarrierUpdate() {
    function handleSubmit(e) {
        e.preventDefault();
        alert("Submitted!");
    }

    return (
        <>
            <header>
                <Link to="/carriers">{"<-"} Carriers</Link>
                <h1>Update Carrier</h1>
                <p>
                    <h2><em>[SAMPLE DATA]</em></h2>
                </p>
            </header>
            <main>
                <form onSubmit={handleSubmit} >
                    <fieldset> <legend>Carrier Details</legend>
                        <p>
                            <label htmlFor="name">
                                Carrier Name
                                <input type="text" id="name" name="name" placeholder="Empire BCBS" />
                            </label>
                        </p>
                        <p>
                            <label htmlFor="phone">
                                Phone Number
                                <input type="tel" id="phone" name="phone_number" placeholder="800-888-8888" />
                            </label>
                        </p>
                    </fieldset>
                    <input type="submit" />
                    <p>
                        <Button variant="outlined" color="warning" component={Link} to="#">Delete Carrier</Button>
                    </p>
                </form>
            </main>
        </>
    )
}

export default CarrierUpdate;