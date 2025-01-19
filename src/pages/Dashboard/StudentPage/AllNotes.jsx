import Markdown from "react-markdown";
import useGetMyNotes from "../../../utils/hooks/useGetMyNotes";
import EditNote from "./components/EditNote";
import useAxios from "../../../utils/useAxios";
import useMainContext from "../../../utils/useMainContext";
import NoData from "../components/NoData";

const AllNotes = () => {
	const [myNotes, refetch] = useGetMyNotes();
	const { toastSuc, toastErr } = useMainContext();
	const axiosHook = useAxios();
	console.log(myNotes);
  if (!myNotes || myNotes.length === 0) {
    return <NoData />
  }
	return (
		<>
			<div className="grid mx-auto md:w-9/12 lg:w-7/12 gap-6">
				{myNotes.map((note) => (
					<div key={note._id} className="card bg-base-200 w-full">
						<div className="prose lg:prose-xl card-body">
							<h3 className="card-title">{note.title}</h3>
							<Markdown>{note.note}</Markdown>
						</div>
						<div className="card-actions p-3 justify-end">
							<button
								className="btn btn-outline btn-info btn-sm"
								onClick={() =>
									document.getElementById(note._id + "edit").showModal()
								}
							>
								edit
							</button>
							<button
								className="btn btn-outline btn-error btn-sm"
								onClick={() =>
									document.getElementById(note._id + "delete").showModal()
								}
							>
								delete
							</button>
							<dialog id={`${note._id}edit`} className="modal">
								<div className="modal-box w-11/12 max-w-5xl">
									<form method="dialog">
										<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
											✕
										</button>
									</form>
									<h3 className="font-bold text-lg text-center my-6">
										Edit Note
									</h3>
									<EditNote noteData={note} />
								</div>
							</dialog>
							<dialog id={`${note._id}delete`} className="modal">
								<div className="modal-box">
									<form method="dialog">
										<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
											✕
										</button>
									</form>
									<h3 className="font-bold text-lg text-center text-warning my-6">
										Are you sure you want to delete this note?
									</h3>
									<div className="flex justify-around">
										<form method="dialog">
											<button className="btn btn-outline btn-sm btn-info">
												Cancel
											</button>
										</form>
										<button
											onClick={() => {
												axiosHook
													.delete(`/notes?noteId=${note._id}`)
													.then((res) => {
														toastSuc(res.data.message);
														refetch();
													})
													.catch((err) => {
														toastErr(err.message);
													});
											}}
											className="btn btn-error btn-sm"
										>
											Confirm
										</button>
									</div>
								</div>
							</dialog>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default AllNotes;
