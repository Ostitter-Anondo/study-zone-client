import PropTypes from "prop-types";
import LoadingPage from "./components/LoadingPage";
import LoginForm from "../pages/Login/LoginForm";
import useMainContext from "../utils/useMainContext";

const PrivateRoute = ({ children }) => {
  const { userData, loading } = useMainContext();
  
  
  if (loading) {
    return (
      <LoadingPage />
    );
  }

  if (userData) {
    return children;
  }

  return (
    <>
      <main>
        <div className="flex my-24 items-center justify-center">
          <LoginForm/>
        </div>
      </main>
    </>
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;