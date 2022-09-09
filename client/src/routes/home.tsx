import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [cookie, setCookie] = useCookies(["token"]);

  if (!cookie.token) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

export default Home;