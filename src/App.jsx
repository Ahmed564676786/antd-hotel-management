import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


import AppLayout from './ui/AppLayout';
import Dashboard from './pages/Dashboard';
import Cabins from './pages/Cabins';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';




const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,       // 1 minute
      retry: 1,                   // retry failed requests once
      refetchOnWindowFocus: false,
    },
  },
});


const App = () => (


<QueryClientProvider client={queryClient}>
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

  </QueryClientProvider>
);

export default App;
