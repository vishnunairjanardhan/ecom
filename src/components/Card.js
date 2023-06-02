import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
const Card = (props) => {
    const [getsinglecart, setGetSingleCart] = useState([])
    const getlastcart = getsinglecart[getsinglecart?.length - 1];
    const bearerToken = process.env.REACT_APP_SECRET_API_KEY;
    const apiEndpointForAllCart = 'https://api.us-central1.gcp.commercetools.com/obongg26te1hxzh/carts'
    const apiEndpointForLastCart = `https://api.us-central1.gcp.commercetools.com/obongg26te1hxzh/carts/${getlastcart?.id}`

    const axiosConfig = {
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json'
        }
    };
    // to set last cart
    useEffect(() => {
        axios.get(apiEndpointForAllCart, axiosConfig)
            .then(response => setGetSingleCart(response.data?.results))
            .catch(error => console.error(error));
    }, [])

    const addLineItem = async (cartVersion, product_Id) => {
        console.log(cartVersion, product_Id, "get productId and caerVersion")
        const myValue = localStorage.getItem("myKey");
        const apiEndpointaddLineItem = `https://api.us-central1.gcp.commercetools.com/obongg26te1hxzh/carts/${myValue}`
        try {
            const response = await axios.post(apiEndpointaddLineItem, {
                "version": cartVersion,
                "actions": [
                    {
                        "action": "addLineItem",
                        "productId": `${product_Id}`,
                        "variantId": 1,
                        "quantity": 1,
                        "supplyChannel": {
                            "typeId": "channel",
                            "id": "dc5188e6-2fa5-4632-ab24-8de4d256e54c"
                        },
                        "distributionChannel": {
                            "typeId": "channel",
                            "id": "dc5188e6-2fa5-4632-ab24-8de4d256e54c"
                        },
                        "externalTaxRate": {
                            "name": "StandardExternalTaxRate",
                            "amount": 0.19,
                            "country": "DE",
                            "state": "Bavaria"
                        },
                        "shippingDetails": {
                            "targets": [{
                                "addressKey": "examplekey1",
                                "quantity": 1
                            }]
                        }
                    }
                ]
            }, axiosConfig);
            console.log(response.data, "from addLineItem")
        }
        catch (error) {
            console.error(error);
        }
    }

    const getCartVersion = async () => {
        try {
            const response = await axios.get(apiEndpointForLastCart, axiosConfig);
            if (response.data) {
                console.log("from getCartVersion ", response.data)
                addLineItem(response.data?.version, props.prop1.id)
            }
        }
        catch (error) {
            console.error(error);
        }
    }



    // function for Addlineitem
    return (
        <>
            <div>
                <div className="card shadow-sm p-3 mb-5 bg-body-tertiary rounded" style={{ width: "18rem", height: "35rem" }}>
                    <img src={props.prop1["masterData"]["current"]["masterVariant"]["images"][0]["url"]} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{props.prop1["masterData"]["current"]["name"]["en"]}</h5>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><b>$</b>{props.prop1["masterData"]["current"]["masterVariant"]["prices"][0]["value"]["centAmount"] / 100}</li>

                            <li className="list-group-item"><button type="button" className="btn btn-secondary btn-lg" onClick={() => { getCartVersion() }}>Add to Cart</button></li>

                        </ul>

                    </div>
                </div></div>
        </>
    )
}

export default Card