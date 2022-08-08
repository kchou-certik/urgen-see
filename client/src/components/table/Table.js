import React from 'react';
import TableRow from './TableRow';
import TableHead from './TableHead';
import MUITable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

function Table({ options, rows, updatable, pKey, clickable }) {
    /**Builds a MUI Table using parameters given to it, intended for use with data received from API
     * 
     * options: Object - use this to rename or hide columns/data
     *   - e.g. {"first_name": "First Name", "mrn": false} will rename first_name and hide mrn
     * rows: Array[Object] - data received from the API; each row of data is an object where key=column name, value=data
     *   - the first "row" corresponds to the column names (i.e. table headers), where key=index of array
     * updatable: Bool - if True (you don't need to assign True to the prop actually, just have it present), rows will generate with an edit button linking to /edit
     * clickable: Bool - if True (same as above - can just have the prop present), rows will link to the View routes for individual records
     * pKey: String - the name of the primary key (e.g. for Patients, pKey="mrn"); used for determining where to route for edit/view links
     */

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
    // Define these by passing an object options to the Table component
    // e.g. const options = {first_name: "First Name", ...}
    // `false` properties will be hidden!
    cols = cols.filter((col) => {
        return !(options.hasOwnProperty(col)) || options[col] !== false;
    }).map((col) => {
        return options.hasOwnProperty(col) ? options[col] : col;
    });

    return (
        <TableContainer component={Paper}>
            <MUITable sx={{ width: "100%" }} aria-label="simple table">
                <TableHead options={options} row={cols} />
                <TableBody>
                    {rows.map((row, i) => {
                        return <TableRow options={options} row={row} key={i} pKey={pKey} clickable={clickable} updatable={updatable} />
                    })}
                </TableBody>
            </MUITable>
        </TableContainer>
    );
}

export default Table;