import logo from '@assets/images/logo.svg';

export default () => {
  return (
    <>
      <div className="flex flex-col min-h-full items-center justify-center py-12 px-4 bg-grey-dark sm:px-6 lg:px-8">
        <div>
          <img className="mx-auto h-20 pb-2 w-auto" src={logo} alt="Groupomania" />
        </div>
        <div className="w-full max-w-md space-y-8 bg-grey rounded-lg p-5">
          <form className="m-6 " action="#" method="POST">
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="lastname" className="sr-only">
                  Nom
                </label>
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  autoComplete="lastname"
                  required
                  className="relative block w-full appearance-none rounded-lg border px-3 py-2 my-2 placeholder-grey-light focus:z-10 focus:border-red focus:outline-none focus:ring-red sm:text-sm"
                  placeholder="Nom"
                />
              </div>
              <div>
                <label htmlFor="firstname" className="sr-only">
                  Prénom
                </label>
                <input
                  id="firstname"
                  name="firstname"
                  type="text"
                  autoComplete="firstname"
                  required
                  className="relative block w-full appearance-none rounded-lg border px-3 py-2 my-2 placeholder-grey-light focus:z-10 focus:border-red focus:outline-none focus:ring-red sm:text-sm"
                  placeholder="Prénom"
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Adresse e-mail
                </label>
                <input
                  id="email-address"
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
              <div>
                <label htmlFor="password-confirm" className="sr-only">
                  Confirmez votre mot de passe
                </label>
                <input
                  id="password-confirm"
                  name="password-confirm"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-lg border px-3 py-2 my-2 placeholder-grey-light focus:z-10 focus:border-red focus:outline-none focus:ring-red sm:text-sm"
                  placeholder="Confirmez votre mot de passe"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-red bg-red py-2 px-4 text-sm font-medium text-white hover:bg-white hover:text-red focus:outline-none focus:ring-2 focus:ring-red focus:ring-offset-2"
              >
                Enregistrer un nouveau compte
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};