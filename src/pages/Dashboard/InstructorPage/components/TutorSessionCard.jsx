import PropTypes from "prop-types";
import useMainContext from "../../../../utils/useMainContext";
import useAxios from "../../../../utils/useAxios";
import { BiEnvelope, BiMoney, BiRename, BiStopwatch } from "react-icons/bi";
import { MdOutlineTitle } from "react-icons/md";
import useMySessions from "../../../../utils/hooks/useMySessions";

const TutorSessionCard = ({ session }) => {
	const { userData, toastSuc, toastErr } = useMainContext();
	const [, refetch] = useMySessions(userData.uid);
	const axiosHook = useAxios();

	const handleDelete = (e) => {
		e.preventDefault();
		axiosHook
			.delete(`/deletesession/${session._id}`)
			.then((res) => {
				toastSuc("Successfully deleted");
				refetch();
				console.log(res);
			})
			.catch((err) => {
				toastErr(err.message);
			});
		document.getElementById(session._id + "del").close();
	};

	const handleEdit = (e) => {
		e.preventDefault();
		const title = e.target.title.value;
		const desc = e.target.desc.value;
		const regStart = new Date(e.target.regstart.value).getTime();
		const regEnd = new Date(e.target.regend.value).getTime();
		const clsStart = new Date(e.target.clsstart.value).getTime();
		const clsEnd = new Date(e.target.clsend.value).getTime();
		const price = e.target.price.value;
		const duration = e.target.duration.value;

		const today = new Date().getTime();

		const body = {
			data: {
				title,
				desc,
				regStart,
				regEnd,
				clsStart,
				clsEnd,
				price,
				duration,
			},
			sessId: session._id,
		};

		if (today >= regStart) {
			toastErr("Registration can not begin before or during present day");
			return;
		}
		if (regStart >= regEnd) {
			toastErr(
				"Registration date can not be the same day or later than registration end date"
			);
			return;
		}
		if (clsStart > clsEnd) {
			toastErr("Class start date can not be later than class end date");
			return;
		}
		if (clsStart < regEnd) {
			toastErr(
				"Class start date can not be earlier than registration end date"
			);
			return;
		}
		axiosHook
			.put(`/editsession`, body)
			.then((res) => {
				toastSuc(res.data.message);
				refetch();
			})
			.catch((err) => console.error(err));
		document.getElementById(session._id + "edt").close();
	};
	const handleRerequest = () => {
		axiosHook
			.put("/rerequest", {
				sessId: session._id,
				data: {
					status: "pending",
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
				<div
					className={`flex flex-col gap-2 ${
						session.status === "rejected" ? "hidden" : ""
					}`}
				>
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
				<div
					className={`rounded border border-base-300 p-2 flex flex-col gap-2 ${
						session.status === "rejected" ? "" : "hidden"
					}`}
				>
					<h4 className="font-extralight text-sm text-error pr-3">
						{session.reason}
					</h4>
				</div>
				<div className="rounded border border-base-300 p-2 md:col-span-2 h-full overflow-scroll">
					<p
						className={`text-justify ${
							session.status === "rejected" ? "hidden" : ""
						}`}
					>
						{session.desc}
					</p>
					<p
						className={`text-justify ${
							session.status === "rejected" ? "" : "hidden"
						}`}
					>
						<span className="text-warning">Feedback: </span>
						{session.feedback}
					</p>
				</div>
				<div className="flex justify-end md:justify-center gap-3 flex-wrap">
					<button
						onClick={handleRerequest}
						className={`btn btn-xs btn-success ${
							session.status === "rejected" ? "" : "hidden"
						}`}
					>
						Re-request
					</button>
					<button
						onClick={() =>
							document.getElementById(session._id + "edt").showModal()
						}
						className={`btn btn-xs btn-info ${
							session.status === "pending" ? "hidden" : ""
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
					<span
						className={`badge badge-lg bg-red-700 ${
							session.status === "pending" ? "" : "hidden"
						}`}
					>
						Pending
					</span>
				</div>
			</div>

			<dialog id={session._id + "edt"} className="modal">
				<div className="modal-box w-11/12 max-w-5xl">
					<form method="dialog">
						<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
							✕
						</button>
					</form>
					<h3 className="font-bold text-lg">Edit Session: {session.title}</h3>
					<p className="py-4">Are you sure you want to delete this session?</p>
					<form onSubmit={handleEdit} className="w-11/12 grid mx-auto gap-6">
						<label className="w-full input input-bordered flex items-center gap-2">
							<MdOutlineTitle />
							<input
								type="text"
								className="grow"
								placeholder="Title"
								name="title"
								required
								defaultValue={session.title}
							/>
						</label>
						<label className="w-full input input-disabled flex items-center gap-2 md:col-span-1">
							<BiRename />
							<input
								type="text"
								className="grow"
								placeholder="Cover Image (URL)"
								name="name"
								value={session.name}
								required
								disabled
							/>
						</label>
						<label className="w-full input input-disabled flex items-center gap-2 md:col-span-1">
							<BiEnvelope />
							<input
								type="text"
								className="grow"
								placeholder="Cover Image (URL)"
								name="email"
								value={session.email}
								required
								disabled
							/>
						</label>
						<label className="form-control">
							<div className="label">
								<span className="label-text-alt">Write in markdown</span>
								<span className="label-text-alt">
									<a
										className="btn btn-link btn-xs p-0 min-h-0"
										href="https://www.markdownguide.org/cheat-sheet/"
										target="_blank"
									>
										Markdown Cheat Sheet
									</a>
								</span>
							</div>
							<textarea
								className="textarea textarea-lg min-h-72 textarea-bordered h-24"
								placeholder="Description"
								name="desc"
								required
								defaultValue={session.desc}
							></textarea>
						</label>
						<label>
							<div className="label">
								<span className="label-text-alt">Registration Start Date</span>
							</div>
							<input
								type="date"
								className="w-full input input-bordered flex items-center gap-2"
								name="regstart"
								required
								defaultValue={new Date(session.regStart)
									.toISOString()
									.slice(0, 10)}
							/>
						</label>
						<label>
							<div className="label">
								<span className="label-text-alt">Registration End Date</span>
							</div>
							<input
								type="date"
								className="w-full input input-bordered flex items-center gap-2"
								name="regend"
								required
								defaultValue={new Date(session.regEnd)
									.toISOString()
									.slice(0, 10)}
							/>
						</label>
						<label>
							<div className="label">
								<span className="label-text-alt">Class Start Date</span>
							</div>
							<input
								type="date"
								className="w-full input input-bordered flex items-center gap-2"
								name="clsstart"
								required
								defaultValue={new Date(session.clsStart)
									.toISOString()
									.slice(0, 10)}
							/>
						</label>
						<label>
							<div className="label">
								<span className="label-text-alt">Class End Date</span>
							</div>
							<input
								type="date"
								className="w-full input input-bordered flex items-center gap-2"
								name="clsend"
								required
								defaultValue={new Date(session.clsEnd)
									.toISOString()
									.slice(0, 10)}
							/>
						</label>
						<label className="w-full input input-bordered flex items-center gap-2">
							<BiMoney />
							<input
								type="text"
								className="grow"
								placeholder="Suggested Price"
								name="price"
								required
								defaultValue={session.price}
							/>
						</label>
						<label className="w-full input input-bordered flex items-center gap-2">
							<BiStopwatch />
							<input
								type="text"
								className="grow"
								placeholder="Session Duration"
								name="duration"
								required
								defaultValue={session.duration}
							/>
						</label>
						<div></div>
						<button className="btn btn-success" type="submit">
							Submit
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
					<h3 className="font-bold text-lg">Delete Session: {session.title}</h3>
					<p className="py-4">Are you sure you want to delete this session?</p>
					<form onSubmit={handleDelete} className="flex flex-col gap-3">
						<button type="submit" className="btn btn-error">
							Delete
						</button>
					</form>
				</div>
			</dialog>
		</>
	);
};

TutorSessionCard.propTypes = {
	session: PropTypes.object,
};

export default TutorSessionCard;
