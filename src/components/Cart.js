import React, { useState, useEffect } from 'react'
import axios from 'axios';
import NavbarForCart from './NavbarForCart';
import FooterForCart from './FooterForCart';

const Cart = () => {

    const [productsquantity, setProductsQuantity] = useState([])
    const bearerToken = process.env.REACT_APP_SECRET_API_KEY;
    const apiEndpoint = 'https://api.us-central1.gcp.commercetools.com/obongg26te1hxzh/carts/fc056b00-d1fa-405f-bb52-6cbb57bc7a80'

    const apiEndpointForAllCart = 'https://api.us-central1.gcp.commercetools.com/obongg26te1hxzh/carts'


    const axiosConfig = {
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json'
        }
    };

    // to get all cart
    const GetallCart=()=>{
        axios.get(apiEndpointForAllCart, axiosConfig)
        .then(response => console.log(response.data, "All carts"))
        .catch(error => console.error(error));
    }

    useEffect(() => {
        axios.get(apiEndpoint, axiosConfig)
            .then(response => setProductsQuantity(response.data, "from cart"))
            // .then(response => console.log(response.data, "from cart"))
            .catch(error => console.error(error));

          
    }, [])
    console.log(productsquantity, "from cart")

    GetallCart()

    const deleteLineItem = (item_Id, item_Quantity, version) => {
        console.log(item_Id, item_Quantity, version, "from deleteLineItem")

        axios.post(apiEndpoint, {
            "version": version,
            "actions": [
                {
                    "action": "removeLineItem",
                    "lineItemId": item_Id,
                    "quantity": item_Quantity,
                    "externalPrice": {
                        "currencyCode": "EUR",
                        "centAmount": 4000
                    },
                    "shippingDetailsToRemove": {
                        "targets": [{
                            "addressKey": "kokko",
                            "quantity": 1
                        }]
                    }
                }
            ]
        }, axiosConfig)
            .then(response => {
                console.log(response.data);
                setProductsQuantity(response.data, "from cart")
            })
            .catch(error => console.error(error));
    }



    return (
        <>
        <NavbarForCart/>
            <div className='container'>
                <div className='row'>
                    {productsquantity.lineItems?.map((i) => {
                        return (
                            <div key={i + 1} className='col-3'>
                                <div className="card shadow-sm p-3 mb-5 bg-body-tertiary rounded" style={{ width: "14rem", height: "34rem" }}>
                                    <img src={i["variant"]["images"][0]["url"]} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{i["name"]["en"]}</h5>

                                        <h5 className="card-title">Quantity {i["quantity"]}</h5>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item"><b>$</b>{i["totalPrice"]["centAmount"] / 100}</li>
                                            <li className="list-group-item"><button type="button" className="btn btn-danger" onClick={() => { deleteLineItem(i.id, i.quantity, productsquantity.version) }}>Remove</button></li>
                                        </ul>

                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <FooterForCart/>
        </>

    )

}

export default Cart