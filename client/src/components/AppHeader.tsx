import logo from '@assets/images/logo.svg';

const AppHeader = () => {
  return (
    <div className="min-h-80 flex items-center justify-between bg-grey-dark p-2">
      <div className="app-header__logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="right">
        <div className="flex items-center space-x-6">
          <div className="rounded-full w-24 overflow-hidden">
            <img src="https://randomuser.me/api/portraits/women/72.jpg" alt="avatar" />
          </div>
          <div className="app-header__user__name">
            <span className="text-white">John Doe</span>
          </div>
          <button className="group relative flex w-auto justify-center rounded-md border border-red bg-red py-2 px-2 text-sm font-medium text-white hover:bg-white hover:text-red focus:outline-none focus:ring-2 focus:ring-red focus:ring-offset-2">
            Deonnexion
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
