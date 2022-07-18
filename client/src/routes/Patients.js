import React, { useState } from 'react';
import Table from '../components/table/Table'
import PlanSelect from '../components/PlanSelect'

const cols = ["mrn", "first_name", "last_name", "sex", "date_of_birth", "phone_number", "email", "address_1", "address_2", "city", "state", "postal_code", "insurance_policy", "insurance_group", "plan_ID"];

const rows = [
    [1, "Alex", "Alex", "F", "1990-01-01", "111-222-3333", "alex@alex.com", "1 1st Street", null, "New York City", "NY", "10010", "12345abc", "xyz", 1],
    [2, "Betty", "Betty", "MTF", "1980-01-01", "444-555-6666", "betty@betty.com", "2 2nd Street", "Unit 1A", "New York City", "NY", "10011", "67890def", "def", 2]
];

function Patients(props) {
    const [req, setReq] = useState(false);
    const [carrier, setCarrier] = useState("aetna");
    const [insuranceNeeded, setInsuranceNeeded] = useState(true);

    function handleSubmit(e) {
        e.preventDefault();
        alert("Submitted!");
    }

    return (
        <main>
            <header>
                <h1>Patients</h1>
            </header>
            <Table cols={cols} rows={rows} />
            <form onSubmit={handleSubmit} >
                <h2>Register Patient</h2>
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
                                <option value="aetna">Aetna</option>
                                <option value="bcbs">Blue Cross Blue Shield</option>
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
        </main >
    );
}

export default Patients;