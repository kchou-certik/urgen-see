import React from 'react';
import TableRow from './TableRow';
import TableHead from './TableHead';
import MUITable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

function Table({ colNames, rows, updatable, pKey }) {
    if (rows.length === 0) {
        return (
            <Alert severity="info">
                <AlertTitle>No Entries</AlertTitle>
                There are no entries to display yet.
            </Alert>
        )
    }

    // Pulls column names out of the db query result
    // Each row in the array returned by query is an object, where key=column_name
    let cols = Object.keys(rows[0]);

    // Maps custom, user friendly column names to corresponding table data, if it matches
    // Define these by passing an object colNames to the Table component
    // e.g. const colNames = {first_name: "First Name", ...}
    cols = cols.map((col) => colNames[col] ? colNames[col] : col);

    return (
        <TableContainer component={Paper}>
            <MUITable sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead row={cols} colNames={colNames} />
                <TableBody>
                    {rows.map((row, i) => {
                        return <TableRow row={row} key={i} updatable={updatable} pKey={pKey} />
                    })}
                </TableBody>
            </MUITable>
        </TableContainer>
    );
}

export default Table;