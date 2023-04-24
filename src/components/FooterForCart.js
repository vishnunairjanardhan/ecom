import React from 'react'
import { Link } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js';


const stripe_key = process.env.REACT_APP_PUBLIC_STRIPE_API_KEY;

let stripePromise_1;
const getStripe = () => {
    if (!stripePromise_1) {
        stripePromise_1 = loadStripe(stripe_key)
    }
    return stripePromise_1;
}
const FooterForCart = () => {


    const items = {
        price: "price_1N02SoSI2D9QZHez1ScJ4aTm",
        quantity: 1,
    }

    const items_v1 = {
        price: "price_1N0J1WSI2D9QZHez0Nn9V9H2",
        quantity: 3,
    }

    const checkoutOptions_1 = {
        lineItems: [items,items_v1],
        mode: 'payment',
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/cancel`
    }


    const redirectToCheckout_1 = async () => {
        console.log("redirectToCheckout");
        const stripe_1 = await getStripe()
        const { error } = await stripe_1.redirectToCheckout(checkoutOptions_1);
        console.log("stripe chekout error", error)
    }
    return (
        <>
            <div class="card text-center">
                <div class="card-footer text-muted">
                    {/* <Link to="/Koko" type="button" class="btn btn-info" onClick={"redirectToCheckout_1"}>Order now</Link> */}
                    <button type="button" class="btn btn-info" onClick={redirectToCheckout_1}>Order now</button>
                </div>
            </div>
        </>
    )
}

export default FooterForCart