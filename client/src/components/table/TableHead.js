import React from 'react';

import MUITableHead from '@mui/material/TableHead';
import TableRow from './TableRow';

function TableHead({ options, row }) {
    return (
        <MUITableHead>
            <TableRow options={options} row={row} />
        </MUITableHead>
    );
}
export default TableHead;