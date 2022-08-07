import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

function Loading() {
    return (
        <Box sx={{ mt: 3, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            <CircularProgress sx={{ mt: 10 }} />
        </Box>
    )
}

export default Loading;