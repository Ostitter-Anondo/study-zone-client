import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import Root from "../pages/Root";

export const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);
