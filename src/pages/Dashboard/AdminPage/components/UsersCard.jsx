import PropTypes from "prop-types";

const UsersCard = ({ user }) => {
	return (
		<div className="flex flex-col md:flex-row items-center gap-6 bg-base-200 lg:w-7/12 justify-around rounded-md p-3">
			<img
				src={user?.photo}
        alt='userIMG'
				className="size-12 rounded-full"
			/>
			<div className="flex flex-col items-center md:items-start">
				<h3 className="font-bold text-xl text-primary">{user?.name? user.name:`unnamed user`}</h3>
				<h4 className="font-light pr-3">
					<span className="text-secondary">{user?.role}</span> | {user?.email}
				</h4>
			</div>
			<div className="flex flex-col gap-2 items-center">
        <h4 className="font-semibold text-lg">Change role to:</h4>
				<div className="flex gap-3 flex-wrap">
					<button className={`btn btn-xs btn-info ${user?.role==="admin"?'hidden':''}`}>Admin</button>
					<button className={`btn btn-xs btn-success ${user?.role==="student"?'hidden':''}`}>Student</button>
					<button className={`btn btn-xs btn-accent ${user?.role==="instructor"?'hidden':''}`}>Instructor</button>
				</div>
			</div>
		</div>
	);
};

UsersCard.propTypes = {
	user: PropTypes.object,
};

export default UsersCard;
