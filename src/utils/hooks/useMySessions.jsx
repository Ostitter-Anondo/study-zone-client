import PropTypes from 'prop-types';
import useAxios from '../useAxios';
import { useQuery } from '@tanstack/react-query';

const useMySessions = (uid) => {
  const axiosHook = useAxios();
	const { refetch, data: sessions = [] } = useQuery({
		queryKey: ["sessions", uid],
		queryFn: async () => {
			const res = await axiosHook.get(`/mysessions/${uid}`);
			return res.data;
		},
	});

	return [sessions, refetch];
};

useMySessions.propTypes = {
  uid: PropTypes.string
};

export default useMySessions;