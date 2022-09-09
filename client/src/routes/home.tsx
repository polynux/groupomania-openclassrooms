import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import AppHeader from "@components/AppHeader";

const Home = () => {
  const [cookie, setCookie] = useCookies(["token"]);

  if (!cookie.token) {
    return <Navigate to="/login" />;
  }
  
  return (
    <>
      <AppHeader />
    </>
  );
}

export default Home;