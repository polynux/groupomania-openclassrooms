import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './routes/login';
import Home from './routes/home';
import { CookiesProvider, useCookies } from 'react-cookie';
import Signup from './routes/signup';
import { useEffect, useState } from 'react';

// Create a client
const queryClient = new QueryClient();

export default () => {
  const [auth, setAuth] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  useEffect(() => {
    if (cookies.token) {
      setAuth(true);
    }
  }, [cookies.token]);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <CookiesProvider>
            <Routes>
              <Route path="/login" element={auth ? <Navigate to="/home" /> : <Login />} />
              <Route path="/signup" element={auth ? <Navigate to="/home" /> : <Signup />} />
              <Route path="/home" element={!auth ? <Navigate to="/login" /> : <Home />} />
            </Routes>
            <Outlet />
        </CookiesProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};
