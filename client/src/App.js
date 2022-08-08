// Packages
import React, { useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';

// Components
import PatientSearchButton from './components/PatientSearchButton';

// MUI Components
import Box from '@mui/material/Box';
import MLink from '@mui/material/Link';
import { CssBaseline } from '@mui/material';
import { Container } from '@mui/material';
import { Toolbar } from '@mui/material';
import { Button } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

// Routes
import Carriers from './routes/carriers/Carriers';
import CarrierNew from './routes/carriers/CarrierNew';
import CarrierUpdate from './routes/carriers/CarrierUpdate';
import Index from "./routes/Index";
import Patients from './routes/patients/Patients';
import PatientView from './routes/patients/PatientView';
import PatientRegistration from './routes/patients/PatientRegistration';
import PatientUpdate from './routes/patients/PatientUpdate';
import Plans from './routes/plans/Plans';
import PlanNew from './routes/plans/PlanNew';
import Staff from './routes/staff/Staff';
import StaffNew from './routes/staff/StaffNew'
import Visits from './routes/visits/Visits';
import VisitView from './routes/visits/VisitView';
import VisitNew from './routes/visits/VisitNew';
import VisitUpdate from './routes/visits/VisitUpdate';
import StaffInteractions from './routes/staffInteractions/StaffInteractions';
import InteractionNew from './routes/staffInteractions/InteractionNew';
import InteractionUpdate from './routes/staffInteractions/InteractionUpdate';

import './App.css';


function App() {

  // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘
  //  STATE VARIABLES
  // ∘₊✧──────✧₊∘∘₊✧──────✧₊∘

  // for Data Tables menu
  // from https://mui.com/material-ui/react-menu/#basic-menu
  const [menu, setMenu] = useState(null);
  const open = Boolean(menu); // if menu exists, it is open

  function handleClick(e) {
    setMenu(e.currentTarget);
  }

  function handleClose() {
    setMenu(null);
  }


  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Toolbar component="nav" variant="dense" sx={{ justifyContent: "space-between" }}>
          <MLink component={Link} to="/">Home</MLink>
          <MLink component={Link} to="/patients">Patients</MLink>
          <MLink component={Link} to="/staff">Staff</MLink>

          <Button id="data-button"
            onClick={handleClick}
            aria-controls={open ? 'data-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            Data Tables
          </Button>
          <Menu id="data-menu"
            anchorEl={menu}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'data-button',
            }}
          >
            <MenuItem component={Link} to="/visits" onClick={handleClose}>Visits</MenuItem>
            <MenuItem component={Link} to="/plans" onClick={handleClose}>Plans</MenuItem>
            <MenuItem component={Link} to="/carriers" onClick={handleClose}>Carriers</MenuItem>
            <MenuItem component={Link} to="/staff-interactions" onClick={handleClose}>Staff Interactions</MenuItem>
          </Menu>
          <PatientSearchButton />
        </Toolbar>
      </Container>
      <Container maxWidth="xl">
        <Box component="header" sx={{ textAlign: "center", my: 5 }}>
          <MLink component={Link} to="/" underline="none">
            <Typography component="h1" variant="h2"><img src="/healthIcon.png" alt="" style={{ marginRight: 5, height: 40 }} />Urgen-See</Typography>
            <Typography variant="subtitle1">Patient Scheduling</Typography>
          </MLink>
        </Box>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="patients" element={<Patients />} />
          <Route path="patients/new" element={<PatientRegistration />} />
          <Route path="patients/:mrn" element={<PatientView />} />
          <Route path="patients/:mrn/edit" element={<PatientUpdate />} />
          <Route path="visits" element={<Visits />} />
          <Route path="visits/new" element={<VisitNew />} />
          <Route path="visits/:visit_ID" element={<VisitView />} />
          <Route path="visits/:visit_ID/edit" element={<VisitUpdate />} />
          <Route path="staff" element={<Staff />} />
          <Route path="staff/new" element={<StaffNew />} />
          <Route path="carriers" element={<Carriers />} />
          <Route path="carriers/new" element={<CarrierNew />} />
          <Route path="carriers/:carrier_ID/edit" element={<CarrierUpdate />} />
          <Route path="plans" element={<Plans />} />
          <Route path="plans/new" element={<PlanNew />} />
          <Route path="staff-interactions" element={<StaffInteractions />} />
          <Route path="staff-interactions/new" element={<InteractionNew />} />
          <Route path="staff-interactions/:visit_staff_ID/edit" element={<InteractionUpdate />} />
        </Routes>
      </Container >
    </>
  );
}

export default App;
