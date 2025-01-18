import PropTypes from 'prop-types';
import useAxios from '../useAxios';
import { useQuery } from '@tanstack/react-query';

const useMyApproved = (uid) => {
  const axiosHook = useAxios();
	const { refetch, data: materialSessions = [] } = useQuery({
		queryKey: ["materialSessions", uid],
		queryFn: async () => {
			const res = await axiosHook.get(`/myapproved/${uid}`);
			return res.data;
		},
	});

	return [materialSessions, refetch];
};

useMyApproved.propTypes = {
  uid: PropTypes.string
};

export default useMyApproved;