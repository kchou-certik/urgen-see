import React from 'react';
import TableRow from './TableRow';
import TableHead from './TableHead';



function Table({ cols, rows }) {
    return (
        <table>
            <thead>
                {<TableHead row={cols} />}
            </thead>
            <tbody>
                {rows.map((row) => {
                    return <TableRow row={row} />
                })}
            </tbody>
        </table>
    );
}

export default Table;