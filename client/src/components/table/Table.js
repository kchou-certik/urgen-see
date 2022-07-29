import React from 'react';
import TableRow from './TableRow';
import TableHead from './TableHead';
import MUITable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

function Table({ cols, rows, updatable, pKey }) {
    // TODO: might need to remove this. Checks if we're using "hardcoded" table header names/data
    if (rows.length === 0) {
        return (
            <Alert severity="info">
                <AlertTitle>No Data</AlertTitle>
                There are currently no entries in this table.
            </Alert>
        )
    }

    cols = isNaN(Object.keys(rows[0])[0]) ? Object.keys(rows[0]) : cols;

    return (
        <TableContainer component={Paper}>
            <MUITable sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead row={cols} />
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