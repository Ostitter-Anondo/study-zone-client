import { Helmet } from "react-helmet-async";
import Banner from "./Components/Banner";
import { Link, useLoaderData } from "react-router";
import Marquee from "react-fast-marquee";

const Home = () => {
	const homeData = useLoaderData().data;
	console.log(homeData);
	return (
		<>
			<Helmet>
				<title>Study Zone</title>
			</Helmet>
			<Banner />
			<div className="mx-6 my-12 border-l-8 border-secondary/70 bg-gradient-to-r from-secondary/50 to-base-100 w-fit p-3">
				<h1 className="font-bold text-3xl">
					Registrations For these sessions are ending soon!
				</h1>
			</div>
			<div className="my-6 w-11/12 mx-auto grid md:grid-cols-2 lg:grid-cols-3 place-items-center gap-6">
				{homeData.sessions.map((session) => (
					<div
						key={session._id}
						className="card flex flex-col gap-6 bg-base-300 p-6 items-center max-w-72 text-center"
					>
						<h1 className="font-extrabold text-4xl">{session.title}</h1>
						<h4 className="font-extralight text-lg">{session.email}</h4>
						<h3 className={`font-bold text-2xl text-success`}>
							Registration Ongoing
						</h3>
						<Link to={`/session/${session._id}`} className="btn btn-info">
							Details
						</Link>
					</div>
				))}
			</div>
			<div className="w-full flex justify-center items-center">
				<Link
					to={`/allsessions`}
					className="btn btn-lg btn-ghost mt-6 mb-12 border-0 border-b-8 border-base-300 min-h-0 h-fit py-2 px-3"
				>
					view more
				</Link>
			</div>
			<div className="my-12 h-24 flex flex-col justify-center bg-gradient-to-r from-base-200 via-base-100 to to-base-200">
				<div className="backdrop-blur-sm bg-gradient-to-r from-base-300/50 to-base-100/10 flex items-center w-fit -mb-16 p-5 z-50 rounded">
					<h3 className="font-bold text-2xl w-fit">Our instructors</h3>
				</div>
				<Marquee pauseOnHover={true}>
					<div className="flex justify-around items-center w-screen">
						{homeData.instructors.map((instructor) => (
							<div key={instructor._id} className="flex gap-3 bg-accent px-6 py-2 rounded-full">
								<img
									src={instructor.photo}
									className="size-12 rounded-full"
									alt=""
								/>
								<div>
									<h4>{instructor.name}</h4>
									<h4>{instructor.email}</h4>
								</div>
							</div>
						))}
					</div>
				</Marquee>
			</div>
		</>
	);
};

export default Home;
