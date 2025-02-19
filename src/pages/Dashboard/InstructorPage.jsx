import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import { Outlet, useNavigate } from "react-router";
import Footer from "../components/Footer";
import useRole from "../../routes/components/useRole";
import LoadingPage from "../../routes/components/LoadingPage";
import InstNav from "./InstructorPage/components/InstNav";

const InstructorPage = () => {
	const [roleData, roleDataLoading] = useRole();
	const navigate = useNavigate();

	if (roleDataLoading) {
		return <LoadingPage />;
	}
	if (roleData != "instructor") {
		navigate('/dashboard')
	}

	return (
		<>
			<Helmet>
				<title>Instructor Dashboard</title>
			</Helmet>
			
			<main className="grid grid-cols-5">
				<aside className="h-screen bg-base-300 flex flex-col justify-between items-center sticky top-0">
					<InstNav />
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

export default InstructorPage;
