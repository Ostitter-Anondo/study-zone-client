import PropTypes from "prop-types";
import useMainContext from "../../../../utils/useMainContext";
import { BiEnvelope } from "react-icons/bi";
import { LuKeyRound } from "react-icons/lu";
import { MdTitle } from "react-icons/md";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAxios from "../../../../utils/useAxios";
import useGetMaterial from "../../../../utils/hooks/useGetMaterial";

const imgKey = import.meta.env.VITE_imgbb;
const imgApi = `https://api.imgbb.com/1/upload?key=${imgKey}`;

const AddMaterial = ({ sessId, materialData }) => {
	const { userData, toastSuc, toastErr } = useMainContext();
	const { register, handleSubmit } = useForm();
	const [, refetch] = useGetMaterial(sessId);
	const axiosHook = useAxios();
	const onSubmit = async (data) => {
		console.log(data);
		const imgFile = { image: data.photo[0] };
		console.log(imgFile);
		const res = await axios
			.post(imgApi, imgFile, {
				headers: { "content-type": "multipart/form-data" },
			})
			.catch((err) => toastErr(err.message));
		if (res.data.success) {
			console.log(res);
			const body = {
				title: data.title,
				email: data.email,
				sessId: data.sessId,
				materials: data.materials,
				imgUrl: res.data.data.display_url,
				imgDel: res.data.data.delete_url,
			};
			const materialRes = await axiosHook.put("/material", body);
			materialRes?.data?.message
				? toastSuc(materialRes.data.message)
				: toastErr("nothing happened");
      refetch();
      document.getElementById(sessId + "matAdd").close();
		}
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
			<label className="w-full input input-disabled flex items-center gap-2 md:col-span-1">
				<LuKeyRound />
				<input
					type="text"
					className="grow"
					placeholder="SessionId"
					{...register("sessId", { required: true })}
					value={sessId}
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
					placeholder="Material Links"
					{...register("materials", { required: true })}
					required
					defaultValue={materialData ? materialData.materials : ""}
				></textarea>
			</label>
			<div className="grid gap-3 md:grid-cols-2 items-end">
				<label className="form-control w-full max-w-xs">
					<div className="label">
						<span className="label-text">Add an image</span>
					</div>
					<input
						type="file"
						className="file-input file-input-bordered w-full max-w-xs"
						{...register("photo", { required: true })}
						required={true}
					/>
				</label>
				<button className="btn btn-success" type="submit">
					Submit
				</button>
			</div>
		</form>
	);
};

AddMaterial.propTypes = {
	sessId: PropTypes.string,
	materialData: PropTypes.object,
};

export default AddMaterial;
