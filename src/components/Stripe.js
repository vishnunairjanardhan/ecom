import StripeCheckout from 'react-stripe-checkout';
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

let YOUR_DOMAIN = 'http://localhost:3000'
const stripe_key = process.env.REACT_APP_PUBLIC_STRIPE_API_KEY;


let stripePromise_1;
const getStripe = () => {
  if (!stripePromise_1) {
    stripePromise_1 = loadStripe(stripe_key)
  }
  return stripePromise_1;
}

const Koko = () => {



  const [checkoutError, setCheckoutError] = useState(null);

  const handleToken = async (token) => {
    console.log(token)
    const response = await fetch('/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token
      }),
      // mode: 'payment',
      success_url: YOUR_DOMAIN + '?success=true',
      cancel_url: YOUR_DOMAIN + '?canceled=true',

    });

    const session = await response.json();
    console.log(session,"hello url")

    if (session.error) {
      setCheckoutError(session.error);
      return;
    }

    // Redirect to the checkout page
    window.location = session.url;

  };


  // starting loadStripe

  // const items = {
  //   price: "price_1N02SoSI2D9QZHez1ScJ4aTm",
  //   quantity: 1,
  // }

  // const checkoutOptions_1 = {
  //   lineItems: [items],
  //   mode: 'payment',
  //   successUrl: `${window.location.origin}/success`,
  //   cancelUrl: `${window.location.origin}/cancel`
  // }


  // const redirectToCheckout_1 = async () => {
  //   console.log("redirectToCheckout");
  //   const stripe_1 = await getStripe()
  //   const { error } = await stripe_1.redirectToCheckout(checkoutOptions_1);
  //   console.log("stripe chekout error", error)
  // }
  // Ending loadStripe
  return (
    <>
      <h1>Checkout</h1>
      <StripeCheckout
        token={handleToken}
        stripeKey="pk_test_51MyqLjSI2D9QZHezYIFaVUSl2k5tlTE15arkx9kL5KXP28icYwPN3cAOvBgIPbr99RGewzb8z9prrxpZyjVKkIUm00jsVLYcSI" // Replace with your own Stripe API key
        name="My Store"
        description="My Product"
        amount={1000000} // Replace with the price of your product in cents
        currency="USD"
        billingAddress={true}
      />
      {checkoutError && <p>Error: {checkoutError.message}</p>}
      {/* <button onClick={redirectToCheckout_1}>click here</button> */}
    </>
  );
};

export default Koko;
