import { useQuery } from "@tanstack/react-query";
import useAxios from "../useAxios";

const useCountApproved = () => {
  const axiosHook = useAxios();
	const { refetch, data: appCount = [] } = useQuery({
		queryKey: ["appCount"],
		queryFn: async () => {
			const res = await axiosHook.get(`/countapproved`);
			return res.data;
		},
	});

	return [appCount, refetch];
};

export default useCountApproved;