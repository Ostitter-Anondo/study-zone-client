import "react-tabs/style/react-tabs.css";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet, useNavigate } from "react-router";
import useRole from "../../routes/components/useRole";
import LoadingPage from "../../routes/components/LoadingPage";
import BigNav from "./AdminPage/components/BigNav";

const AdminPage = () => {
	const [roleData, roleDataLoading] = useRole();
	const navigate = useNavigate();

	if (roleDataLoading) {
		return <LoadingPage />;
	}
	if (roleData != "admin") {
		navigate('/dashboard')
	}

	return (
		<>
			<Helmet>
				<title>Admin Dashboard</title>
			</Helmet>
			<main className="grid grid-cols-5">
				<aside className="h-screen bg-base-300 flex flex-col justify-between items-center sticky top-0">
					<BigNav />
				</aside>
				<div className="col-span-4">
					<header className="sticky top-0 z-50 bg-base-300/30 backdrop-blur">
						<Navbar />
					</header>
					<Outlet />
					<Footer />
				</div>
			</main>
		</>
	);
};

export default AdminPage;
