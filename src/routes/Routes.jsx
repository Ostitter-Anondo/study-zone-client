import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import Root from "../pages/Root";
import AllSessions from "../pages/AllSessions/AllSessions";
import Login from "../pages/Login/Login";
import LoginForm from "../pages/Login/LoginForm";

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
        path: "/login",
        element: <Login />,
        children: [
          {
            path: "/login",
            element: <LoginForm />
          },
        ],
      },
    ],
  },
]);
