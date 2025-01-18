import { useQuery } from "@tanstack/react-query";
import useAxios from "../useAxios";

const useAllSessions = () => {
	const axiosHook = useAxios();
	const { refetch, data: sessions = [] } = useQuery({
		queryKey: ["sessions"],
		queryFn: async () => {
			const res = await axiosHook.get(`/sessions`);
			return res.data;
		},
	});

	return [sessions, refetch];
};

export default useAllSessions;
