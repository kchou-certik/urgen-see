import React from 'react';

function TableHead({ row }) {
    return (
        <tr>
            {row.map((field) => {
                return <th>{field}</th>
            })}
        </tr>
    );
}
export default TableHead;