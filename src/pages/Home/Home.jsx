import { Helmet } from "react-helmet-async";
import Banner from "./Components/Banner";
import useAxios from "../../utils/useAxios";

const Home = () => {
  const axiosHook = useAxios();
  const touchme = () => {
    axiosHook.get("/login");
  };
  return (
    <>
      <Helmet>
        <title>Study Zone</title>
      </Helmet>
      <Banner />
      <div className="mx-12">
        <button onClick={touchme} className="btn btn-primary my-32 mx-auto">
          touch me
        </button>
      </div>
    </>
  );
};

export default Home;
