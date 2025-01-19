import PropTypes from "prop-types";
import { MdTitle } from "react-icons/md";
import useMainContext from "../../../../utils/useMainContext";
import { useForm } from "react-hook-form";
import useAxios from "../../../../utils/useAxios";
import useGetMyNotes from "../../../../utils/hooks/useGetMyNotes";

const EditNote = ({ noteData }) => {
	const [, refetch] = useGetMyNotes();
	const { toastSuc, toastErr } = useMainContext();
	const { register, handleSubmit } = useForm();
	const axiosHook = useAxios();
	const onSubmit = (data) => {
		const body = {
			title: data.title,
			note: data.note,
		};
		axiosHook
			.put(`/notes?noteId=${noteData._id}`, body)
			.then((res) => {
				toastSuc(res.data.message);
        refetch();
				document.getElementById(noteData._id + "edit").close();
			})
			.catch((err) => {
				toastErr(err.message);
			});
	};

	return (
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
					defaultValue={noteData.title}
					required
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
					defaultValue={noteData.note}
					required
				></textarea>
			</label>
			<div></div>
			<button className="btn btn-success" type="submit">
				Submit
			</button>
		</form>
	);
};

EditNote.propTypes = {
	noteData: PropTypes.object,
};

export default EditNote;
