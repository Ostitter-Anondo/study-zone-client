import useAllSessions from "../../../utils/hooks/useAllSessions";
import NoData from "../components/NoData";
import SessionCard from "./components/SessionCard";

const ManageSessions = () => {
  const [sessions] = useAllSessions();
  if (sessions.length === 0 || !sessions) {
    return <NoData />
  }
  return (
    <div className="flex flex-col items-center gap-6 my-12">
      {sessions.map(pending => <SessionCard key={pending._id} session={pending} />)}
    </div>
  );
};

export default ManageSessions;