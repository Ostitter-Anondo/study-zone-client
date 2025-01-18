import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Profile from "./AdminPage/Profile";
import UserManagement from "./AdminPage/UserManagement";
import ManageSessions from "./AdminPage/ManageSessions";
import AllAdminMaterials from "./AdminPage/AllAdminMaterials";
import { Helmet } from "react-helmet-async";

const AdminPage = () => {
	return (
		<>
			<Helmet>
				<title>Admin Dashboard</title>
			</Helmet>
			<Tabs className="my-12">
				<div className="flex justify-center w-full">
					<TabList className="tabs tabs-boxed flex flex-wrap justify-center p-3 w-fit mx-6 mb-12 gap-3">
						<Tab className="tab">Profile</Tab>
						<Tab className="tab">Users</Tab>
						<Tab className="tab">Manage Sessions</Tab>
						<Tab className="tab">Manage Materials</Tab>
					</TabList>
				</div>

				<TabPanel className="w-11/12 mx-auto">
					<Profile />
				</TabPanel>
				<TabPanel className="w-11/12 mx-auto">
					<UserManagement />
				</TabPanel>
				<TabPanel className="w-11/12 mx-auto">
					<ManageSessions />
				</TabPanel>
				<TabPanel className="w-11/12 mx-auto">
					<AllAdminMaterials />
				</TabPanel>
			</Tabs>
		</>
	);
};

export default AdminPage;
