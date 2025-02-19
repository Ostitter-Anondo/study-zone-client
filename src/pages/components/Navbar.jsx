import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { Link, NavLink, useNavigate } from "react-router";
import study from "../../assets/study.png";
import useMainContext from "../../utils/useMainContext";
import { useEffect, useState } from "react";

const Navbar = () => {
	const { userData, signOutUser } = useMainContext();

	const navigate = useNavigate();

	const [isdark, setIsdark] = useState(
		JSON.parse(localStorage.getItem("isdark"))
	);
	useEffect(() => {
		localStorage.setItem("isdark", JSON.stringify(isdark));
	}, [isdark]);

	const links = (
		<>
			<li>
				<NavLink to={"/"}>Home</NavLink>
			</li>
			<li>
				<NavLink to={"/allsessions"}>All Sessions</NavLink>
			</li>
			<li>
				<NavLink to={"/announcements"}>Announcements</NavLink>
			</li>
			<li>
				<input
					type="checkbox"
					value="dim"
					checked={isdark}
					onChange={() => setIsdark(!isdark)}
					className="toggle theme-controller col-span-2 col-start-1 row-start-1 border-sky-400 bg-amber-300 [--tglbg:theme(colors.sky.500)] checked:border-blue-800 checked:bg-blue-300 checked:[--tglbg:theme(colors.blue.900)] mx-auto"
				/>
			</li>
		</>
	);

	const authtBtns = (
		<>
			<ul className="menu menu-horizontal p-1 items-center border border-base-300 rounded-xl">
				<li>
					<NavLink
						to="/login"
						className="border-r border-base-300 rounded-r-none rounded-l-lg"
					>
						Log in
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/signup"
						className="border-l border-base-300 rounded-r-lg rounded-l-none"
					>
						Sign up
					</NavLink>
				</li>
			</ul>
		</>
	);

	const userBtns = (
		<>
			<div className="menu menu-horizontal justify-center items-center gap-3 sm:border border-base-300 bg-base-200 rounded-full">
				<Link className="btn btn-circle size-12 p-1" to="/dashboard">
					<img
						src={
							userData?.photo
								? userData.photo
								: "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
						}
						className="object-fill aspect-square rounded-full"
						alt="usrIMG"
					/>
				</Link>
				<button
					onClick={() => {
						signOutUser();
						navigate("/");
					}}
					className="btn btn-outline btn-error rounded-full"
				>
					Sign Out
				</button>
			</div>
		</>
	);

	return (
		<>
			<div className="navbar bg-base-300/30 backdrop-blur">
				<div className="navbar-start">
					<div className="dropdown">
						<div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
							<BsFillMenuButtonWideFill />
						</div>
						<ul
							tabIndex={0}
							className="menu menu-sm dropdown-content bg-base-100/30 backdrop-blur-lg border border-base-300 rounded-box z-[1] mt-3 w-52 p-2 shadow gap-2"
						>
							{links}
						</ul>
					</div>
					<Link to="/" className="btn btn-ghost text-xl">
						<img src={study} className="size-8" alt="" />{" "}
						<span className="hidden md:block">Study Zone</span>
					</Link>
				</div>
				<div className="navbar-center hidden lg:flex">
					<ul className="menu menu-horizontal px-1 border border-base-300 rounded-lg items-center gap-2">
						{links}
					</ul>
				</div>
				<div className="navbar-end">{userData ? userBtns : authtBtns}</div>
			</div>
		</>
	);
};

export default Navbar;
