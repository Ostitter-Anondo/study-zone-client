import { useState } from "react";
import { Helmet } from "react-helmet-async";

const AllSessions = () => {
	const itemsPerPage = 6;
	const [page, setPage] = useState(0);
	return (
		<>
			<Helmet>
				<title>All Sessions</title>
			</Helmet>
			<div className="w-full h-screen flex flex-col justify-between">
        <div>
          <button className="btn"></button>
        </div>
				<div className="join mx-auto my-12">
					{[...Array(6).keys()].map(item=><button key={item} onClick={()=>setPage(item)} className={`join-item btn btn-sm ${item===page?"btn-active":""}`}>{item+1}</button>)}
				</div>
			</div>
		</>
	);
};

export default AllSessions;
