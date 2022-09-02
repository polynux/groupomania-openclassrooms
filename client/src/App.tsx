import '@styles/App.scss';
import Header from './components/Header';
import { Outlet } from "react-router-dom";

export default () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
