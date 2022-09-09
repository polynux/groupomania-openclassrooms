import { Cookies } from "react-cookie";

const checkAuth = () => {
  const token = new Cookies().get("token");
  if (token && token !== '') {
    return true;
  }
  return false;
};

export { checkAuth };