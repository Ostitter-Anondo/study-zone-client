import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import Root from "../pages/Root";
import AllSessions from "../pages/AllSessions/AllSessions";
import Login from "../pages/Login/Login";
import LoginForm from "../pages/Login/LoginForm";
import Signup from "../pages/Signup/Signup";
import DashboardRoute from "./DashboardRoute";
import PrivateRoute from "./PrivateRoute";
import NotFound from "../pages/NotFound";
import axios from "axios";
import SingleSession from "../pages/SingleSession/SingleSession";
import Payment from "../pages/Payment/Payment";

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
				loader: () =>
					axios.get(`${import.meta.env.VITE_dbApi}/countapproved`, {
						withCredentials: true,
					}),
			},
			{
				path: "/session/:id",
				element: (
					<PrivateRoute>
						<SingleSession />
					</PrivateRoute>
				),
			},
			{
				path: "/payment",
				element: (
					<PrivateRoute>
						<Payment />
					</PrivateRoute>
				),
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
		element: <Root />,
		children: [
			{
				path: "/dashboard",
				element: (
					<PrivateRoute>
						<DashboardRoute />
					</PrivateRoute>
				),
			},
		],
	},
	{
		path: "*",
		element: <NotFound />,
	},
]);
