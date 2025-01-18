import { useQuery } from "@tanstack/react-query";
import useAxios from "../useAxios";

const usePendingSessions = () => {
  const axiosHook = useAxios();
    const { refetch, data: pendings = [] } = useQuery({
        queryKey: ['pendings'],
        queryFn: async() => {
            const res = await axiosHook.get(`/pendings`);
            return res.data;
        }
    })

    return [pendings, refetch]
};

export default usePendingSessions;