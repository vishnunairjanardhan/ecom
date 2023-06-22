import React from 'react'
import { Link } from 'react-router-dom'
const FooterForCart = (props) => {
    const desablebutton=props.productsquantity?.length===0
    
    return (
        <>
            <div className="card text-center">
                <div className="card-footer text-muted">
                    {/* <Link to="/StripeCustomPayment" type="button" class="btn btn-info">Order now</Link> */}
                    {/* <button type="button" className="btn btn-info" onClick={redirectToCheckout_1}>Order now</button> */}


                    <form action='/create-checkout-session' method="POST">
                        <button type="submit" className="btn btn-info" disabled={desablebutton}>
                           {/* <Link to="/stripe" type="button" class="btn btn-info">Order now</Link> */}
                           Checkout
                        </button>
                    </form>
                    
                </div>
            </div>
        </>
    )
}

export default FooterForCart