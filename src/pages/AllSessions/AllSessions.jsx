import { useState } from "react";
import { Helmet } from "react-helmet-async";
import useAllApproved from "../../utils/hooks/useAllApproved";
import { Link, useLoaderData } from "react-router";

const AllSessions = () => {
	const count = useLoaderData().data.count;
	console.log(count);
	const pageSize = 6;
	const [page, setPage] = useState(0);
	const [sessions, refetch] = useAllApproved(page);
	const today = new Date().getTime();
	return (
		<>
			<Helmet>
				<title>All Sessions</title>
			</Helmet>
			<div className="w-full h-screen flex flex-col justify-between">
				<div className="my-12 w-11/12 mx-auto grid md:grid-cols-2 lg:grid-cols-3 place-items-center gap-6">
					{sessions.map((session) => (
						<div
							key={session._id}
							className="card flex flex-col gap-6 bg-base-300 p-6 items-center max-w-72 text-center"
						>
							<h1 className="font-extrabold text-4xl">{session.title}</h1>
							<h4 className="font-extralight text-lg">{session.email}</h4>
							<h3
								className={`font-bold text-2xl text-success ${
									today > session.regStart && today < session.regEnd
										? ""
										: "hidden"
								}`}
							>
								Registration Ongoing
							</h3>
							<h3
								className={`font-bold text-2xl text-info ${
									today < session.regStart ? "" : "hidden"
								}`}
							>
								Coming Soon
							</h3>
							<h3
								className={`font-bold text-2xl text-error ${
									today > session.regEnd ? "" : "hidden"
								}`}
							>
								Registration Over
							</h3>
							<Link to={`/session/${session._id}`} className="btn btn-info">Details</Link>
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

export default AllSessions;
