import React from 'react';

import MUITableHead from '@mui/material/TableHead';
import TableRow from './TableRow';

function TableHead({ row }) {
    return (
        // <tr>
        //     <th>

        //     </th>
        //     
        // </tr>
        <MUITableHead>
            <TableRow row={row} />
        </MUITableHead>
    );
}
export default TableHead;