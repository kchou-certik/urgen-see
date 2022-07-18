import React from 'react';

function PlanSelect({ carrier, disabled }) {
    // eventually this should query the db for available plans
    // also will need to submit plan IDs with the form instead of just the name
    const aetnaPlans = ['Elect Choice EPO', 'HMO', 'NYC Community Plan', 'Select'];
    const bcbsPlans = ['Anthem BCBS', 'BCBS of Illinois', 'BCBS of California'];
    const plans = carrier === 'aetna' ? aetnaPlans : bcbsPlans;

    return (
        <select name="plan" id="insplan" disabled={disabled}>
            {plans.map((plan, i) => {
                return <option key={i} value={plan}>{plan}</option>
            })}
        </select>
    )
}

export default PlanSelect;