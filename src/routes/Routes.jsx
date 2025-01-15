import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import Root from "../pages/Root";
import AllSessions from "../pages/AllSessions/AllSessions";
import Login from "../pages/Login/Login";
import LoginForm from "../pages/Login/LoginForm";
import Signup from "../pages/Signup/Signup";
import DashboardRoute from "./DashboardRoute";
import PrivateRoute from "./PrivateRoute";

export const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/allsessions",
        element: <AllSessions />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
        children: [
          {
            path: "/login",
            element: <LoginForm />,
          },
        ],
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardRoute />
      </PrivateRoute>
    )
  },
]);
