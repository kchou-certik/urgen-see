import React from 'react';

function TableRow({ row }) {
    return (
        <tr>
            {row.map((field) => {
                return <td>{field}</td>
            })}
        </tr>
    );
}
export default TableRow;