import { useQuery } from "@tanstack/react-query";
import useAxios from "../useAxios";

const useGetMyNotes = () => {
  const axiosHook = useAxios();
	const { refetch, data: myNotes = [] } = useQuery({
		queryKey: ["myNotes"],
		queryFn: async () => {
			const res = await axiosHook.get(`/notes`);
			return res.data;
		},
	});

	return [myNotes, refetch];
};

export default useGetMyNotes;