import useMyMaterials from "../../../utils/hooks/useMyMaterials";
import useAxios from "../../../utils/useAxios";
import useMainContext from "../../../utils/useMainContext";
import NoData from "../components/NoData";
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
    return <NoData />
  }
	return (
		<div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
			{materials.map((material) => (
				<div
					key={material._id}
					className="card w-full card-compact bg-base-100 shadow-xl"
				>
					<MaterialDataCard materialData={material} />
					<div className="flex w-full pr-6 pb-6 justify-end">
						<button
							onClick={() => {
								handleDelete(material._id);
							}}
							className="btn btn-error btn-xs w-fit"
						>
							Delete
						</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default AllMaterials;
