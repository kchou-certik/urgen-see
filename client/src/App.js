import React from 'react';
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
import { CssBaseline } from '@mui/material';
import { Container } from '@mui/material';
import { Toolbar } from '@mui/material';
import { Button } from '@mui/material';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl">
        <Toolbar component="nav" variant="dense" sx={{ justifyContent: "space-between" }}>
          <Link to="/">Home</Link>
          <Link to="/patients">Patients</Link>
          <Link to="/visits">Visits</Link>
          <Link to="/staff">Staff</Link>
          <Link to="/plans">Plans</Link>
          <Link to="/carriers">Carriers</Link>
          <Link to="/staff-interactions">Staff Interactions</Link>
          <Button component={Link} to="/patients/search" variant="outlined" endIcon={<PersonSearchIcon />}>
            Search
          </Button>
        </Toolbar>
      </Container>
      <Container maxWidth="xl">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="patients" element={<Patients />} />
          <Route path="patients/new" element={<PatientRegistration />} />
          <Route path="patients/test/update" element={<PatientUpdate />} />
          <Route path="patients/search" element={<PatientSearch />} />
          <Route path="visits" element={<Visits />} />
          <Route path="visits/new" element={<VisitNew />} />
          <Route path="visits/test/update" element={<VisitUpdate />} />
          <Route path="staff" element={<Staff />} />
          <Route path="staff/new" element={<StaffNew />} />
          <Route path="staff/test/update" element={<StaffUpdate />} />
          <Route path="carriers" element={<Carriers />} />
          <Route path="carriers/new" element={<CarrierNew />} />
          <Route path="carriers/test/update" element={<CarrierUpdate />} />
          <Route path="plans" element={<Plans />} />
          <Route path="plans/new" element={<PlanNew />} />
          <Route path="plans/test/update" element={<PlanUpdate />} />
          <Route path="staff-interactions" element={<StaffInteractions />} />
          <Route path="staff-interactions/new" element={<InteractionNew />} />
          <Route path="staff-interactions/test/update" element={<InteractionUpdate />} />
        </Routes>
      </Container >
    </>
  );
}

export default App;
