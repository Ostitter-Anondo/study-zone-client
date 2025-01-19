import Markdown from "react-markdown";
import useGetMyNotes from "../../../utils/hooks/useGetMyNotes";

const AllNotes = () => {
	const [myNotes] = useGetMyNotes();
	return (
		<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
			{myNotes.map((note) => (
				<div key={note._id} className="card bg-base-200 w-full">
          <div className="prose lg:prose-xl card-body">
            <h3 className="card-title">{note.title}</h3>
            <Markdown>{note.note}</Markdown>
          </div>
        </div>
			))}
		</div>
	);
};

export default AllNotes;
