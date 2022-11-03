import { Token } from '@/types';
import logo from '@assets/images/logo.svg';
import { toastError, toastSuccess } from '@controllers/Toasts';
import { signup } from '@controllers/UserController';
import { Link, useNavigate } from 'react-router-dom';

export default () => {
  const navigate = useNavigate();

  const checkPasswordComplexity = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
    return regex.test(password);
  };

  const checkEmailValidity = (email: string) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const email = data.get('email') as string;
    const password = data.get('password') as string;
    const passwordConfirmation = data.get('password-confirm') as string;
    const firstName = data.get('firstName') as string;
    const lastName = data.get('lastName') as string;

    if (!/^[a-zA-Z]+$/.test(firstName)) return toastError('Le prénom ne doit contenir que des lettres.');
    if (!/^[a-zA-Z]+$/.test(lastName)) return toastError('Le nom ne doit contenir que des lettres.');
    if (!checkEmailValidity(email)) return toastError('L\'adresse e-mail n\'est pas valide.');
    if (password !== passwordConfirmation) return toastError('Les mots de passe ne correspondent pas.');
    if (!checkPasswordComplexity(password)) return toastError('Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.');

    signup(data).then((data: Token) => {
      toastSuccess('Vous êtes inscrit !');
      navigate('/login');
    }).catch((err) => {
      toastError(err as string);
    });
  };

  return (
    <>
      <div className="flex flex-col min-h-full items-center justify-center py-12 px-4 bg-grey-dark sm:px-6 lg:px-8">
        <div>
          <img className="mx-auto h-20 pb-2 w-auto" src={logo} alt="Groupomania" />
        </div>
        <div className="w-full max-w-md space-y-4 bg-grey rounded-lg p-5">
          <form className="m-6 mb-0" action="#" method="POST" onSubmit={(e) => onSubmit(e)}>
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="lastName" className="sr-only">
                  Nom
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="lastName"
                  required
                  className="relative block w-full appearance-none rounded-lg border px-3 py-2 my-2 placeholder-grey-light focus:z-10 focus:border-red focus:outline-none focus:ring-red sm:text-sm"
                  placeholder="Nom"
                />
              </div>
              <div>
                <label htmlFor="firstName" className="sr-only">
                  Prénom
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="firstName"
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
          <p className="text-center text-sm text-grey-dark">
            <Link to="/login" className="font-medium text-red-light hover:text-red">
              Retournez à la page de connexion
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
