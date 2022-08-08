// Packages
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// MUI Components
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import MUITableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';


function TableRow({ options, row, pKey, updatable, clickable }) {
    /**Creates a MUI TableRow dynamically. To be used as part of Table/TableHeader components.
     * 
     * Props are passed down from Table/TableRow
     * options: Object - used to rename or hide columns/data
     *      - e.g. {"first_name": "First Name", "mrn": false} will rename first_name and hide mrn
     * row: Object - key=column name, value=data; for TableHeader (possible parent component), this is an Array of column names
     * pKey: String - the name of the primary key (e.g. for Patients, pKey="mrn"); used for determining where to route for edit/view links
     * updatable: Bool - if True (you don't need to assign True to the prop actually, just have it present), rows will generate with an edit button linking to /edit
     * clickable: Bool - if True (same as above - can just have the prop present), rows will link to the View routes for individual records
     */

    const navigate = useNavigate();

    // ∘₊✧──────✧₊∘
    //  HANDLERS
    // ∘₊✧──────✧₊∘

    function handleClick(urlPrefix) {
        // urlPrefix is `route/id` and will go to the view page for the resource
        navigate(`${urlPrefix}`);
    }

    // Break down row objects into an array of values we can display in our table cells
    // This array must be filtered to remove those that the options turn off
    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘∘₊✧──────✧₊∘∘₊✧──────✧₊∘∘₊✧──────✧₊∘∘₊✧──────✧₊∘∘₊✧──────✧₊∘

    // 1. convert object into an array of key-value pairs
    const pairs = Object.entries(row); // e.g. [[key1, value1], ...etc];

    // Note: The below filter/pair shenanigans should all still work with the TableHeader > TableRow

    // 2. remove fields which are `false` in options; unspecified fields are maintained
    const rowFiltered = pairs.filter((pair) => {
        // filter() checks each pair to see which to keep
        return !(options.hasOwnProperty(pair[0])) || options[pair[0]] !== false;
        // i.e. keep the pair IF the `options` object does not contain this key OR the option specified is not false
        // i.e. remove the pair IF the `options` object contains this key AND the option specified is false
    });

    // 3. convert the pair array to an array of just the data values
    const rowFields = rowFiltered.map((pair) => {
        return pair[1];
    })

    // Generate a URL prefix that we can use to link to edit/view routes
    // Only necessary if clickable/updatable
    // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘∘₊✧──────✧₊∘∘₊✧──────✧₊∘∘₊✧──────✧₊∘∘₊✧──────✧₊∘∘₊✧──────✧₊∘

    // 1. get ID that matches pKey string
    let urlPrefix;

    if (clickable || updatable) {   // this should ignore header rows (which shouldn't be clickable nor updatable)
        // trying to process header rows with the following will cause issues as they by nature don't have a pKey
        const idPair = pairs.filter(([key, val]) => key === pKey)[0];  // filter() returns an array of results - there should only be 1 so we take the 0th
        const id = idPair[1];

        // 2. generate the URL slug prefix that we can use for individual CRUD links

        switch (pKey) { // uses pKey to determine the route
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