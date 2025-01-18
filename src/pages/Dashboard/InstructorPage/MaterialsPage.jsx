import useMyApproved from "../../../utils/hooks/useMyApproved";
import useMainContext from "../../../utils/useMainContext";
import NoData from "../components/NoData";
import MaterialCard from "./components/MaterialCard";

const MaterialsPage = () => {
  const {userData} = useMainContext();
  const [materialSessions] = useMyApproved(userData.uid);
  console.log(materialSessions)
  if (materialSessions.length === 0 || !materialSessions) {
    return <NoData />
  }
  return (
    <div className="flex flex-col items-center gap-6">
      {materialSessions.map(session=> <MaterialCard key={session._id} session={session} />)}
    </div>
  );
};

export default MaterialsPage;