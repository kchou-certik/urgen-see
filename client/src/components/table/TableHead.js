import React from 'react';

import MUITableHead from '@mui/material/TableHead';
import TableRow from './TableRow';

function TableHead({ row }) {
    return (
        <MUITableHead>
            <TableRow row={row} />
        </MUITableHead>
    );
}
export default TableHead;