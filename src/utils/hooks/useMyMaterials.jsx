import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import useAxios from "../useAxios";

const useMyMaterials = (email) => {
	const axiosHook = useAxios();
	const { refetch, data: myMaterials = [] } = useQuery({
		queryKey: ["myMaterials", email],
		queryFn: async () => {
			const res = await axiosHook.get(`/allmymaterials/${email}`);
			return res.data;
		},
	});

	return [myMaterials, refetch];
};

useMyMaterials.propTypes = {
  email: PropTypes.string
};

export default useMyMaterials;
