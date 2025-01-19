import Markdown from "react-markdown";
import useGetMyBooked from "../../../utils/hooks/useGetMyBooked";
import useMainContext from "../../../utils/useMainContext";
import { Link } from "react-router";

const MyBookeds = () => {
	const { booked } = useMainContext();
	const [myBooked] = useGetMyBooked(booked.wishlist);
	console.log(myBooked);
	return (
		<div>
			{myBooked.map((booking) => (
				<div key={booking._id} className="card sm:w-11/12 md:w-9/12 lg:w-7/12 mx-auto bg-base-200 p-6 grid md:grid-cols-3 place-items-center gap-3">
					<div className="self-start md:place-self-start md:col-span-2">
						<Link to={`/session/${booking._id}`} className="font-bold text-xl hover:underline hover:cursor-pointer">{booking.title}</Link>
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
				</div>
			))}
		</div>
	);
};

export default MyBookeds;
