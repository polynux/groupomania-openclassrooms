import { Link } from 'react-router-dom';
import logo from '@assets/images/logo.svg';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import type { Token } from '../types';
import { toastError } from '@controllers/Toasts';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookie] = useCookies(['token']);
  
  const { refetch } = useQuery(
    ['login'],
    async () => {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.error) {
        throw data.error;
      }
      return response.json();
    },
    {
      onSuccess: (data: Token) => {
        setCookie('token', data.token, { path: '/', expires: new Date(data.expiresAt) });
      },
      onError: (error) => {
        toastError(error as string);
      },
      enabled: false,
      refetchOnWindowFocus: false,
    }
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await refetch();
  };

  return (
    <>
      <div className="flex flex-col min-h-full items-center justify-center py-12 px-4 bg-grey-dark sm:px-6 lg:px-8">
        <div>
          <img className="mx-auto h-20 pb-2 w-auto" src={logo} alt="Groupomania" />
        </div>
        <div className="w-full max-w-md bg-grey rounded-lg p-5">
          <form className="m-6 mb-3" action="#" method="POST" onSubmit={(e) => onSubmit(e)}>
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email" className="sr-only">
                  Adresse e-mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-lg border px-3 py-2 my-2 placeholder-grey-light focus:z-10 focus:border-red focus:outline-none focus:ring-red sm:text-sm"
                  placeholder="Adresse e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Mot de passe
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-lg border px-3 py-2 my-2 placeholder-grey-light focus:z-10 focus:border-red focus:outline-none focus:ring-red sm:text-sm"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-red bg-red py-2 px-4 text-sm font-medium text-white hover:bg-white hover:text-red focus:outline-none focus:ring-2 focus:ring-red focus:ring-offset-2"
              >
                Connexion
              </button>
            </div>
          </form>
          <p className="mt-2 text-center text-sm text-grey-dark">
            <Link to="/signup" className="font-medium text-red-light hover:text-red">
              Enregistrez un nouveau compte
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
