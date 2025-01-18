import PropTypes from "prop-types";
import useMainContext from "../../../../utils/useMainContext";
import { MdTitle } from "react-icons/md";
import { useForm } from "react-hook-form";
import useAxios from "../../../../utils/useAxios";
import useMyMaterials from "../../../../utils/hooks/useMyMaterials";

const EditMaterial = ({ materialData }) => {
	const { toastSuc, toastErr } = useMainContext();
	const { register, handleSubmit } = useForm();
	const [, refetch] = useMyMaterials(materialData.email);
	const axiosHook = useAxios();
	const onSubmit = async (data) => {
		console.log(data);
		const body = {
			title: data.title,
			materials: data.materials,
      sessId: materialData.sessId
		};
		await axiosHook.put("/material", body).then((res) => {
			toastSuc(res.data.message);
			refetch();
			document.getElementById(materialData._id + "matEdit").close();
		})
    .catch(err=>{toastErr(err.message)});
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
					required
					defaultValue={materialData ? materialData.title : ""}
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
					placeholder="Material Links"
					{...register("materials", { required: true })}
					required
					defaultValue={materialData ? materialData.materials : ""}
				></textarea>
			</label>
			<div></div>
			<button className="btn btn-success" type="submit">
				Submit
			</button>
		</form>
	);
};

EditMaterial.propTypes = {
	sessId: PropTypes.string,
	materialData: PropTypes.object,
};

export default EditMaterial;
