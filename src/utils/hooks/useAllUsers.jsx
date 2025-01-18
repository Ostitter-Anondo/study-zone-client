import PropTypes from 'prop-types';
import { useQuery } from "@tanstack/react-query";
import useAxios from "../useAxios";

const useAllUsers = (search) => {
  const axiosHook = useAxios();
    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async() => {
            const res = await axiosHook.get(`/users?search=${search}`);
            return res.data;
        }
    })

    return [users, refetch]
};

useAllUsers.propTypes = {
  search: PropTypes.string
};

export default useAllUsers;