import PropTypes from "prop-types";
import Markdown from "react-markdown";

const MaterialDataCard = ({ materialData }) => {
	return (
		<>
			<figure className="px-10 pt-10">
				<img
					src={materialData.imgUrl}
					alt="material img"
					className="rounded-xl"
				/>
			</figure>
			<div className="card-body items-center text-center prose xl:prose-xl">
				<h2 className="card-title">{materialData.title}</h2>
				<Markdown className="max-w-96 break-all">
					{materialData.materials}
				</Markdown>
			</div>
		</>
	);
};

MaterialDataCard.propTypes = {
	materialData: PropTypes.object,
};

export default MaterialDataCard;
