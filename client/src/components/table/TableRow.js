import React from 'react';
import { Link } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import EditIcon from '@mui/icons-material/Edit';
import MUITableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

function TableRow({ row, pKey, updatable }) {
    const rowFields = Object.values(row);

    // converts objects into an array of sub-arrays, each one corresponding to a key-val pair
    const pairs = Object.entries(row);

    let idPair, id, urlPrefix;

    if (updatable && pKey) {
        // filters pairs to get the one(s) that correspond to the pKey (by comparing key with pKey name string passed down from above)

        switch (pKey) {
            case "carrier_ID":
                // Copy-paste below lines for each case when GET API route is implemented; can move it out of these cases once we stop using sample data
                idPair = pairs.filter((pair) => pair[0] === pKey)[0];
                id = idPair[1];

                urlPrefix = `/carriers/${id}`;
                break;
            case "mrn":
                // Copy-paste below lines for each case when GET API route is implemented; can move it out of these cases once we stop using sample data
                idPair = pairs.filter((pair) => pair[0] === pKey)[0];
                id = idPair[1];

                urlPrefix = `/patients/${id}`;
                break;
            default:
                urlPrefix = "test"
        }
    }

    return (
        <MUITableRow>
            <TableCell padding="checkbox">
                <Stack direction="row">
                    {
                        updatable &&
                        <IconButton component={Link} to={`${urlPrefix}/edit`}>
                            <EditIcon />
                        </IconButton>
                    }
                </Stack>
            </TableCell>
            {
                rowFields.map((field, i) => {
                    return (
                        <TableCell key={i}>{field}</TableCell>
                    )
                })
            }
        </MUITableRow>
    );
}
export default TableRow;