import { useQuery } from "@tanstack/react-query";
import useAxios from "../useAxios";

const useAllMaterials = () => {
	const axiosHook = useAxios();
	const { refetch, data: allMats = [] } = useQuery({
		queryKey: ["allMats"],
		queryFn: async () => {
			const res = await axiosHook.get(`/allmaterials`);
			return res.data;
		},
	});

	return [allMats, refetch];
};

export default useAllMaterials;
