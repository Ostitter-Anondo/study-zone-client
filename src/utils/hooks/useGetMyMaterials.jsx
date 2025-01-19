import PropTypes from "prop-types";
import useAxios from "../useAxios";
import { useQuery } from "@tanstack/react-query";

const useGetMyMaterials = (booked) => {
	const axiosHook = useAxios();
	const { refetch, data: myBookedMaterials = [] } = useQuery({
		queryKey: ["myBookedMaterials", booked],
		queryFn: async () => {
			const res = await axiosHook.get(`/mybookedmaterials?booked=${booked}`);
			return res.data;
		},
	});

	return [myBookedMaterials, refetch];
};

useGetMyMaterials.propTypes = {
	booked: PropTypes.array,
};

export default useGetMyMaterials;
