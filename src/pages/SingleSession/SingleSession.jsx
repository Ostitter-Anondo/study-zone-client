import { IoPricetagOutline } from "react-icons/io5";
import Markdown from "react-markdown";
import { useNavigate, useParams } from "react-router";
import useMainContext from "../../utils/useMainContext";
import useGetSession from "../../utils/hooks/useGetSession";
import LoadingPage from "../../routes/components/LoadingPage";

const SingleSession = () => {
	const { id } = useParams();
	const [serverData] = useGetSession(id);
  const session = serverData.session
	const { userData, booked, setPaymentInfo } = useMainContext();

	const today = new Date().getTime();
  const navigate = useNavigate();

  const handleToPayment = () => {
    setPaymentInfo({sessId: session._id ,price: Number(session.price), title: session.title})
    navigate("/payment")
  }

	if (!session) {
		return (
			<>
				<LoadingPage />
			</>
		);
	}

	return (
		<>
			<div className="flex flex-col items-center">
				<div className="flex flex-col items-center gap-6 my-12 mx-6 md:w-10/12 lg:w-8/12">
					<h1 className="font-extrabold text-4xl text-center">
						{session.title}
					</h1>
					<div className="bg-primary text-primary-content font-light px-6 py-1 rounded-full self-start">
						<h4>{session.email}</h4>
						<h4>{session.name}</h4>
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
					<h1 className="text-2xl font-bold text-errorp">No Reviews Found!</h1>
				</div>
			</div>
		</>
	);
};

export default SingleSession;
