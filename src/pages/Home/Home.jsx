import { Helmet } from "react-helmet-async";
import Banner from "./Components/Banner";
import useAxios from "../../utils/useAxios";
import useMainContext from "../../utils/useMainContext";

const Home = () => {
	const { toastSuc } = useMainContext();
	const axiosHook = useAxios();

	const touchme = () => {
    const fny = ['money', 'teka', 42]
		axiosHook.get(`/login?fny=${fny}`).then((res) => {
			toastSuc(res.data.message);
      console.log(res.data);
		});
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
