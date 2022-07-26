import React from 'react';

function TableHead({ row }) {
    return (
        <tr>
            <th>

            </th>
            {row.map((field, i) => {
                return <th key={i}>{field}</th>
            })}
        </tr>
    );
}
export default TableHead;