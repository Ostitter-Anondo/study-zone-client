import { FaRegUserCircle, FaSignOutAlt } from "react-icons/fa";
import { LuFiles } from "react-icons/lu";
import { VscEditSession, VscGoToEditingSession } from "react-icons/vsc";
import { NavLink, useNavigate } from "react-router";
import useMainContext from "../../../../utils/useMainContext";
import { RiFileAddLine } from "react-icons/ri";

const InstNav = () => {
	const { signOutUser } = useMainContext();
	const navigate = useNavigate();

	return (
		<>
			<nav>
				<ul className="menu gap-3">
					<li className="border border-base-100 rounded p-1">
						<NavLink to={"/instructor"} end>
							<FaRegUserCircle />
							<span className="hidden md:block">Profile</span>
						</NavLink>
					</li>
					<li className="border border-base-100 rounded p-1">
						<NavLink to={"/instructor/session"}>
							<VscEditSession />
							<span className="hidden md:block">Create Sessions</span>
						</NavLink>
					</li>
					<li className="border border-base-100 rounded p-1">
						<NavLink to={"/instructor/mysessions"}>
							<VscGoToEditingSession />
							<span className="hidden md:block">My Sessions</span>
						</NavLink>
					</li>
					<li className="border border-base-100 rounded p-1">
						<NavLink to={"/instructor/addmaterial"}>
							<RiFileAddLine />
							<span className="hidden md:block">Add Material</span>
						</NavLink>
					</li>
					<li className="border border-base-100 rounded p-1">
						<NavLink to={"/instructor/mymaterials"}>
							<LuFiles />
							<span className="hidden md:block">My Materials</span>
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
				<FaSignOutAlt />
				<span className="hidden md:block">Sign Out</span>
			</button>
		</>
	);
};

export default InstNav;
