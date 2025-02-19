import { FaRegUserCircle, FaSignOutAlt } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router";
import useMainContext from "../../../utils/useMainContext";
import { LuFiles, LuNotebook, LuNotebookPen } from "react-icons/lu";
import { VscGoToEditingSession } from "react-icons/vsc";

const StdNav = () => {
	const { signOutUser } = useMainContext();
	const navigate = useNavigate();
	return (
		<>
			<nav>
				<ul className="menu gap-3">
					<li className="border border-base-100 rounded p-1">
						<NavLink to={"/student"} end>
							<FaRegUserCircle />
							<span className="hidden md:block">Profile</span>
						</NavLink>
					</li>
					<li className="border border-base-100 rounded p-1">
						<NavLink to={"/student/note"}>
							<LuNotebookPen />
							<span className="hidden md:block">Create Note</span>
						</NavLink>
					</li>
					<li className="border border-base-100 rounded p-1">
						<NavLink to={"/student/mynotes"}>
							<LuNotebook />
							<span className="hidden md:block">My Notes</span>
						</NavLink>
					</li>
					<li className="border border-base-100 rounded p-1">
						<NavLink to={"/student/sessions"}>
							<VscGoToEditingSession />
							<span className="hidden md:block">My Sessions</span>
						</NavLink>
					</li>
					<li className="border border-base-100 rounded p-1">
						<NavLink to={"/student/materials"}>
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

export default StdNav;
