import React from 'react';
import { Link } from 'react-router-dom';

function PlanNew() {
    function handleSubmit(e) {
        e.preventDefault();
        alert("Submitted!");
    }

    return (
        <>
            <header>
                <Link to="/plans">{"<-"} Plans</Link>
                <h1>New Insurance Plan</h1>
            </header>
            <main>
                <p>Plan ID: 4 (for internal use)</p>
                <form onSubmit={handleSubmit} >
                    <fieldset> <legend>Plan Details</legend>
                        <p>
                            <label htmlFor="inscarrier">
                                Insurance Carrier
                                <select id="inscarrier" name="carrier">
                                    <option value="empireBcbs">Empire BCBS</option>
                                    <option value="aetna">Aetna</option>
                                </select>
                            </label>
                        </p>
                        <p>
                            <label htmlFor="name">
                                Plan Name
                                <input type="text" id="name" name="name" />
                            </label>
                        </p>
                        <p>
                            <label htmlFor="refreq">
                                <input type="checkbox" id="refreq" name="referral_required" />
                                Referral required
                            </label>
                        </p>
                    </fieldset>
                    <input type="submit" />
                </form>
            </main>
        </>
    )
}

export default PlanNew;