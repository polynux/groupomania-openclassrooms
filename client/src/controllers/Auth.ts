import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const checkAuth = () => {
  const [cookie, setCookie] = useCookies(['token']);

  if (cookie.token && cookie.token !== '') {
    return true;
  }
  return false;
};

export { checkAuth };