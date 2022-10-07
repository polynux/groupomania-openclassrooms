import logo from '@assets/images/logo-only.svg';
import { useQuery } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';
import Avatar from '@components/Avatar';
import { getMeInfo } from '@controllers/UserController';
import { FiLogOut } from 'react-icons/fi';

const AppHeader = () => {
  const meInfo = useQuery(['me'], getMeInfo, {
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      console.error(error);
    },
  });
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  const logOut = () => {
    removeCookie('token');
  };

  return (
    <header className="sticky top-0 z-100 w-full shadow-sm shadow-slate-900">
      <div className="min-h-80 flex items-center justify-between bg-grey-dark p-2">
        <div className="app-header__logo flex items-center gap-3">
          <img src={logo} alt="logo" className="h-14" />
          <span className="w-0 transition-all duration-500 sm:w-full flex-shrink overflow-hidden text-red font-bold text-4xl">Groupomania</span>
        </div>
        <div className="right">
          <div className="flex items-center gap-2 sm:gap-4">
            {meInfo.data && <Avatar user={meInfo.data} />}
            <div className="app-header__user__name">
              <span className="text-white">
                {meInfo.isLoading ? '' : meInfo.data ? meInfo.data.firstName + ' ' + meInfo.data.lastName : ''}
              </span>
            </div>
            <button
              className="group relative flex w-auto justify-center rounded-md border border-red bg-red py-2 px-2 text-sm font-medium text-white hover:bg-white hover:text-red focus:outline-none focus:ring-2 focus:ring-red focus:ring-offset-2"
              onClick={() => logOut()}
            >
              <FiLogOut className="h-5 w-5" />
              <span className="w-0 transition-all duration-500 sm:w-full sm:pl-2 origin-left overflow-hidden">Deconnexion</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
