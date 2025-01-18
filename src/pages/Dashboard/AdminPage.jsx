import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Profile from "./AdminPage/Profile";
import UserManagement from "./AdminPage/UserManagement";
import ApproveSessions from "./AdminPage/ApproveSessions";

const AdminPage = () => {
  return (
    <>
      <Tabs className="my-12">
        <TabList className="tabs tabs-boxed flex flex-wrap justify-center p-3 w-fit mx-6 md:mx-auto mb-12 gap-3">
          <Tab className="tab">Profile</Tab>
          <Tab className="tab">Users</Tab>
          <Tab className="tab">Approve Sessions</Tab>
          <Tab className="tab">Manage Sessions</Tab>
          <Tab className="tab">Manage Reviews</Tab>
        </TabList>

        <TabPanel className="w-11/12 mx-auto">
          <h2><Profile /></h2>
        </TabPanel>
        <TabPanel className="w-11/12 mx-auto">
          <h2><UserManagement /></h2>
        </TabPanel>
        <TabPanel className="w-11/12 mx-auto">
          <h2><ApproveSessions /></h2>
        </TabPanel>
        <TabPanel className="w-11/12 mx-auto">
          <h2>Manage Sessions</h2>
        </TabPanel>
        <TabPanel className="w-11/12 mx-auto">
          <h2>Any content 4</h2>
        </TabPanel>
      </Tabs>
    </>
  );
};

export default AdminPage;
