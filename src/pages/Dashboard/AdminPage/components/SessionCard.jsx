import PropTypes from "prop-types";
import useMainContext from "../../../../utils/useMainContext";
import useAxios from "../../../../utils/useAxios";
import { BiMoney } from "react-icons/bi";
import usePendingSessions from "../../../../utils/hooks/usePendingSessions";

const SessionCard = ({ session }) => {
	const { toastSuc, toastErr } = useMainContext();
  const [, refetch] = usePendingSessions();
	const axiosHook = useAxios();

	const handleAccept = (e) => {
		e.preventDefault();
    const {_id: sessId, price, ...sessionData} = {...session}
		axiosHook
			.post("/approved", {session: {...sessionData, price: e.target.finalprice.value}, suggPrice: price, sessId} )
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
		const {_id: sessId, ...sessionData} = {...session}
		axiosHook
			.post("/rejected", {session: {...sessionData, reason: e.target.reason.value}, sessId} )
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

	return (
		<>
			<div className="flex flex-col gap-6 bg-base-200 w-11/12 lg:w-7/12 rounded-md p-3">
				<div className="flex flex-col">
					<h3 className="font-bold text-xl text-primary">{session.title}</h3>
					<h4 className="font-extralight text-sm pr-3">
						<span className="badge badge-success badge-sm">
							${session.price}
						</span>{" "}
						| {session.email}
					</h4>
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
					<p className="text-justify">{session.desc}</p>
					<div className="flex justify-end gap-3">
						<button
							onClick={() =>
								document.getElementById(session._id + "app").showModal()
							}
							className="btn btn-xs btn-success"
						>
							Approve
						</button>
						<button
							onClick={() =>
								document.getElementById(session._id + "rej").showModal()
							}
							className="btn btn-xs btn-error"
						>
							Reject
						</button>
					</div>
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
						<label className="form-control col-span-2">
							<div className="label">
								<span className="label-text-alt text-warning">
									Please provide a reason for rejection
								</span>
							</div>
							<textarea
								className="textarea textarea-bordered"
								placeholder="Reason for rejection"
								name="reason"
								required
							></textarea>
						</label>
						<button type="submit" className="btn btn-error">
							Reject
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
