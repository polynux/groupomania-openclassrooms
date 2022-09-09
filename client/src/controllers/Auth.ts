import { useCookies } from "react-cookie";

const checkAuth = () => {
  const [cookie, setCookie] = useCookies(['token']);

  if (cookie.token && cookie.token !== '') {
    return true;
  }
  return false;
};

export { checkAuth };