import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import EditIcon from '@mui/icons-material/Edit';
import MUITableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

function TableRow({ options, row, pKey, header, updatable, clickable }) {
    const navigate = useNavigate();

    // ∘₊✧──────✧₊∘
    //  HANDLERS
    // ∘₊✧──────✧₊∘

    function handleClick(urlPrefix) {
        navigate(`${urlPrefix}`);
    }

    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘∘₊✧──────✧₊∘∘₊✧──────✧₊∘∘₊✧──────✧₊∘∘₊✧──────✧₊∘∘₊✧──────✧₊∘∘₊✧──────✧
    // Break down `row` objects into just an array of values which we can feed into our table cells
    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘∘₊✧──────✧₊∘∘₊✧──────✧₊∘∘₊✧──────✧₊∘∘₊✧──────✧₊∘∘₊✧──────✧₊∘∘₊✧──────✧

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


    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘∘₊✧──────✧₊∘∘₊✧──────✧₊∘∘₊✧──────✧₊∘∘₊✧──────✧
    // Generate a URL prefix that we can use to link to edit/view routes
    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘∘₊✧──────✧₊∘∘₊✧──────✧₊∘∘₊✧──────✧₊∘∘₊✧──────✧

    // get ID that matches pKey string
    let urlPrefix;
    if (clickable || updatable) {
        const idPair = pairs.filter(([key, val]) => key === pKey)[0];  // filter() returns an array of results - there should only be 1 so we take the 0th
        const id = idPair[1];

        // generate the URL slug prefix that we can use for individual CRUD links
        if (updatable && pKey) {

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
                    urlPrefix = `/staff-interactions/${id}`
                    break;
                default:
                    urlPrefix = "404"
            }
        }
    }

    return (
        <MUITableRow sx={clickable && { cursor: "pointer" }} hover={clickable}>
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
                        <TableCell key={i} onClick={clickable && (() => handleClick(urlPrefix))} >{field}</TableCell>
                    )
                })
            }
        </MUITableRow >
    );
}
export default TableRow;