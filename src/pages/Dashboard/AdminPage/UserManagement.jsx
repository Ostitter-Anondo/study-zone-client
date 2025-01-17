import useAllUsers from "../../../utils/hooks/useAllUsers";
import UsersCard from "./components/UsersCard";

const UserManagement = () => {
	const [users] = useAllUsers();

	return (
		<>
			<div className="flex flex-col items-center gap-6">
				{users.map((user) => (
					<UsersCard key={user.uid} user={user} />
				))}
			</div>
		</>
	);
};

export default UserManagement;
