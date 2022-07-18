import React from 'react';
import { Link } from 'react-router-dom';

function CarrierNew() {
    function handleSubmit(e) {
        e.preventDefault();
        alert("Submitted!");
    }

    return (
        <>
            <header>
                <Link to="/carriers">{"<-"} Carriers</Link>
                <h1>New Insurance Carrier</h1>
            </header>
            <main>
                <p>Plan ID: 3 (for internal use)</p>
                <form onSubmit={handleSubmit} >
                    <fieldset> <legend>Carrier Details</legend>
                        <p>
                            <label htmlFor="name">
                                Carrier Name
                                <input type="text" id="name" name="name" />
                            </label>
                        </p>
                        <p>
                            <label htmlFor="phone">
                                Phone Number
                                <input type="tel" id="phone" name="phone_number" />
                            </label>
                        </p>
                    </fieldset>
                    <input type="submit" />
                </form>
            </main>
        </>
    )
}

export default CarrierNew;