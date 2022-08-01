import React from 'react';
import { Link } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import EditIcon from '@mui/icons-material/Edit';
import MUITableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

function TableRow({ options, row, pKey, updatable }) {
    const pairs = Object.entries(row); // e.g. [[key1, value1], ...etc];
    // The below filter/pair shenanigans should all still work with the header TableRow, even though `row` is an array instead of object
    // Object.entries() converts the array into similar pairs but with the keys being array indices

    // remove fields which are `false` in options; unspecified fields are maintained
    const rowFiltered = pairs.filter((pair) => {
        return !(options.hasOwnProperty(pair[0])) || options[pair[0]] !== false;
    });

    // convert the pair array to an array of just the data values
    const rowFields = rowFiltered.map((pair) => {
        return pair[1];
    })

    // generate the edit URL for rows designated `updatable`
    let idPair, id, urlPrefix;
    if (updatable && pKey) {

        // filters pairs to get the one(s) that correspond to the pKey (by comparing key with pKey name string passed down from above)
        idPair = pairs.filter((pair) => pair[0] === pKey)[0];
        id = idPair[1];

        switch (pKey) {
            case "carrier_ID":
                urlPrefix = `/carriers/${id}`;
                break;
            case "mrn":
                urlPrefix = `/patients/${id}`;
                break;
            case "staff_ID":
                urlPrefix = `/staff/${id}`;
                break;
            case "plan_ID":
                urlPrefix = `/plans/${id}`;
                break;
            case "visit_ID":
                urlPrefix = `/visits/${id}`;
                break;
            case "visit_staff_ID":
                urlPrefix = `/interactions/${id}`
                break;
            default:
                urlPrefix = "404"
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