import { NavLink, useNavigate } from "react-router";
import useMainContext from "../../../../utils/useMainContext";
import { FaRegUserCircle, FaSignOutAlt, FaUsers } from "react-icons/fa";
import { VscEditSession } from "react-icons/vsc";
import { LuFiles } from "react-icons/lu";
import { TfiAnnouncement } from "react-icons/tfi";

const BigNav = () => {
	const { signOutUser } = useMainContext();
	const navigate = useNavigate();
	return (
		<>
			<nav>
				<ul className="menu gap-3">
					<li className="border border-base-100 rounded p-1">
						<NavLink to={"/admin"} end>
							<FaRegUserCircle />
							<span className="hidden md:block">Profile</span>
						</NavLink>
					</li>
					<li className="border border-base-100 rounded p-1">
						<NavLink to={"/admin/users"}>
							<FaUsers />
							<span className="hidden md:block">Manage Users</span>
						</NavLink>
					</li>
					<li className="border border-base-100 rounded p-1">
						<NavLink to={"/admin/sessions"}>
							<VscEditSession />
							<span className="hidden md:block">Manage Sessions</span>
						</NavLink>
					</li>
					<li className="border border-base-100 rounded p-1">
						<NavLink to={"/admin/materials"}>
							<LuFiles />
							<span className="hidden md:block">Manage Materials</span>
						</NavLink>
					</li>
					<li className="border border-base-100 rounded p-1">
						<NavLink to={"/admin/announcement"}>
							<TfiAnnouncement />
							<span className="hidden md:block">Make Announcement</span>
						</NavLink>
					</li>
				</ul>
			</nav>
			<button
				onClick={() => {
					signOutUser();
					navigate("/");
				}}
				className="btn btn-lg btn-outline btn-error rounded-lg mb-12"
			>
				<FaSignOutAlt /><span className="hidden md:block">Sign Out</span>
			</button>
		</>
	);
};

export default BigNav;
