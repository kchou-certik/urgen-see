import React from 'react';
import TableRow from './TableRow';
import TableHead from './TableHead';
import MUITable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';



// function Table({ cols, rows, updateLink, deleteLink }) {
//     return (
//         <table>
//             <thead>
//                 {<TableHead row={cols} />}
//             </thead>
//             <tbody>
//                 {rows.map((row, i) => {
//                     return <TableRow row={row} key={i} updateLink={updateLink} deleteLink={deleteLink} />
//                 })}
//             </tbody>
//         </table>
//     );
// }

function Table({ cols, rows, updateLink, deleteLink }) {
    return (
        <TableContainer component={Paper}>
            <MUITable sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead row={cols} />
                <TableBody>
                    {rows.map((row, i) => {
                        return <TableRow row={row} key={i} updateLink={updateLink} deleteLink={deleteLink} />
                    })}
                </TableBody>
            </MUITable>
        </TableContainer>
    );
}

export default Table;