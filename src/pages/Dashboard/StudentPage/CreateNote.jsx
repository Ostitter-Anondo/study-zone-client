import { useForm } from "react-hook-form";
import useMainContext from "../../../utils/useMainContext";
import { MdTitle } from "react-icons/md";
import { BiEnvelope } from "react-icons/bi";
import useAxios from "../../../utils/useAxios";

const CreateNote = () => {
	const { userData, toastSuc, toastErr } = useMainContext();
	const { register, handleSubmit, resetField } = useForm();
	const axiosHook = useAxios();
	const onSubmit = (data) => {
		const body = {
			title: data.title,
			email: data.email,
			note: data.note,
			uid: userData.uid,
		};
		axiosHook
			.post("/notes", body)
			.then((res) => {
        resetField("title")
        resetField("note")
				toastSuc(res.data.message);
			})
			.catch((err) => {
				toastErr(err.message);
			});
	};
	return (
		<div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-11/12 grid mx-auto gap-6"
			>
				<label className="w-full input input-bordered flex items-center gap-2">
					<MdTitle />
					<input
						type="text"
						className="grow"
						placeholder="Title"
						{...register("title", { required: true })}
						required
					/>
				</label>
				<label className="w-full input input-disabled flex items-center gap-2 md:col-span-1">
					<BiEnvelope />
					<input
						type="text"
						className="grow"
						placeholder="Author Email"
						{...register("email", { required: true })}
						value={userData.email}
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
						placeholder="Notes"
						{...register("note", { required: true })}
						required
					></textarea>
				</label>
				<div></div>
				<button className="btn btn-success" type="submit">
					Submit
				</button>
			</form>
		</div>
	);
};

export default CreateNote;
