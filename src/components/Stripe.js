import StripeCheckout from 'react-stripe-checkout';
import React, { useState } from 'react';


const Koko = () => {
  const [checkoutError, setCheckoutError] = useState(null);

  const handleToken = async (token) => {
    const response = await fetch('/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
      }),
    });

    const session = await response.json();

    if (session.error) {
      setCheckoutError(session.error);
      return;
    }

    // Redirect to the checkout page
    // window.location = session.url;
    console.log(session.url,"hello url")
  };

  return (
    <>
      <h1>Checkout</h1>
      <StripeCheckout
        token={handleToken}
        stripeKey="pk_test_51MyqLjSI2D9QZHezYIFaVUSl2k5tlTE15arkx9kL5KXP28icYwPN3cAOvBgIPbr99RGewzb8z9prrxpZyjVKkIUm00jsVLYcSI" // Replace with your own Stripe API key
        name="My Store"
        description="My Product"
        amount={100} // Replace with the price of your product in cents
        currency="USD"
        billingAddress={true}
      />
      {checkoutError && <p>Error: {checkoutError.message}</p>}
    </>
  );
};

export default Koko;
