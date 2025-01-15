import { useEffect } from "react";
import Footer from "../pages/components/Footer";
import Navbar from "../pages/components/Navbar";
import LoginForm from "../pages/Login/LoginForm";
import useAxios from "../utils/useAxios";
import useMainContext from "../utils/useMainContext";
import LoadingPage from "./components/LoadingPage";
import useRole from "./components/useRole";

const DashboardRoute = () => {
  const [roleData, roleDataLoading] = useRole();

  const { userData } = useMainContext();

  const axiosHook = useAxios();

  useEffect(() => {
    axiosHook
      .get(`/jwtverify?uid=${userData.uid}`)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  }, [axiosHook, userData.uid]);

  if (roleDataLoading) {
    return <LoadingPage />;
  }

  if (roleData) {
    return <>
    <header className='sticky top-0 z-50 bg-base-300/30 backdrop-blur'>
      <Navbar />
    </header>
    <main className="min-h-screen">
      {roleData}
    </main>
    <Footer />
  </>;
  }

  return (
    <>
      <div className="flex my-24 items-center justify-center">
        <LoginForm />
      </div>
    </>
  );
};

export default DashboardRoute;
