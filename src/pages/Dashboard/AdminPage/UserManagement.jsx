import { useState } from "react";
import useAllUsers from "../../../utils/hooks/useAllUsers";
import UsersCard from "./components/UsersCard";
import { BiSearch } from "react-icons/bi";

const UserManagement = () => {
	const [searchTerm, setSearchTerm] = useState("AllUsers");
	const [users, refetch] = useAllUsers(searchTerm);

	const doSearch = () => {
		console.log(searchTerm)
		if (searchTerm === "") {
			setSearchTerm("AllUsers");
			refetch();
		} else {
			refetch();
		}
	};

	return (
		<div className="my-12">
			<div className="mx-auto w-fit mb-12">
				<div className="join">
					<label className="input input-bordered input-secondary flex items-center w-full max-w-xs join-item">
						<input
							type="text"
							onKeyUp={(e)=>setSearchTerm(e.target.value===""?"AllUsers":e.target.value)}
							placeholder="Search"
							className="grow items-center"
						/>
					</label>
					<button
						className="btn btn-outline btn-secondary join-item"
						onClick={doSearch}
					>
						<BiSearch />
					</button>
				</div>
			</div>
			<div className="flex flex-col items-center gap-6">
				{users.map((user) => (
					<UsersCard key={user.uid} user={user} />
				))}
			</div>
		</div>
	);
};

export default UserManagement;
