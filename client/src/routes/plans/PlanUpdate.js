// ∘₊✧──────✧₊∘∘₊✧──────✧₊∘
//  TODO Unused route
// ∘₊✧──────✧₊∘∘₊✧──────✧₊∘

// Packages
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// MUI Components
import Button from '@mui/material/Button';

// Icons
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

function PlanUpdate() {
    const navigate = useNavigate();

    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘
    //  STATE VARIABLES
    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘

    const [referral, setReferral] = useState(0);

    // ∘₊✧──────✧₊∘
    //  HANDLERS
    // ∘₊✧──────✧₊∘

    function handleSubmit(e) {
        e.preventDefault();
        alert("Submitted!");
    }

    function handleCheck(e) {
        setReferral(!referral);
    }

    return (
        <>
            <header>
                <Button onClick={() => navigate(-1)}><ArrowBackOutlinedIcon sx={{ mr: 0.5, mb: 0.2 }} /> Back</Button>
                <h1>Update Plan</h1>
                <p>
                    <h2><em>[SAMPLE DATA]</em></h2>
                </p>
            </header>
            <main>
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
                                <input type="text" id="name" name="name" placeholder="HealthPlus" />
                            </label>
                        </p>
                        <p>
                            <label htmlFor="refreq">
                                <input type="checkbox" checked={!referral} id="refreq" name="referral_required" value={!referral} onClick={handleCheck} />
                                Referral required
                            </label>
                        </p>
                    </fieldset>
                    <input type="submit" />
                </form>
                <p>
                    <Button variant="outlined" color="warning" component={Link} to="#">Delete Plan</Button>
                </p>
            </main>
        </>
    )
}

export default PlanUpdate;