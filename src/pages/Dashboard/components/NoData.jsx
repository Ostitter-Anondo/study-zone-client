import notFound from "./assets/not-found.png";

const NoData = () => {
	return (
		<div className="my-11">
			<div className="size-72 mx-auto my-0">
				<img src={notFound} alt="notfound" />
			</div>
			<div className="w-7/12 mx-auto flex flex-col gap-6">
				<h1 className="font-extrabold text-7xl text-center text-secondary">
					Uh oh...
				</h1>
				<h1 className="font-extrabold text-3xl text-center text-accent">
					The data you were looking for seems to be presently unavailable!
				</h1>
			</div>
		</div>
	);
};

export default NoData;
