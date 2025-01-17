import { useQuery } from "@tanstack/react-query";
import useAxios from "../useAxios";

const useAllUsers = () => {
  const axiosHook = useAxios();
    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async() => {
            const res = await axiosHook.get(`/users`);
            return res.data;
        }
    })

    return [users, refetch]
};

export default useAllUsers;