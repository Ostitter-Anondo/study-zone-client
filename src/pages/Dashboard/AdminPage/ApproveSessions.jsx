import usePendingSessions from "../../../utils/hooks/usePendingSessions";
import SessionCard from "./components/SessionCard";

const ApproveSessions = () => {
  const [pendings] = usePendingSessions();
  
  return (
    <div className="flex flex-col items-center gap-6">
      {pendings.map(pending => <SessionCard key={pending._id} session={pending} />)}
    </div>
  );
};

export default ApproveSessions;