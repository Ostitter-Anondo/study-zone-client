import { useState } from "react";
import { useLoaderData } from "react-router";
import useAllAnnouncements from "../../utils/hooks/useAllAnnouncements";
import { Helmet } from "react-helmet-async";
import Markdown from "react-markdown";
import useMainContext from "../../utils/useMainContext";
import useAxios from "../../utils/useAxios";

const AllAnnouncements = () => {
	const { userData, toastErr, toastSuc } = useMainContext();
	const count = useLoaderData().data.count;
	console.log(count);
	const pageSize = 6;
	const [page, setPage] = useState(0);
	const [announcements, refetch] = useAllAnnouncements(page);
	const axiosHook = useAxios();
	return (
		<>
			<Helmet>
				<title>Announcements</title>
			</Helmet>
			<div className="w-full min-h-screen flex flex-col justify-between">
				<div className="my-12 w-11/12 mx-auto grid md:grid-cols-2 lg:grid-cols-3 place-items-center gap-6">
					{announcements.map((announcement) => (
						<div
							key={announcement._id}
							className="card flex flex-col gap-6 bg-base-300 p-6 items-center max-w-72 text-center"
						>
							<h1 className="font-extrabold text-4xl">{announcement.title}</h1>
							<h4 className="font-extralight text-sm">
								{announcement.time ? (
									<span className="text-info">
										{new Date(announcement.time).toLocaleString()}
									</span>
								) : (
									<span className="text-error">time nai</span>
								)}
							</h4>
							<Markdown>{announcement.announcement}</Markdown>
							<button
								onClick={() => {
									axiosHook
										.delete(`/announcement?announcementId=${announcement._id}`)
										.then((res) => {
											toastSuc(res.message);
											refetch();
										})
										.catch((err) => toastErr(err.message));
								}}
								className={`btn btn-xs btn-error ${
									userData.role === "admin" ? "" : "hidden"
								}`}
							>
								delete
							</button>
						</div>
					))}
				</div>
				<div className="join mx-auto my-12">
					{[...Array(Math.ceil(count / pageSize)).keys()].map((item) => (
						<button
							key={item}
							onClick={async () => {
								await setPage(item);
								refetch();
							}}
							className={`join-item btn btn-sm ${
								item === page ? "btn-active" : ""
							}`}
						>
							{item + 1}
						</button>
					))}
				</div>
			</div>
		</>
	);
};

export default AllAnnouncements;
