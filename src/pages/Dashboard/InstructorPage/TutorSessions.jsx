import useMySessions from "../../../utils/hooks/useMySessions";
import useMainContext from "../../../utils/useMainContext";
import NoData from "../components/NoData";
import TutorSessionCard from "./components/TutorSessionCard";

const TutorSessions = () => {
  const {userData} = useMainContext();
  const [sessions] = useMySessions(userData.uid);
  if (sessions.length === 0 || !sessions) {
    return <NoData />
  }
  return (
    <div className="flex flex-col items-center gap-6">
      {sessions.map(pending => <TutorSessionCard key={pending._id} session={pending} />)}
    </div>
  );
};

export default TutorSessions;