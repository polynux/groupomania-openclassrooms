import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './routes/login';
import Home from './routes/home';
import { checkAuth } from './controllers/Auth';

// Create a client
const queryClient = new QueryClient();

export default () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/login" element={checkAuth() ? <Navigate to="/home" /> : <Login />} />
          <Route path="/home" element={!checkAuth() ? <Navigate to="/login" /> : <Home />} />
        </Routes>
        <Outlet />
      </QueryClientProvider>
    </BrowserRouter>
  );
};
