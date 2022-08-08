// ∘₊✧──────✧₊∘∘₊✧──────✧₊∘
//  TODO Unused route
// ∘₊✧──────✧₊∘∘₊✧──────✧₊∘
// New interactions are created when creating/updating Visits

// Packages
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function InteractionNew() {

    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘
    //  STATE VARIABLES
    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘

    const [staff, setStaff] = useState();

    // ∘₊✧──────✧₊∘
    //  HANDLERS
    // ∘₊✧──────✧₊∘

    function handleSubmit(e) {
        e.preventDefault();
        alert("Submitted!");
    }

    return (
        <>
            <header>
                <Link to="/staff-interactions">{"<-"} Interactions</Link>
                <h1>New Patient-Staff Visit Interaction</h1>
                <section>
                    <p>
                        <h2>Betty, Betty</h2>
                        <em>Last Name, First Name</em>
                    </p>
                    <p>
                        <strong>DOB: 01/01/1980</strong>
                        <br />
                        <strong>MRN: 2</strong>
                    </p>
                    <p>
                        <h2><em>[SAMPLE DATA]</em></h2>
                    </p>
                </section>
            </header>
            <main>
                <p>Visit ID: 2</p>
                <p>Visit Date: 10/07/2022</p>
                <form onSubmit={handleSubmit} >
                    <fieldset> <legend>Add Staff Member to Visit</legend>
                        <p>
                            <label htmlFor="staff">
                                Staff Member
                                <select id="staff" name="staff" value={staff} onChange={(e) => setStaff(e.target.value)}>
                                    <option value="1">Doolittle, John, MD</option>
                                    <option value="2">Nightingale, Florence, RN</option>
                                    <option value="3">Billingson, Bill, PA</option>
                                </select>
                            </label>
                        </p>
                    </fieldset>
                    <input type="submit" />
                </form>
            </main>
        </>
    )
}

export default InteractionNew;