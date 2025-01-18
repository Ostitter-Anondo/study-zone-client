import PropTypes from "prop-types";
import useGetMaterial from "../../../../utils/hooks/useGetMaterial";
import AddMaterial from "./AddMaterial";
import MaterialDataCard from "./MaterialDataCard";

const MaterialCard = ({ session }) => {
	const [material] = useGetMaterial(session._id);

	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-7 gap-3 items-center justify-around bg-base-200 w-11/12 rounded-md p-3">
				<div className="flex flex-col gap-2 md:col-span-2">
					<h3 className="font-bold text-xl text-primary">{session.title}</h3>
				</div>
				<div className={`flex flex-col gap-2 md:col-span-2`}>
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
				<div className="flex md:col-span-2 gap-3 flex-wrap justify-center">
					<span className="badge badge-info badge-lg">${session.price}</span>
					<span
						className={`badge badge-success badge-lg btn-info ${
							!material ? "hidden" : ""
						}`}
					>
						Materials Available
					</span>
					<span
						className={`badge badge-error badge-lg btn-info ${
							!material ? "" : "hidden"
						}`}
					>
						Materials Unvailable
					</span>
				</div>
				<div className="flex justify-end md:justify-center gap-3 flex-wrap">
					<button
						onClick={() =>
							document.getElementById(session._id + "matView").showModal()
						}
						className={`btn btn-xs btn-info ${!material ? "hidden" : ""}`}
					>
						View Materials
					</button>
					<button
						onClick={() =>
							document.getElementById(session._id + "matAdd").showModal()
						}
						className={`btn btn-xs btn-info ${!material ? "" : "hidden"}`}
					>
						Add Materials
					</button>
				</div>
			</div>

			<dialog id={session._id + "matAdd"} className="modal">
				<div className="modal-box w-11/12 max-w-5xl">
					<form method="dialog">
						<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
							✕
						</button>
					</form>
					<h3 className="font-bold text-lg">Add material to {session.title}</h3>
					<p className="py-4">Are you sure you want to add materials?</p>
					<AddMaterial sessId={session._id} />
				</div>
			</dialog>
			<dialog id={session._id + "matView"} className="modal overflow-scroll">
				<div className="modal-box">
					<form method="dialog">
						<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
							✕
						</button>
					</form>
					<MaterialDataCard materialData={material} />
				</div>
			</dialog>
		</>
	);
};

MaterialCard.propTypes = {
	session: PropTypes.object,
};

export default MaterialCard;
