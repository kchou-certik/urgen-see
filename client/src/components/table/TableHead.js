// Packages
import React from 'react';

// Components
import TableRow from './TableRow';

// MUI Components
import MUITableHead from '@mui/material/TableHead';


function TableHead({ options, row }) {
    /**Creates a MUI table header using TableRow. To be used for Table components.
     * 
     * options: Object - passed down from Table
     * row: Array - passed down from Table, an array of column names
     */

    return (
        <MUITableHead>
            <TableRow options={options} row={row} />
        </MUITableHead>
    );
}
export default TableHead;