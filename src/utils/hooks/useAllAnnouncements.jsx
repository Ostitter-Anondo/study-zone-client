import PropTypes from "prop-types";
import useAxios from "../useAxios";
import { useQuery } from "@tanstack/react-query";

const useAllAnnouncements = (page) => {
	const axiosHook = useAxios();
	const { refetch, data: allAnnouncements = [] } = useQuery({
		queryKey: ["allAnnouncements"],
		queryFn: async () => {
			const res = await axiosHook.get(`/announcement?page=${page}`);
			return res.data;
		},
	});

	return [allAnnouncements, refetch];
};

useAllAnnouncements.propTypes = {
	page: PropTypes.number,
};

export default useAllAnnouncements;
