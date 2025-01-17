import { useEffect } from "react";
import LoginForm from "../pages/Login/LoginForm";
import useAxios from "../utils/useAxios";
import useMainContext from "../utils/useMainContext";
import LoadingPage from "./components/LoadingPage";
import useRole from "./components/useRole";
import AdminPage from "../pages/Dashboard/AdminPage";
import InstructorPage from "../pages/Dashboard/InstructorPage";

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

  if (roleData === "admin") {
    return (
      <>
        <AdminPage />
      </>
    );
  } else if (roleData === "instructor") {
    return (
      <>
        <InstructorPage />
      </>
    );
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
