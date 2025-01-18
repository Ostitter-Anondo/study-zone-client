import useMyMaterials from "../../../utils/hooks/useMyMaterials";
import useAxios from "../../../utils/useAxios";
import useMainContext from "../../../utils/useMainContext";
import NoData from "../components/NoData";
import EditMaterial from "./components/EditMaterial";
import MaterialDataCard from "./components/MaterialDataCard";

const AllMaterials = () => {
	const { userData, toastSuc, toastErr } = useMainContext();
	const axiosHook = useAxios();
	const [materials, refetch] = useMyMaterials(userData.email);
	const handleDelete = (id) => {
		axiosHook
			.delete(`/material/${id}`)
			.then((res) => {
				toastSuc(res.data.message);
				refetch();
			})
			.catch((err) => {
				toastErr(err.message);
			});
	};

	if (!materials || materials.length === 0) {
		return <NoData />;
	}
	return (
		<div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
			{materials.map((material) => (
				<div
					key={material._id}
					className="card w-full card-compact bg-base-100 shadow-xl"
				>
					<MaterialDataCard materialData={material} />
					<div className="flex w-full pr-6 pb-6 gap-3 justify-end">
						<button
							onClick={() => {
								document.getElementById(material._id + "matEdit").showModal();
							}}
							className="btn btn-info btn-xs w-fit"
						>
							Edit
						</button>
						<button
							onClick={() => {
								handleDelete(material._id);
							}}
							className="btn btn-error btn-xs w-fit"
						>
							Delete
						</button>
					</div>
					<dialog id={material._id + "matEdit"} className="modal">
						<div className="modal-box w-11/12 max-w-5xl">
							<form method="dialog">
								<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
									✕
								</button>
							</form>
							<h3 className="font-bold text-lg">
								Add material to {material.title}
							</h3>
							<p className="py-4">Are you sure you want to add materials?</p>
							<EditMaterial materialData={material} />
						</div>
					</dialog>
				</div>
			))}
		</div>
	);
};

export default AllMaterials;
