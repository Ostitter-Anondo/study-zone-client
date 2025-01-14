import { Helmet, HelmetProvider } from "react-helmet-async";

const AllSessions = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>All Sessions</title>
        </Helmet>
      </HelmetProvider>
    </>
  );
};

export default AllSessions;
