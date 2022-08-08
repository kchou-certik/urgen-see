// MUI Components
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

function Loading() {
    // A circular loading indicator, centered to look nice


    return (
        <Box sx={{ mt: 3, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            <CircularProgress sx={{ mt: 10 }} />
        </Box>
    )
}

export default Loading;