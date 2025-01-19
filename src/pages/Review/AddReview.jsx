import { useForm } from "react-hook-form";
import useAxios from "../../utils/useAxios";
import useMainContext from "../../utils/useMainContext";
import ReactStars from "react-rating-stars-component";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const AddReview = () => {
	const { userData, toastSuc, toastErr } = useMainContext();
	const [rating, setRating] = useState(0);
	const { register, handleSubmit } = useForm();
	const navigate = useNavigate();
	const axiosHook = useAxios();
	const sessId = useParams().id;
	const ratingChanged = (newRating) => {
		setRating(newRating);
	};
	const onSubmit = (data) => {
		const body = {
			sessId,
			rating: rating,
			review: data.review,
			uid: userData.uid,
			photo: userData.photo,
			email: userData.email,
		};
		axiosHook
			.post("/review", body)
			.then((res) => {
				toastSuc(res.data.message);
				navigate(-1);
			})
			.catch((err) => {
				toastErr(err.message);
			});
	};
	return (
		<>
			<Helmet>
				<title>Add Review</title>
			</Helmet>
			<div>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="w-11/12 grid mx-auto gap-6"
				>
					<laber className="form-control">
						<div className="label">
							<span className="label-text-alt">Add a rating</span>
						</div>
						<ReactStars
							count={5}
							onChange={ratingChanged}
							size={24}
							isHalf={true}
							emptyIcon={<i className="far fa-star"></i>}
							halfIcon={<i className="fa fa-star-half-alt"></i>}
							fullIcon={<i className="fa fa-star"></i>}
							activeColor="#ffd700"
						/>
					</laber>
					<label className="form-control">
						<div className="label">
							<span className="label-text-alt">Write in markdown</span>
							<span className="label-text-alt">
								<a
									className="btn btn-link btn-xs p-0 min-h-0"
									href="https://www.markdownguide.org/cheat-sheet/"
									target="_blank"
								>
									Markdown Cheat Sheet
								</a>
							</span>
						</div>
						<textarea
							className="textarea textarea-lg min-h-72 textarea-bordered h-24"
							placeholder="Review"
							{...register("review", { required: true })}
							required
						></textarea>
					</label>
					<div></div>
					<button className="btn btn-success" type="submit">
						Submit
					</button>
				</form>
			</div>
		</>
	);
};

export default AddReview;
