import logo from '@assets/images/logo.svg';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Cookies, withCookies, useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';

const getMeInfo = async () => {
  const token = new Cookies().get('token');
  const response = await fetch('/api/me', {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

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

  const logOut = async () => {
    console.log(cookies);
    removeCookie('token');
    window.location.href = '/login';
  };

  return (
    <header>
      <div className="min-h-80 flex items-center justify-between bg-grey-dark p-2">
        <div className="app-header__logo">
          <img src={logo} alt="logo" className='h-14'/>
        </div>
        <div className="right">
          <div className="flex items-center space-x-6">
            <div className="rounded-full w-24 overflow-hidden">
              <img src="https://randomuser.me/api/portraits/women/72.jpg" alt="avatar" />
            </div>
            <div className="app-header__user__name">
              <span className="text-white">
                {meInfo.isLoading ? '' : meInfo.data ? meInfo.data.firstName + ' ' + meInfo.data.lastName : ''}
              </span>
            </div>
            <button
              className="group relative flex w-auto justify-center rounded-md border border-red bg-red py-2 px-2 text-sm font-medium text-white hover:bg-white hover:text-red focus:outline-none focus:ring-2 focus:ring-red focus:ring-offset-2"
              onClick={() => logOut()}
            >
              Deonnexion
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default withCookies(AppHeader);
