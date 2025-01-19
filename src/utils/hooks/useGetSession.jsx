import PropTypes from 'prop-types';
import useAxios from '../useAxios';
import { useQuery } from '@tanstack/react-query';

const useGetSession = (sessId) => {
  const axiosHook = useAxios();
	const { refetch, data: singleSession = [] } = useQuery({
		queryKey: ["singleSession", sessId],
		queryFn: async () => {
			const res = await axiosHook.get(`/indivsession/${sessId}`);
			return res.data;
		},
	});

	return [singleSession, refetch];
};

useGetSession.propTypes = {
  sessId: PropTypes.string,
};

export default useGetSession;