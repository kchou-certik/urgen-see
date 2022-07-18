import React from 'react';
import { Link } from 'react-router-dom';
import Table from '../../components/table/Table';

function Carriers(props) {
    const cols = ["carrier_ID", "phone_number", "name"];
    const rows = [
        [1, "800-888-8888", "Empire BCBS"],
        [2, "800-111-1111", "Aetna"]
    ]

    return (
        <>
            <header>
                <h1>Insurance Carriers</h1>
            </header>
            <main>
                <Link to="/carriers/new">Add a Carrier</Link>
                <Table cols={cols} rows={rows} />
            </main>
        </>

    );
}

export default Carriers;