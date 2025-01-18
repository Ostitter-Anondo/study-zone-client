import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Profile from "./AdminPage/Profile";
import UserManagement from "./AdminPage/UserManagement";
import ManageSessions from "./AdminPage/ManageSessions";

const AdminPage = () => {
  return (
    <>
      <Tabs className="my-12">
        <TabList className="tabs tabs-boxed flex flex-wrap justify-center p-3 w-fit mx-6 md:mx-auto mb-12 gap-3">
          <Tab className="tab">Profile</Tab>
          <Tab className="tab">Users</Tab>
          <Tab className="tab">Manage Sessions</Tab>
          <Tab className="tab">Manage Reviews</Tab>
        </TabList>

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
          Any content 4
        </TabPanel>
      </Tabs>
    </>
  );
};

export default AdminPage;
