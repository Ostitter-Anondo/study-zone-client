import Markdown from "react-markdown";
import useGetMyBooked from "../../../utils/hooks/useGetMyBooked";
import useMainContext from "../../../utils/useMainContext";
import { Link } from "react-router";
import NoData from "../components/NoData";

const MyBookeds = () => {
	const { booked } = useMainContext();
	const [myBooked] = useGetMyBooked(booked.wishlist);
	console.log(myBooked);
	if (myBooked.length === 0 || !myBooked) {
		return <NoData />;
	}
	return (
		<div className="flex flex-col gap-6 my-12">
			{myBooked.map((booking) => (
				<div
					key={booking._id}
					className="card sm:w-11/12 md:w-9/12 lg:w-7/12 mx-auto bg-base-200 p-6 grid md:grid-cols-3 place-items-center gap-3"
				>
					<div className="self-start md:place-self-start md:col-span-2">
						<h1
							to={`/session/${booking._id}`}
							className="font-bold text-xl hover:underline hover:cursor-pointer"
						>
							{booking.title}
						</h1>
						<h4 className="text-accent font-light text-xs">{booking.email}</h4>
					</div>
					<div className="font-extralight text-sm self-start md:place-self-end">
						<h4 className="text-primary">
							{new Date(booking.clsStart).toDateString()}
						</h4>
						<h4 className="text-secondary">
							{new Date(booking.clsEnd).toDateString()}
						</h4>
					</div>
					<div className="prose lg:prose-xl md:col-span-3 self-end text-justify">
						<Markdown>{booking.desc}</Markdown>
					</div>
					<div className="w-full flex md:col-span-3 self-end justify-between md:justify-end gap-3">
						<Link
							to={`/session/${booking._id}`}
							className="btn btn-sm btn-outline btn-info"
						>
							Details
						</Link>
						<Link
							to={`/review/${booking._id}`}
							className="btn btn-sm btn-outline btn-success"
						>
							Review
						</Link>
					</div>
				</div>
			))}
		</div>
	);
};

export default MyBookeds;
