import PropTypes from 'prop-types';
import useAxios from '../useAxios';
import { useQuery } from '@tanstack/react-query';

const useGetMyBooked = (booked) => {
  const axiosHook = useAxios();
	const { refetch, data: myBookedSessions = [] } = useQuery({
		queryKey: ["myBookedSessions", booked],
		queryFn: async () => {
			const res = await axiosHook.get(`/mybooked?booked=${booked}`);
			return res.data;
		},
	});

	return [myBookedSessions, refetch];
};

useGetMyBooked.propTypes = {
  booked: PropTypes.array
};

export default useGetMyBooked;