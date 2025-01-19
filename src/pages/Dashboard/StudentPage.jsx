import { Helmet } from "react-helmet-async";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Profile from "./AdminPage/Profile";
import CreateNote from "./StudentPage/CreateNote";
import AllNotes from "./StudentPage/AllNotes";

const StudentPage = () => {
  return (
    <>
      <Helmet>
				<title>Student Dashboard</title>
			</Helmet>
			<Tabs className="my-12">
				<div className="flex justify-center w-full">
					<TabList className="tabs tabs-boxed flex flex-wrap justify-center p-3 w-fit mx-6 mb-12 gap-3">
						<Tab className="tab">Profile</Tab>
						<Tab className="tab">Create Note</Tab>
						<Tab className="tab">My Notes</Tab>
						<Tab className="tab">My Sessions</Tab>
						<Tab className="tab">My Materials</Tab>
					</TabList>
				</div>
				<TabPanel className="w-11/12 mx-auto">
					<Profile />
				</TabPanel>
				<TabPanel className="w-11/12 mx-auto">
					<CreateNote />
				</TabPanel>
				<TabPanel className="w-11/12 mx-auto">
					<AllNotes />
				</TabPanel>
				<TabPanel className="w-11/12 mx-auto">
					<></>
				</TabPanel>
				<TabPanel className="w-11/12 mx-auto">
					<></>
				</TabPanel>
			</Tabs>
    </>
  );
};

export default StudentPage;