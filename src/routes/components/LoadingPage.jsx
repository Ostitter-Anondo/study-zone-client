import { Link } from "react-router";

const LoadingPage = () => {
  return (
    <div className="text-5xl w-full h-screen flex flex-col gap-32 justify-center items-center">
      <span className="loading loading-ball loading-lg"></span>
      <div className="w-8/12 flex flex-col gap-6 text-center">
        <h1 className="text-7xl font-black text-warning">Please wait...</h1>
        <h2 className="text-4xl font-semibold text-info">
          looks like this is taking longer than expected... wanna head back?
        </h2>
        <Link to={-1} className="btn btn-link btn-lg">
          Return to previous page
        </Link>
      </div>
    </div>
  );
};

export default LoadingPage;
