import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useMainContext from "../../utils/useMainContext";
import { useEffect, useState } from "react";
import useAxios from "../../utils/useAxios";

const CheckoutForm = () => {
	const stripe = useStripe();
	const elements = useElements();
	const { toastErr, paymentInfo, userData, toastSuc, booked, setBooked } = useMainContext();
	const axiosHook = useAxios();
	const [clientSecret, setClientSecret] = useState("");
	const [trxData, setTrxData] = useState(null);

	useEffect(() => {
		axiosHook
			.post("/create-payment-intent", { price: paymentInfo.price })
			.then((res) => {
				setClientSecret(res.data.clientSecret);
			})
			.catch((err) => {
				toastErr(err.message);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [axiosHook, paymentInfo]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!stripe || !elements) {
			return;
		}
		const card = elements.getElement(CardElement);
		if (!card) {
			return;
		}

		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card,
		});
		if (error) {
			toastErr(error.message);
		} else {
			console.log(paymentMethod);
		}
		const { paymentIntent, error: confirmErr } =
			await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: card,
					billing_details: {
						email: userData?.email || "anon@mail",
						name: userData?.name || "anon",
					},
				},
			});
		if (confirmErr) {
			toastErr(confirmErr.message);
		} else {
			if (paymentIntent.status === "succeeded") {
				setTrxData({
					cost: paymentIntent.amount / 100,
					time: new Date(paymentIntent.created).toDateString(),
					currency: paymentIntent.currency,
					id: paymentIntent.id,
					title: paymentInfo.title,
				});
				const body = { wishlist: [...booked.wishlist, paymentInfo.sessId] };
				axiosHook
					.put("/booking", body)
					.then((res) => {
						toastSuc(res.data.message);
						setBooked(res.data.booked);
					})
					.catch((err) => {
						toastErr(err.message);
					});
				toastSuc("purchase success");
			}
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit} className="flex flex-col gap-12">
				<CardElement
					options={{
						style: {
							base: {
								fontSize: "16px",
								backgroundColor: "#aaddfb",
								color: "#424770",
								padding: "16px",

								"::placeholder": {
									color: "#aab7c4",
								},
							},
							invalid: {
								color: "#9e2146",
							},
						},
					}}
				/>
				<button
					type="submit"
					className="btn btn-block btn-primary"
					disabled={!stripe || !clientSecret || clientSecret === ""}
				>
					Pay
				</button>
			</form>
			<div
				className={`flex flex-col items-center gap-3 my-12 ${
					trxData ? "" : "hidden"
				}`}
			>
				<h2 className="font-semibold text-lg text-success">
					Transaction Successful!
				</h2>
				<h2 className="font-semibold text-xl text-warning">Receipt</h2>
				<label className="form-control w-full max-w-xs">
					<div className="label">
						<span className="label-text">Transaction ID</span>
					</div>
					<h3 className="input input-bordered w-full max-w-xs flex items-center">
						{trxData ? trxData.id : "n/a"}
					</h3>
				</label>
				<label className="form-control w-full max-w-xs">
					<div className="label">
						<span className="label-text">Item</span>
					</div>
					<h3 className="input input-bordered w-full max-w-xs flex items-center">
						{trxData ? trxData.title : "n/a"}
					</h3>
				</label>
				<label className="form-control w-full max-w-xs">
					<div className="label">
						<span className="label-text">Charge</span>
					</div>
					<h3 className="input input-bordered w-full max-w-xs flex items-center">
						{trxData ? trxData.cost.toFixed(2) : "n/a"}{" "}
						{trxData ? trxData.currency : ""}
					</h3>
				</label>
				<label className="form-control w-full max-w-xs">
					<div className="label">
						<span className="label-text">Billed at</span>
					</div>
					<h3 className="input input-bordered w-full max-w-xs flex items-center">
						{trxData ? trxData.time : "n/a"}
					</h3>
				</label>
			</div>
		</>
	);
};

export default CheckoutForm;
