import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Carriers from './routes/Carriers';
import Index from "./routes/Index";
import Patients from './routes/Patients';
import Plans from './routes/Plans';
import Staff from './routes/Staff';
import Visits from './routes/Visits';

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
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="patients" element={<Patients />} />
        <Route path="visits" element={<Visits />} />
        <Route path="staff" element={<Staff />} />
        <Route path="carriers" element={<Carriers />} />
        <Route path="plans" element={<Plans />} />
      </Routes>
    </div >
  );
}

export default App;
