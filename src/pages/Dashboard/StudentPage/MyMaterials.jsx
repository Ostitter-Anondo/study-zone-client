import Markdown from "react-markdown";
import useGetMyMaterials from "../../../utils/hooks/useGetMyMaterials";
import useMainContext from "../../../utils/useMainContext";
import NoData from "../components/NoData";

const MyMaterials = () => {
	const { booked } = useMainContext();
	const [myMaterials] = useGetMyMaterials(booked.wishlist);
	console.log(myMaterials);
	if (myMaterials.length === 0 || !myMaterials) {
		return <NoData />;
	}

	return (
		<div className="flex flex-col gap-6 items-center my-12">
			{myMaterials.map((material) => (
				<div
					key={material._id}
					className="card bg-base-200 p-6 flex flex-col gap-6 mx-auto items-center w-11/12 md:w-9/12 lg:w-7/12"
				>
					<h1 className="font-bold text-2xl">{material.title}</h1>
					<img className="max-h-36 mx-auto" src={material.imgUrl} alt="" />
					<div className="flex flex-wrap gap-3 justify-between w-full items-center">
						<h4 className="badge badge-secondary badge-sm mx-auto">
							{material.email}
						</h4>
						<a
							href={material.imgUrl}
							target="_blank"
							className="btn btn-xs btn-info mx-auto"
							download={material.imgUrl}
						>
							download image
						</a>
					</div>
					<div className="prose lg:prose-xl text-justify">
						<Markdown>{material.materials}</Markdown>
					</div>
				</div>
			))}
		</div>
	);
};

export default MyMaterials;
