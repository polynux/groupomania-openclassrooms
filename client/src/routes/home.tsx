import AppHeader from "@components/AppHeader";
import { Navigate } from "react-router-dom";
import { checkAuth } from "../controllers/Auth";

const Home = () => {
  if (!checkAuth()) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <AppHeader />
    </>
  );
}

export default Home;