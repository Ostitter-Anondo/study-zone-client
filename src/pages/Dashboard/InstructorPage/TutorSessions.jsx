const TutorSessions = () => {
  return (
    <div className="flex flex-col gap-6 md:gap-12">
			<div className="collapse collapse-arrow bg-base-200">
				<input type="radio" name="my-accordion-2" defaultChecked />
				<div className="collapse-title text-xl font-medium">
					Approved Sessions
				</div>
				<div className="collapse-content">
					<p>hello</p>
				</div>
			</div>
			<div className="collapse collapse-arrow bg-base-200">
				<input type="radio" name="my-accordion-2" />
				<div className="collapse-title text-xl font-medium">
					Rejected Sessions
				</div>
				<div className="collapse-content">
					<p>hello</p>
				</div>
			</div>
		</div>
  );
};

export default TutorSessions;