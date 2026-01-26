import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './ui/AppLayout';
import Dashboard from './pages/Dashboard';
import Cabins from './pages/Cabins';


const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="cabins" element={<Cabins />} />
        {/* <Route path="videos" element={<Videos />} />
        <Route path="uploads" element={<Uploads />} /> */}
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
