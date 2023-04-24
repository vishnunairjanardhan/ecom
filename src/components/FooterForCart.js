import React from 'react'
import { Link } from 'react-router-dom'
import { loadStripe} from '@stripe/stripe-js';
import {useStripe} from '@stripe/react-stripe-js';



const stripe_key = process.env.REACT_APP_PUBLIC_STRIPE_API_KEY;

let stripePromise_1;
const getStripe = () => {
    if (!stripePromise_1) {
        stripePromise_1 = loadStripe(stripe_key)
    }
    return stripePromise_1;
}
const FooterForCart = () => {
const stripe = useStripe();

    const items = {
        price: "price_1N02SoSI2D9QZHez1ScJ4aTm",
        quantity: 1,
    }

    const items_v1 = {
        price: "price_1N0J1WSI2D9QZHez0Nn9V9H2",
        quantity: 3,
    }

    const checkoutOptions_1 = {
        lineItems: [items, items_v1],
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



    // const handleclick = async() => {
    //     // Set your secret key. Remember to switch to your live secret key in production.
    //     // See your keys here: https://dashboard.stripe.com/apikeys

    //     const paymentIntent = await stripe.paymentIntents.create({
    //         amount: 1099,
    //         currency: 'usd',
    //         automatic_payment_methods: { enabled: true },
    //     });
    //     console.log(paymentIntent,"paymentIntent")

    // }



    return (
        <>
            <div class="card text-center">
                <div class="card-footer text-muted">
                    {/* <Link to="/Koko" type="button" class="btn btn-info" onClick={"redirectToCheckout_1"}>Order now</Link> */}
                    <button type="button" className="btn btn-info" onClick={handleclick}>Order now</button>
                </div>
            </div>
        </>
    )
}

export default FooterForCart