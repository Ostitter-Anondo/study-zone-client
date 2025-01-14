import { Helmet, HelmetProvider } from "react-helmet-async";
import Banner from "./Components/Banner";

const Home = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Study Zone</title>
        </Helmet>
      </HelmetProvider>
      <Banner />
    </>
  );
};

export default Home;
