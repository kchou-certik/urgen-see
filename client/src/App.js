import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Carriers from './routes/carriers/Carriers';
import CarrierNew from './routes/carriers/CarrierNew';
import Index from "./routes/Index";
import Patients from './routes/patients/Patients';
import PatientRegistration from './routes/patients/PatientRegistration';
import Plans from './routes/plans/Plans';
import PlanNew from './routes/plans/PlanNew';
import Staff from './routes/staff/Staff';
import StaffNew from './routes/staff/StaffNew'
import Visits from './routes/visits/Visits';
import VisitNew from './routes/visits/VisitNew';
import StaffInteractions from './routes/staffInteractions/StaffInteractions';
import InteractionNew from './routes/staffInteractions/InteractionNew';

import './App.css';

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/patients">Patients</Link>
          </li>
          <li>
            <Link to="/visits">Visits</Link>
          </li>
          <li>
            <Link to="/staff">Staff</Link>
          </li>
          <li>
            <Link to="/plans">Plans</Link>
          </li>
          <li>
            <Link to="/carriers">Carriers</Link>
          </li>
          <li>
            <Link to="/staff-interactions">Staff Interactions</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="patients" element={<Patients />} />
        <Route path="patients/new" element={<PatientRegistration />} />
        <Route path="visits" element={<Visits />} />
        <Route path="visits/new" element={<VisitNew />} />
        <Route path="staff" element={<Staff />} />
        <Route path="staff/new" element={<StaffNew />} />
        <Route path="carriers" element={<Carriers />} />
        <Route path="carriers/new" element={<CarrierNew />} />
        <Route path="plans" element={<Plans />} />
        <Route path="plans/new" element={<PlanNew />} />
        <Route path="staff-interactions" element={<StaffInteractions />} />
        <Route path="staff-interactions/new" element={<InteractionNew />} />
      </Routes>
    </div >
  );
}

export default App;
