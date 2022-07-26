import React from 'react';
import TableRow from './TableRow';
import TableHead from './TableHead';



function Table({ cols, rows, updateLink, deleteLink }) {
    return (
        <table>
            <thead>
                {<TableHead row={cols} />}
            </thead>
            <tbody>
                {rows.map((row, i) => {
                    return <TableRow row={row} key={i} updateLink={updateLink} deleteLink={deleteLink} />
                })}
            </tbody>
        </table>
    );
}

export default Table;