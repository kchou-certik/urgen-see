import React from 'react';

function TableHead({ row }) {
    return (
        <tr>
            {row.map((field, i) => {
                return <th key={i}>{field}</th>
            })}
        </tr>
    );
}
export default TableHead;