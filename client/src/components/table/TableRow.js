import React from 'react';

function TableRow({ row }) {
    return (
        <tr>
            {row.map((field, i) => {
                return <td key={i}>{field}</td>
            })}
        </tr>
    );
}
export default TableRow;