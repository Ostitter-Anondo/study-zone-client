import PropTypes from 'prop-types';
import useAxios from '../useAxios';
import { useQuery } from '@tanstack/react-query';

const useSessionReviews = (sessId) => {
	const axiosHook = useAxios();
	const { refetch, data: sessReviews = [] } = useQuery({
		queryKey: ["sessReviews", sessId],
		queryFn: async () => {
			const res = await axiosHook.get(`/review?sessId=${sessId}`);
			return res.data;
		},
	});

	return [sessReviews, refetch];
};

useSessionReviews.propTypes = {
  sessId: PropTypes.string,
};

export default useSessionReviews;