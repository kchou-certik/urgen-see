import React from 'react';
import { Link } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import EditIcon from '@mui/icons-material/Edit';

function TableRow({ row, deleteLink, updateLink }) {
    return (
        <tr>
            <td>
                <Stack direction="row">
                    {deleteLink &&
                        <IconButton component={Link} to="#">
                            <RemoveCircleOutlineOutlinedIcon />
                        </IconButton>
                    }
                    {
                        updateLink &&
                        <IconButton component={Link} to={updateLink}>
                            <EditIcon />
                        </IconButton>
                    }
                </Stack>
            </td>
            {
                row.map((field, i) => {
                    return <td key={i}>{field}</td>
                })
            }
        </tr >
    );
}
export default TableRow;