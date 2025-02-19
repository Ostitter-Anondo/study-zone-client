import { Link } from "react-router";
import pageError from "../assets/page-error.png";
import { useState } from "react";

const NotFound = () => {
	const [isdark] = useState(JSON.parse(localStorage.getItem("isdark")));
	return (
		<>
			<div className="w-full flex flex-col items-center gap-12 my-12">
				<img src={pageError} alt="404" className="size-48" />
				<div className="w-8/12 flex flex-col gap-6 text-center">
					<h1 className="text-7xl font-black text-warning">oops...</h1>
					<h2 className="text-4xl font-semibold text-info">
						looks like we could not find the page you were looking for... wanna
						head back?
					</h2>
					<Link to={-1} className="btn btn-link btn-lg">
						Return to previous page
					</Link>
				</div>
			</div>
			<input
				type="checkbox"
				value="dim"
				checked={isdark}
				disabled
				className="toggle invisible theme-controller col-span-2 col-start-1 row-start-1 border-sky-400 bg-amber-300 [--tglbg:theme(colors.sky.500)] checked:border-blue-800 checked:bg-blue-300 checked:[--tglbg:theme(colors.blue.900)] mx-auto"
			/>
		</>
	);
};

export default NotFound;
