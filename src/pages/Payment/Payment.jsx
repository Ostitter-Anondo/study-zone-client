import { loadStripe } from "@stripe/stripe-js";
import useMainContext from "../../utils/useMainContext";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_stripe);

const Payment = () => {
	const { paymentInfo } = useMainContext();
	console.log(paymentInfo);
	if (!paymentInfo) {
		return <>fny</>;
	}

	return (
		<div className="my-12 w-11/12 mx-auto">
			<Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
		</div>
	);
};

export default Payment;
