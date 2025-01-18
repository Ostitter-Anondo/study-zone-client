import { Link } from "react-router";
import pageError from "../assets/page-error.png";

const NotFound = () => {
  return (
    <>
      <div className="w-full flex flex-col items-center gap-12 my-12">
        <img src={pageError} alt="404" className="size-48" />
        <div className="w-8/12 flex flex-col gap-6 text-center">
          <h1 className="text-7xl font-black text-warning">oops...</h1>
          <h2 className="text-4xl font-semibold text-info">
            looks like we could not find the page you were looking for... wanna
            head back?
          </h2>
          <Link to={-1} className="btn btn-link btn-lg">
            Return to previous page
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
