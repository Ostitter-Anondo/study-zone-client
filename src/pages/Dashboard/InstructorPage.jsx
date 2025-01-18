import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Profile from "./AdminPage/Profile";
import CreateSession from "./InstructorPage/CreateSession";
import TutorSessions from "./InstructorPage/TutorSessions";
import MaterialsPage from "./InstructorPage/MaterialsPage";
import AllMaterials from "./InstructorPage/AllMaterials";

const InstructorPage = () => {
	return (
		<Tabs className="my-12">
			<div className="flex justify-center w-full">
				<TabList className="tabs tabs-boxed flex flex-wrap justify-center p-3 w-fit mx-6 mb-12 gap-3">
					<Tab className="tab">Profile</Tab>
					<Tab className="tab">Create Session</Tab>
					<Tab className="tab">My Sessions</Tab>
					<Tab className="tab">Add Materials</Tab>
					<Tab className="tab">All Materials</Tab>
				</TabList>
			</div>

			<TabPanel className="w-11/12 mx-auto">
				<Profile />
			</TabPanel>
			<TabPanel className="w-11/12 mx-auto">
				<CreateSession />
			</TabPanel>
			<TabPanel className="w-11/12 mx-auto">
				<TutorSessions />
			</TabPanel>
			<TabPanel className="w-11/12 mx-auto">
				<MaterialsPage />
			</TabPanel>
			<TabPanel className="w-11/12 mx-auto">
				<AllMaterials />
			</TabPanel>
		</Tabs>
	);
};

export default InstructorPage;
