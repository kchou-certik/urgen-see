import React from 'react';
import { Link } from 'react-router-dom';
import Table from '../../components/table/Table';

function Plans(props) {
    const cols = ["plan_ID", "referral_required", "carrier_ID", "carrier.name", "name"];
    const rows = [
        [1, 1, 1, "Empire BCBS", "HealthPlus"],
        [2, 0, 2, "Aetna", "Bronze PPO"],
        [3, 1, 2, "Aetna", "HMO"]
    ]

    return (
        <>
            <header>
                <Link to="/carriers">{"<- "}Carriers</Link>
                <h1>Insurance Plans</h1>
            </header>
            <main>
                <Link to="/plans/new">Add a Plan</Link>
                <Table cols={cols} rows={rows} />
            </main>
        </>

    );
}

export default Plans;