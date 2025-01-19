import { IoPricetagOutline } from "react-icons/io5";
import Markdown from "react-markdown";
import { Link, useNavigate, useParams } from "react-router";
import useMainContext from "../../utils/useMainContext";
import useGetSession from "../../utils/hooks/useGetSession";
import LoadingPage from "../../routes/components/LoadingPage";
import useAxios from "../../utils/useAxios";
import useSessionReviews from "../../utils/hooks/useSessionReviews";
import { BiSolidStar } from "react-icons/bi";
import { Helmet } from "react-helmet-async";

const SingleSession = () => {
	const { id } = useParams();
	const [serverData] = useGetSession(id);
	const [reviews, reviewRefetch] = useSessionReviews(id);
	const session = serverData.session;
	const { userData, booked, setPaymentInfo, setBooked, toastSuc, toastErr } =
		useMainContext();

	const today = new Date().getTime();
	const navigate = useNavigate();
	const axiosHook = useAxios();

	const handleToPayment = () => {
		if (Number(session.price) === 0) {
			const body = { wishlist: [...booked.wishlist, session._id] };
			axiosHook
				.put("/booking", body)
				.then((res) => {
					toastSuc(res.data.message);
					setBooked(res.data.booked);
				})
				.catch((err) => {
					toastErr(err.message);
				});
		} else {
			setPaymentInfo({
				sessId: session._id,
				price: Number(session.price),
				title: session.title,
			});
			navigate("/payment");
		}
	};

	if (!session) {
		return (
			<>
				<LoadingPage />
			</>
		);
	}

	return (
		<>
			<Helmet>
				<title>{session.title}</title>
			</Helmet>
			<div className="flex flex-col items-center">
				<div className="flex flex-col items-center gap-6 my-12 mx-6 md:w-10/12 lg:w-8/12">
					<h1 className="font-extrabold text-4xl text-center">
						{session.title}
					</h1>
					<div className="flex justify-between w-full items-center">
						<div className="bg-primary text-primary-content font-light px-6 py-1 rounded-full mx-auto">
							<h4>{session.email}</h4>
							<h4>{session.name}</h4>
						</div>
						<Link
							to={`/review/${session._id}`}
							className={`btn btn-outline btn-success rounded-full mx-auto`}
							disabled={
								userData.role === "admin" ||
								userData.role === "instructor" ||
								!booked.wishlist.includes(session._id) ||
								!!reviews.filter((review) => review.uid === userData.uid).length
							}
						>
							Review
						</Link>
					</div>
					<h3 className="text-xl font-semibold self-start">Details:</h3>
					<div className="overflow-x-auto">
						<table className="table table-zebra">
							<thead>
								<tr>
									<th></th>
									<th>Start</th>
									<th>End</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<th>Reg</th>
									<td>{new Date(session.regStart).toDateString()}</td>
									<td>{new Date(session.regEnd).toDateString()}</td>
								</tr>
								<tr>
									<th>Class</th>
									<td>{new Date(session.clsStart).toDateString()}</td>
									<td>{new Date(session.clsEnd).toDateString()}</td>
								</tr>
							</tbody>
						</table>
						<p className="font-extralight text-xs text-accent my-1">
							*Times are considered at 00:00 UTC+00:00
						</p>
					</div>
					<div className="prose lg:prose-xl text-justify">
						<Markdown>{session.desc}</Markdown>
					</div>
					<div className={`join ${today > session.regEnd ? "hidden" : ""}`}>
						<h3 className="join-item input input-bordered input-success text-success flex gap-3 items-center text-xl">
							<IoPricetagOutline />${session.price}
						</h3>
						<button
							onClick={handleToPayment}
							className={`btn btn-outline btn-success join-item`}
							disabled={
								userData.role === "admin" ||
								userData.role === "instructor" ||
								booked.wishlist.includes(session._id)
							}
						>
							Book
						</button>
					</div>
					<h3
						className={`join-item input input-bordered input-error text-error flex gap-3 items-center text-xl ${
							today > session.regEnd ? "" : "hidden"
						}`}
					>
						Registration Closed
					</h3>
				</div>
				<hr className="w-11/12 mx-auto border-neutral-content" />
				<div className="flex flex-col items-center gap-6 my-6 mx-6 md:w-10/12 lg:w-8/12">
					<h3 className="text-xl font-semibold self-start">Reviews:</h3>
					<h1
						className={`text-2xl font-bold text-error ${
							reviews ? "hidden" : ""
						}`}
					>
						No Reviews Found!
					</h1>
					{reviews.map((review) => (
						<div
							key={review._id}
							className="card w-11/12 md:w-9/12 lg:w-7/12 bg-base-200 p-6 flex flex-col gap-6"
						>
							<div className="flex items-center justify-between">
								<div className="rounded-full bg-primary text-primary-content p-3 flex gap-6 items-center  w-fit">
									<img
										src={review.photo}
										className="size-10 rounded-full"
										alt="usrImg"
									/>
									<h4 className="text-light text-lg">{review.email}</h4>
								</div>
								<div className="rounded-full bg-secondary text-primary-content px-2 py-0 flex gap-3 items-center text-lg w-fit">
									<BiSolidStar />
									<h4 className="text-light">{review.rating}</h4>
								</div>
							</div>
							<div className="prose lg:prose-xl w-full text-justify">
								<Markdown>{review.review}</Markdown>
							</div>
							<div>
								<button
									onClick={() => {
										axiosHook
											.delete(`/review?reviewId=${review._id}`)
											.then((res) => {
												toastSuc(res.message);
                        reviewRefetch();
											})
											.catch((err) => toastErr(err.message));
									}}
									className={`btn btn-xs btn-error ${
										userData.uid === review.uid ? "" : "hidden"
									}`}
								>
									delete
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default SingleSession;
