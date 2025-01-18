import PropTypes from "prop-types";
import useMainContext from "../../../../utils/useMainContext";
import useAxios from "../../../../utils/useAxios";
import { BiMoney } from "react-icons/bi";
import useAllSessions from "../../../../utils/hooks/useAllSessions";
import { TbCancel } from "react-icons/tb";

const SessionCard = ({ session }) => {
	const { toastSuc, toastErr } = useMainContext();
	const [, refetch] = useAllSessions();
	const axiosHook = useAxios();

	const handleAccept = (e) => {
		e.preventDefault();
		axiosHook
			.put("/approved", {
				sessId: session._id,
				data: {
					status: "approved",
					price: e.target.finalprice.value,
					reason: "",
					feedback: "",
				},
			})
			.then((res) => {
				console.log(res);
				toastSuc(res.data.message);
				refetch();
			})
			.catch((err) => {
				toastErr(err.message);
			});
		document.getElementById(session._id + "app").close();
	};
	const handleReject = (e) => {
		e.preventDefault();
		axiosHook
			.put("/rejected", {
				sessId: session._id,
				data: {
					status: "rejected",
					reason: e.target.reason.value,
					feedback: e.target.feedback.value,
				},
			})
			.then((res) => {
				console.log(res);
				toastSuc(res.data.message);
				refetch();
			})
			.catch((err) => {
				toastErr(err.message);
			});
		document.getElementById(session._id + "rej").close();
	};
	const handleDelete = (e) => {
		e.preventDefault();
	};

	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center justify-around bg-base-200 w-11/12 rounded-md p-3">
				<div className="flex flex-col gap-2">
					<h3 className="font-bold text-xl text-primary">{session.title}</h3>
					<h4 className="flex gap-3 text-sm pr-3">
						<span className="badge badge-success badge-sm">
							${session.price}
						</span>
						<span className="badge badge-secondary badge-sm">
							{session.status}
						</span>
					</h4>
					<h4 className="font-extralight text-sm pr-3">{session.email}</h4>
				</div>
				<div className="flex flex-col gap-2">
					<h4 className="font-extralight text-sm text-info pr-3">
						<span className="text-accent">
							{new Date(session.regStart).toDateString()}
						</span>{" "}
						| {new Date(session.regEnd).toDateString()}
					</h4>
					<h4 className="font-extralight text-sm text-info pr-3">
						<span className="text-accent">
							{new Date(session.clsStart).toDateString()}
						</span>{" "}
						| {new Date(session.clsEnd).toDateString()}
					</h4>
				</div>
				<div className="rounded border border-base-300 p-2 md:col-span-2 h-full overflow-scroll">
					<p className="text-justify">{session.desc}</p>
				</div>
				<div className="flex justify-end md:justify-center gap-3 flex-wrap">
					<button
						onClick={() =>
							document.getElementById(session._id + "app").showModal()
						}
						className={`btn btn-xs btn-success ${
							session.status === "pending" ? "" : "hidden"
						}`}
					>
						Approve
					</button>
					<button
						onClick={() =>
							document.getElementById(session._id + "rej").showModal()
						}
						className={`btn btn-xs btn-warning ${
							session.status === "pending" ? "" : "hidden"
						}`}
					>
						Reject
					</button>
					<button
						onClick={() =>
							document.getElementById(session._id + "edt").showModal()
						}
						className={`btn btn-xs btn-info ${
							session.status === "approved" ? "" : "hidden"
						}`}
					>
						Edit
					</button>
					<button
						onClick={() =>
							document.getElementById(session._id + "del").showModal()
						}
						className={`btn btn-xs btn-error ${
							session.status === "pending" ? "hidden" : ""
						}`}
					>
						Delete
					</button>
				</div>
			</div>
			<dialog id={session._id + "app"} className="modal">
				<div className="modal-box">
					<form method="dialog">
						<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
							✕
						</button>
					</form>
					<h3 className="font-bold text-lg">
						Approve Session: {session.title}
					</h3>
					<p className="py-4">Are you sure you want to approve this modal?</p>
					<form onSubmit={handleAccept} className="flex flex-col gap-3">
						<div>
							<div className="label">
								<span className="label-text-alt text-info">
									Please set a price
								</span>
							</div>
							<label className="w-full input input-bordered flex items-center gap-2 col-span-2 md:col-span-1">
								<BiMoney />
								<input
									type="text"
									className="grow"
									placeholder={`suggested price: ` + session.price}
									name="finalprice"
									required
								/>
							</label>
						</div>
						<button type="submit" className="btn btn-success">
							Approve
						</button>
					</form>
				</div>
			</dialog>
			<dialog id={session._id + "rej"} className="modal">
				<div className="modal-box">
					<form method="dialog">
						<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
							✕
						</button>
					</form>
					<h3 className="font-bold text-lg">Reject Session: {session.title}</h3>
					<p className="py-4">Are you sure you want to reject this session?</p>
					<form onSubmit={handleReject} className="flex flex-col gap-3">
						<div>
							<div className="label">
								<span className="label-text-alt text-info">
									Please provide a reason for rejection
								</span>
							</div>
							<label className="w-full input input-bordered flex items-center gap-2 col-span-2 md:col-span-1">
								<TbCancel />
								<input
									type="text"
									className="grow"
									placeholder="Reason for rejection"
									name="reason"
									required
								/>
							</label>
						</div>
						<label className="form-control col-span-2">
							<div className="label">
								<span className="label-text-alt text-warning">
									Please provide feedback
								</span>
							</div>
							<textarea
								className="textarea textarea-bordered"
								placeholder="Feedback"
								name="feedback"
								required
							></textarea>
						</label>
						<button type="submit" className="btn btn-error">
							Reject
						</button>
					</form>
				</div>
			</dialog>
			<dialog id={session._id + "del"} className="modal">
				<div className="modal-box">
					<form method="dialog">
						<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
							✕
						</button>
					</form>
					<h3 className="font-bold text-lg">
						Approve Session: {session.title}
					</h3>
					<p className="py-4">Are you sure you want to approve this modal?</p>
					<form onSubmit={handleAccept} className="flex flex-col gap-3">
						<button type="submit" className="btn btn-success">
							Approve
						</button>
					</form>
				</div>
			</dialog>
		</>
	);
};

SessionCard.propTypes = {
	session: PropTypes.object,
};

export default SessionCard;
