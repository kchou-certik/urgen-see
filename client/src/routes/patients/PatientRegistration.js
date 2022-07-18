import React, { useState } from 'react';
import PlanSelect from '../../components/PlanSelect';
import { Link } from 'react-router-dom';

function PatientRegistration() {
    const [req, setReq] = useState(false);
    const [carrier, setCarrier] = useState("empireBcbs");
    const [insuranceNeeded, setInsuranceNeeded] = useState(true);

    function handleSubmit(e) {
        e.preventDefault();
        alert("Submitted!");
    }

    return (
        <>
            <header>
                <Link to="/patients">{"<-"} Patients</Link>
                <h1>Patient Registration</h1>
            </header>
            <main>
                <form onSubmit={handleSubmit} >
                    <p>MRN: 3</p>
                    <fieldset> <legend>Demographics</legend>
                        <p>
                            <label htmlFor="fname">First name
                                <input type="text" id="fname" name="first_name" />
                            </label>
                        </p>
                        <p>
                            <label htmlFor="fname">Last name
                                <input type="text" id="lname" name="last_name" />
                            </label>
                        </p>
                        <p>
                            <label htmlFor="dob">DOB
                                <input type="date" id="dob" name="date_of_birth" placeholder="MM/DD/YYYY" autoComplete="bday" />
                            </label>
                        </p>
                        <fieldset> <legend>Sex</legend>
                            <ul>
                                <li>
                                    <label htmlFor="msex">
                                        <input type="radio" id="msex" name="sex" value="M" onClick={() => setReq(false)} />Male
                                    </label>
                                </li>
                                <li>
                                    <label htmlFor="fsex">
                                        <input type="radio" id="fsex" name="sex" value="F" onClick={() => setReq(false)} />Female
                                    </label>
                                </li>
                                <li>
                                    <label htmlFor="osex">
                                        <input type="radio" id="osex" name="sex" value="" onClick={() => setReq(true)} />Other
                                        <input type="text" name="sex" required={req} disabled={!req} />
                                    </label>
                                </li>
                            </ul>
                        </fieldset>
                    </fieldset>
                    <fieldset> <legend>Contact Info</legend>
                        <p>
                            <label htmlFor="phone">
                                Phone number
                                <input type="tel" name="phone_number" id="phone" />
                            </label>
                        </p>
                        <p>
                            <label htmlFor="email">
                                Email
                                <input type="email" id="email" name="email" />
                            </label>
                        </p>
                        <fieldset> <legend>Address</legend>
                            <p>
                                <label htmlFor="addr1">
                                    Address Field 1
                                    <input type="text" id="addr1" autoComplete="address-line1" name="address_1" />
                                </label>
                            </p>
                            <p>
                                <label htmlFor="addr2">
                                    Address Field 2
                                    <input type="text" id="addr2" autoComplete="address-line2" name="address_2" />
                                </label>
                            </p>
                            <p>
                                <label htmlFor="city">
                                    City
                                    <input type="text" id="city" autoComplete="address-level2" name="city" />
                                </label>
                            </p>
                            <p>
                                <label htmlFor="state">
                                    State/Province
                                    <input type="text" id="state" autoComplete="address-level1" name="state" />
                                </label>
                            </p>
                            <p>
                                <label htmlFor="post">
                                    Postal Code
                                    <input type="text" id="post" autoComplete="postal-code" name="postal_code" />
                                </label>
                            </p>
                        </fieldset>
                    </fieldset>
                    <fieldset> <legend>Primary Insurance</legend>
                        <p>
                            <label htmlFor="selfpay">
                                <input type="checkbox" id="selfpay" onChange={(e) => setInsuranceNeeded(!e.target.checked)} />
                                Self-pay / Uninsured
                            </label>
                        </p>
                        <p>
                            <label htmlFor="inspolicy">
                                Policy ID
                                <input type="text" id="inspolicy" name="insurance_policy" disabled={!insuranceNeeded} />
                            </label>
                        </p>
                        <p>
                            <label htmlFor="insgrp">
                                Policy ID
                                <input type="text" id="insgrp" name="insurance_group" disabled={!insuranceNeeded} />
                            </label>
                        </p>
                        <p>
                            <label htmlFor="inscarrier">
                                Insurance Carrier
                                <select id="inscarrier" name="carrier" value={carrier} onChange={(e) => setCarrier(e.target.value)} disabled={!insuranceNeeded}>
                                    <option value="empireBcbs">Empire BCBS</option>
                                    <option value="aetna">Aetna</option>
                                </select>
                            </label>
                        </p>
                        <p>
                            <label htmlFor="insplan">
                                Insurance Plan
                                <PlanSelect carrier={carrier} disabled={!insuranceNeeded} />
                            </label>
                        </p>
                    </fieldset>
                    <input type="submit" />
                </form>
            </main>
        </>
    )
}

export default PatientRegistration;