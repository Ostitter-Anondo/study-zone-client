import { useState } from "react";
import { Link } from "react-router";

const LoadingPage = () => {
	const [isdark] = useState(JSON.parse(localStorage.getItem("isdark")));
	return (
		<div className="text-5xl w-full min-h-screen flex flex-col gap-32 justify-center items-center">
			<span className="loading loading-ball loading-lg"></span>
			<progress className="progress w-72" />
			<div className="w-8/12 flex flex-col gap-6 text-center">
				<h1 className="text-7xl font-black text-warning">Please wait...</h1>
				<h2 className="text-4xl font-semibold text-info">
					looks like this is taking longer than expected... wanna head back?
				</h2>
				<Link to={-1} className="btn btn-link btn-lg">
					Return to previous page
				</Link>
			</div>
			<input
				type="checkbox"
				value="dim"
				checked={isdark}
				disabled
				className="toggle invisible theme-controller col-span-2 col-start-1 row-start-1 border-sky-400 bg-amber-300 [--tglbg:theme(colors.sky.500)] checked:border-blue-800 checked:bg-blue-300 checked:[--tglbg:theme(colors.blue.900)] mx-auto"
			/>
		</div>
	);
};

export default LoadingPage;
