import "./Banner.css";

const Banner = () => {
  return (
    <div className="banner-container bg-fixed bg-center bg-base-300/50 bg-blend-multiply image-full w-full">
      <div className="card-body h-full flex flex-col justify-between">
        <div className="lg:w-7/12 backdrop-blur-sm p-7 rounded flex flex-col gap-6 text-justify">
          <h1 className="font-extrabold text-5xl text-secondary">Distraction Free Learning</h1>
          <p className="font-medium text-lg">
            Start learning today, with full focus and zero distractions, our
            innovative website design means you really won&apos;t want to do
            anything else. Learning can be fun and easy, and our website makes
            it happen in realtime!
          </p>
        </div>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Get Started!</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
