import PropTypes from 'prop-types';
import useAxios from '../useAxios';
import { useQuery } from '@tanstack/react-query';

const useGetMaterial = (sessId) => {
  const axiosHook = useAxios();
	const { refetch, data: materialIndiv = [] } = useQuery({
		queryKey: ["materialIndiv", sessId],
		queryFn: async () => {
			const res = await axiosHook.get(`/material/${sessId}`);
			return res.data;
		},
	});

	return [materialIndiv, refetch];
};

useGetMaterial.propTypes = {
  sessId: PropTypes.string
};

export default useGetMaterial;