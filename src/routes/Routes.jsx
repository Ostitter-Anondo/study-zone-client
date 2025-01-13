import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Root from "../Root";

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
