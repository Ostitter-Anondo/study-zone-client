import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Profile from "./AdminPage/Profile";
import CreateSession from "./InstructorPage/CreateSession";
import TutorSessions from "./InstructorPage/TutorSessions";

const InstructorPage = () => {
  return (
    <Tabs className="my-12">
        <TabList className="tabs tabs-boxed flex flex-wrap justify-center p-3 w-fit mx-6 md:mx-auto mb-12 gap-3">
          <Tab className="tab">Profile</Tab>
          <Tab className="tab">Create Session</Tab>
          <Tab className="tab">My Sessions</Tab>
          <Tab className="tab">Materials</Tab>
        </TabList>

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
          <h2>Any content 4</h2>
        </TabPanel>
      </Tabs>
  );
};

export default InstructorPage;