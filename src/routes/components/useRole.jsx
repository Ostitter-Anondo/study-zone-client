import { useQuery } from "@tanstack/react-query";
import useAxios from "../../utils/useAxios";
import useMainContext from "../../utils/useMainContext";

const useRole = () => {
  const { loading } = useMainContext();
    const axiosHook = useAxios();
    const { data: roleData, isPending: roleDataLoading } = useQuery({
        queryKey: ['roleData'],
        enabled: !loading,
        queryFn: async () => {
            console.log('role checking')
            const res = await axiosHook.get(`/rolecheck`);
            return res.data?.role;
        }
    })
    return [roleData, roleDataLoading]
};

export default useRole;