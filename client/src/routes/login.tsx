import { Link } from 'react-router-dom';
import logo from '@assets/images/logo.svg';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default () => {
  // Access the client
  const queryClient = useQueryClient();

  const mutation = useMutation(formData => {
    return fetch('/api/auth/login', {
      method: 'POST',
      body: formData,
    });
  })
  const onSubmit = event => {
    event.preventDefault()
    const formData = new FormData(event.target)
    mutation.mutate({email: formData.get('email'), password: formData.get('password')})
  }

  return (
    <>
      <div className="flex flex-col min-h-full items-center justify-center py-12 px-4 bg-grey-dark sm:px-6 lg:px-8">
        <div>
          <img className="mx-auto h-20 pb-2 w-auto" src={logo} alt="Groupomania" />
        </div>
        <div className="w-full max-w-md bg-grey rounded-lg p-5">
          <form className="m-6 mb-3" action="#" method="POST" onSubmit={onSubmit}>
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
