import { Helmet, HelmetProvider } from "react-helmet-async";
import Banner from "./Components/Banner";
import useAxios from "../../utils/useAxios";

const Home = () => {
  const axiosHook = useAxios()
  const touchme = () =>{
    axiosHook.get("/login?comedy=fun&tragedy=42");
  }
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Study Zone</title>
        </Helmet>
      </HelmetProvider>
      <Banner />
      <div className="mx-12">
        <button onClick={touchme} className="btn btn-primary my-32 mx-auto">touch me</button>
      </div>
    </>
  );
};

export default Home;
