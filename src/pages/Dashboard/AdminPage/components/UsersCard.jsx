import PropTypes from "prop-types";
import useMainContext from "../../../../utils/useMainContext";
import useAxios from "../../../../utils/useAxios";
import useAllUsers from "../../../../utils/hooks/useAllUsers";

const UsersCard = ({ user }) => {
	const { userData, toastSuc } = useMainContext();
	const axiosHook = useAxios();
	const [, refetch] = useAllUsers("AllUsers");
	const changeRole = (role) => {
		axiosHook.put("/rolechange", { uid: user.uid, role: role }).then((res) => {
			toastSuc(res.data.message);
			refetch();
		});
	};

	return (
		<div className="flex flex-col md:flex-row items-center gap-6 bg-base-200 lg:w-7/12 justify-around rounded-md p-3">
			<img src={user?.photo} alt="userIMG" className="size-12 rounded-full" />
			<div className="flex flex-col items-center md:items-start">
				<h3 className="font-bold text-xl text-primary">
					{user?.name ? user.name : `unnamed user`}
				</h3>
				<h4 className="font-light pr-3">
					<span className="text-secondary">{user?.role}</span> | {user?.email}
				</h4>
			</div>
			<div className="flex flex-col gap-2 items-center">
				<h4 className="font-semibold text-lg">Change role to:</h4>
				<h4
					className={`font-light text-error pr-3 max-w-56 text-center ${
						userData.uid === user.uid ? "" : "hidden"
					}`}
				>
					own role can not be changed for safety reasons
				</h4>
				<div
					className={`flex gap-3 flex-wrap ${
						userData.uid === user.uid ? "hidden" : ""
					}`}
				>
					<button
						onClick={() => {
							changeRole("admin");
						}}
						className={`btn btn-xs btn-info ${
							user?.role === "admin" ? "hidden" : ""
						}`}
					>
						Admin
					</button>
					<button
						onClick={() => {
							changeRole("student");
						}}
						className={`btn btn-xs btn-success ${
							user?.role === "student" ? "hidden" : ""
						}`}
					>
						Student
					</button>
					<button
						onClick={() => {
							changeRole("instructor");
						}}
						className={`btn btn-xs btn-accent ${
							user?.role === "instructor" ? "hidden" : ""
						}`}
					>
						Instructor
					</button>
				</div>
			</div>
		</div>
	);
};

UsersCard.propTypes = {
	user: PropTypes.object,
};

export default UsersCard;
