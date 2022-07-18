import React from 'react';

function PlanSelect({ carrier, disabled }) {
    // eventually this should query the db for available plans
    // also will need to submit plan IDs with the form instead of just the name
    const aetnaPlans = ['Bronze PPO', 'HMO'];
    const bcbsPlans = ['HealthPlus'];
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