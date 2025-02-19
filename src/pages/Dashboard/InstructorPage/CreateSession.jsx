import { MdOutlineTitle } from "react-icons/md";
import useMainContext from "../../../utils/useMainContext";
import { BiEnvelope, BiMoney, BiRename, BiStopwatch } from "react-icons/bi";
import useAxios from "../../../utils/useAxios";
import { useNavigate } from "react-router";

const CreateSession = () => {
	const { userData, toastSuc, toastErr } = useMainContext();
	const axiosHook = useAxios();
  const navigate = useNavigate();
	const handleSubmit = (e) => {
		e.preventDefault();

		const title = e.target.title.value;
		const uid = userData.uid;
		const name = e.target.name.value;
		const email = e.target.email.value;
		const desc = e.target.desc.value;
		const regStart = new Date(e.target.regstart.value).getTime();
		const regEnd = new Date(e.target.regend.value).getTime();
		const clsStart = new Date(e.target.clsstart.value).getTime();
		const clsEnd = new Date(e.target.clsend.value).getTime();
		const price = e.target.price.value;
		const duration = e.target.duration.value;
    const status = "pending";

		const today = new Date().getTime();

		const body = {
			title,
			uid,
			name,
			email,
      desc,
			regStart,
			regEnd,
			clsStart,
			clsEnd,
			price,
			duration,
      status,
		};

		if (today >= regStart) {
			toastErr(
				"Registration can not begin before or during present day"
			);
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
			.post(`/newsession`, body)
			.then((res) => {
				toastSuc(res.data.message);
        navigate("/dashboard")
			})
			.catch((err) => console.error(err));
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="w-11/12 grid grid-cols-2 mx-auto gap-6 my-12"
		>
			<label className="w-full input input-bordered flex items-center gap-2 col-span-2">
				<MdOutlineTitle />
				<input
					type="text"
					className="grow"
					placeholder="Title"
					name="title"
					required
				/>
			</label>
			<label className="w-full input input-disabled flex items-center gap-2 col-span-2 md:col-span-1">
				<BiRename />
				<input
					type="text"
					className="grow"
					placeholder="Cover Image (URL)"
					name="name"
					value={userData.name}
					required
					disabled
				/>
			</label>
			<label className="w-full input input-disabled flex items-center gap-2 col-span-2 md:col-span-1">
				<BiEnvelope />
				<input
					type="text"
					className="grow"
					placeholder="Cover Image (URL)"
					name="email"
					value={userData.email}
					required
					disabled
				/>
			</label>
			<label className="form-control col-span-2">
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
				></textarea>
			</label>
			<label>
				<div className="label">
					<span className="label-text-alt">Registration Start Date</span>
				</div>
				<input
					type="date"
					className="w-full input input-bordered flex items-center gap-2 col-span-2 md:col-span-1"
					name="regstart"
					required
				/>
			</label>
			<label>
				<div className="label">
					<span className="label-text-alt">Registration End Date</span>
				</div>
				<input
					type="date"
					className="w-full input input-bordered flex items-center gap-2 col-span-2 md:col-span-1"
					name="regend"
					required
				/>
			</label>
			<label>
				<div className="label">
					<span className="label-text-alt">Class Start Date</span>
				</div>
				<input
					type="date"
					className="w-full input input-bordered flex items-center gap-2 col-span-2 md:col-span-1"
					name="clsstart"
					required
				/>
			</label>
			<label>
				<div className="label">
					<span className="label-text-alt">Class End Date</span>
				</div>
				<input
					type="date"
					className="w-full input input-bordered flex items-center gap-2 col-span-2 md:col-span-1"
					name="clsend"
					required
				/>
			</label>
			<label className="w-full input input-bordered flex items-center gap-2 col-span-2 md:col-span-1">
				<BiMoney />
				<input
					type="text"
					className="grow"
					placeholder="Suggested Price"
					name="price"
					required
				/>
			</label>
			<label className="w-full input input-bordered flex items-center gap-2 col-span-2 md:col-span-1">
				<BiStopwatch />
				<input
					type="text"
					className="grow"
					placeholder="Session Duration"
					name="duration"
					required
				/>
			</label>
			<div></div>
			<button className="btn btn-success" type="submit">
				Submit
			</button>
		</form>
	);
};

export default CreateSession;
