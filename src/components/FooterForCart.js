import React from 'react'
import { Link } from 'react-router-dom'

const FooterForCart = (props) => {

    // console.log(props.productsquantity?.length===0,"from chekout buttons page")
    const desablebutton=props.productsquantity?.length===0
    // console.log(desablebutton,"from desablebutton buttons page")

    return (
        <>
            <div class="card text-center">
                <div class="card-footer text-muted">
                    {/* <Link to="/StripeCustomPayment" type="button" class="btn btn-info">Order now</Link> */}
                    {/* <button type="button" className="btn btn-info" onClick={redirectToCheckout_1}>Order now</button> */}
                    <form action='/create-checkout-session' method="POST">
                        <button type="submit" className="btn btn-info" disabled={desablebutton}>
                            Checkout
                        </button>
                    </form>
                    
                </div>
            </div>
        </>
    )
}

export default FooterForCart