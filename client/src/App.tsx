import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './routes/login';
import Home from './routes/home';
import { CookiesProvider, useCookies } from 'react-cookie';
import Signup from './routes/signup';

// Create a client
const queryClient = new QueryClient();

const Auth = ({route}: {route: string}) => {
  const [cookies] = useCookies(['token']);

  if (cookies.token && route === 'login') {
    return <Navigate to="/home" />;
  } else if (!cookies.token && route === 'home') {
    return <Navigate to="/login" />;
  } else if (cookies.token && route === 'signup') {
    return <Navigate to="/home" />;
  } else if (cookies.token && route === 'home') {
    return <Home/>;
  } else if (!cookies.token && route === 'login') {
    return <Login/>;
  } else if (!cookies.token && route === 'signup') {
    return <Signup/>;
  }
  return <Navigate to="/login" />;
};

export default () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <CookiesProvider>
            <Routes>
              <Route path="/login" element={<Auth route="login"/>} />
              <Route path="/signup" element={<Auth route="signup"/>} />
              <Route path="/home" element={<Auth route="home"/>} />
            </Routes>
            <Outlet />
        </CookiesProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};
