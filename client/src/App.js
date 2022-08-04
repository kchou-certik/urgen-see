import React, { useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Carriers from './routes/carriers/Carriers';
import CarrierNew from './routes/carriers/CarrierNew';
import CarrierUpdate from './routes/carriers/CarrierUpdate';
import Index from "./routes/Index";
import Patients from './routes/patients/Patients';
import PatientRegistration from './routes/patients/PatientRegistration';
import PatientUpdate from './routes/patients/PatientUpdate';
import PatientSearch from './routes/patients/PatientSearch';
import Plans from './routes/plans/Plans';
import PlanNew from './routes/plans/PlanNew';
import PlanUpdate from './routes/plans/PlanUpdate';
import Staff from './routes/staff/Staff';
import StaffNew from './routes/staff/StaffNew'
import StaffUpdate from './routes/staff/StaffUpdate'
import Visits from './routes/visits/Visits';
import VisitNew from './routes/visits/VisitNew';
import VisitUpdate from './routes/visits/VisitUpdate';
import StaffInteractions from './routes/staffInteractions/StaffInteractions';
import InteractionNew from './routes/staffInteractions/InteractionNew';
import InteractionUpdate from './routes/staffInteractions/InteractionUpdate';

import './App.css';

import MLink from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import { CssBaseline } from '@mui/material';
import { Container } from '@mui/material';
import { Toolbar } from '@mui/material';
import { Button } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

function App() {
  const [menu, setMenu] = useState(null);
  const open = Boolean(menu);

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

          <Button component={Link} to="/patients/search" variant="outlined" endIcon={<PersonSearchIcon />}>
            Search
          </Button>
        </Toolbar>
      </Container>
      <Paper variant="outlined" sx={{ pt: "2em", pb: "4em", mt: "1em" }}>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="patients" element={<Patients />} />
            <Route path="patients/new" element={<PatientRegistration />} />
            <Route path="patients/:mrn/edit" element={<PatientUpdate />} />
            <Route path="patients/search" element={<PatientSearch />} />
            <Route path="visits" element={<Visits />} />
            <Route path="visits/new" element={<VisitNew />} />
            <Route path="visits/test/edit" element={<VisitUpdate />} />
            <Route path="staff" element={<Staff />} />
            <Route path="staff/new" element={<StaffNew />} />
            <Route path="staff/test/edit" element={<StaffUpdate />} />
            <Route path="carriers" element={<Carriers />} />
            <Route path="carriers/new" element={<CarrierNew />} />
            <Route path="carriers/:carrier_ID/edit" element={<CarrierUpdate />} />
            <Route path="plans" element={<Plans />} />
            <Route path="plans/new" element={<PlanNew />} />
            <Route path="plans/test/edit" element={<PlanUpdate />} />
            <Route path="staff-interactions" element={<StaffInteractions />} />
            <Route path="staff-interactions/new" element={<InteractionNew />} />
            <Route path="staff-interactions/:visit_staff_ID/edit" element={<InteractionUpdate />} />
          </Routes>
        </Container >
      </Paper>
    </>
  );
}

export default App;
