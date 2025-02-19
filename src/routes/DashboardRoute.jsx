import { useEffect } from "react";
import useAxios from "../utils/useAxios";
import useMainContext from "../utils/useMainContext";
import { useNavigate } from "react-router";

const DashboardRoute = () => {
	const { userData } = useMainContext();

	const roleData = userData.role;

	console.log(roleData);

	const axiosHook = useAxios();

	const navigate = useNavigate();

	useEffect(() => {
		axiosHook
			.get(`/jwtverify?uid=${userData.uid}`)
			.then((res) => console.log(res))
			.catch((err) => console.error(err));
	}, [axiosHook, userData.uid]);

	useEffect(() => {
		if (roleData === "admin") {
			navigate("/admin");
		} else if (roleData === "instructor") {
			navigate("/instructor");
		} else if (roleData === "student") {
			navigate("/student");
		}
	}, []);
};

export default DashboardRoute;
