import PropTypes from 'prop-types';
import useAxios from '../useAxios';
import { useQuery } from '@tanstack/react-query';

const useAllApproved = (page) => {
  const axiosHook = useAxios();
	const { refetch, data: appSessions = [] } = useQuery({
		queryKey: ["appSessions"],
		queryFn: async () => {
			const res = await axiosHook.get(`/allapproved?page=${page}`);
			return res.data;
		},
	});

	return [appSessions, refetch];
};

useAllApproved.propTypes = {
  page: PropTypes.number
}

export default useAllApproved;