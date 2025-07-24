import React from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_XnUVXcT65YQFYJOe88yYvrrh00gGazBh6a");

export default function Checkout() {
  return <div>Checkout</div>;
}
