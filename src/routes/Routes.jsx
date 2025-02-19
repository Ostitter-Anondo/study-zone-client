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
import AddReview from "../pages/Review/AddReview";
import AllAnnouncements from "../pages/AllAnnouncements/AllAnnouncements";
import AdminPage from "../pages/Dashboard/AdminPage";
import StudentPage from "../pages/Dashboard/StudentPage";
import InstructorPage from "../pages/Dashboard/InstructorPage";
import Profile from "../pages/Dashboard/AdminPage/Profile";
import UserManagement from "../pages/Dashboard/AdminPage/UserManagement";
import ManageSessions from "../pages/Dashboard/AdminPage/ManageSessions";
import AllAdminMaterials from "../pages/Dashboard/AdminPage/AllAdminMaterials";
import MakeAnnouncement from "../pages/Dashboard/AdminPage/MakeAnnouncement";
import CreateSession from "../pages/Dashboard/InstructorPage/CreateSession";
import TutorSessions from "../pages/Dashboard/InstructorPage/TutorSessions";
import MaterialsPage from "../pages/Dashboard/InstructorPage/MaterialsPage";
import AllMaterials from "../pages/Dashboard/InstructorPage/AllMaterials";
import CreateNote from "../pages/Dashboard/StudentPage/CreateNote";
import AllNotes from "../pages/Dashboard/StudentPage/AllNotes";
import MyBookeds from "../pages/Dashboard/StudentPage/MyBookeds";
import MyMaterials from "../pages/Dashboard/StudentPage/MyMaterials";

export const Routes = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{
				path: "/",
				element: <Home />,
				loader: () =>
					axios.get(`${import.meta.env.VITE_dbApi}/homepagestuff`, {
						withCredentials: true,
					}),
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
				path: "/announcements",
				element: <AllAnnouncements />,
				loader: () =>
					axios.get(`${import.meta.env.VITE_dbApi}/countannouncements`, {
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
				path: "/review/:id",
				element: (
					<PrivateRoute>
						<AddReview />
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
		element: (
			<PrivateRoute>
				<DashboardRoute />
			</PrivateRoute>
		),
	},
	{
		path: "/admin",
		element: (
			<PrivateRoute>
				<AdminPage />
			</PrivateRoute>
		),
		children: [
			{
				path: "/admin",
				element: <Profile />,
			},
			{
				path: "/admin/users",
				element: <UserManagement />,
			},
			{
				path: "/admin/sessions",
				element: <ManageSessions />,
			},
			{
				path: "/admin/materials",
				element: <AllAdminMaterials />,
			},
			{
				path: "/admin/announcement",
				element: <MakeAnnouncement />,
			},
		],
	},
	{
		path: "/instructor",
		element: (
			<PrivateRoute>
				<InstructorPage />
			</PrivateRoute>
		),
		children:[
			{
				path: "/instructor",
				element: <Profile />
			},
			{
				path: "/instructor/session",
				element: <CreateSession />
			},
			{
				path: "/instructor/mysessions",
				element: <TutorSessions />
			},
			{
				path: "/instructor/addmaterial",
				element: <MaterialsPage />
			},
			{
				path: "/instructor/mymaterials",
				element: <AllMaterials />
			},
		]
	},
	{
		path: "/student",
		element: (
			<PrivateRoute>
				<StudentPage />
			</PrivateRoute>
		),
		children: [
			{
				path: "/student",
				element: <Profile />
			},
			{
				path: "/student/note",
				element: <CreateNote />
			},
			{
				path: "/student/mynotes",
				element: <AllNotes />
			},
			{
				path: "/student/sessions",
				element: <MyBookeds />
			},
			{
				path: "/student/materials",
				element: <MyMaterials />
			},
		],
	},
	{
		path: "*",
		element: <NotFound />,
	},
]);
