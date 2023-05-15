import React, { useState, useEffect } from 'react'
import axios from 'axios';
import NavbarForCart from './NavbarForCart';
import FooterForCart from './FooterForCart';

const Checkout = () => {
    // const [getsinglecart, setGetSingleCart] = useState("")
    const [productsquantity, setProductsQuantity] = useState([])
    const bearerToken = process.env.REACT_APP_SECRET_API_KEY;
    // const apiEndpoint = 'https://api.us-central1.gcp.commercetools.com/obongg26te1hxzh/carts/36a02d56-9401-40c0-b9ce-d22f4bee9967'
    const apiEndpointForAllCart = 'https://api.us-central1.gcp.commercetools.com/obongg26te1hxzh/carts'


    const axiosConfig = {
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json'
        }
    };

    // const GetLastCart = async () => {

    //     const apiEndpoint = "https://api.us-central1.gcp.commercetools.com/obongg26te1hxzh/carts";
    //     const bearerToken = process.env.REACT_APP_SECRET_API_KEY;
    //     const axiosConfig = {
    //         headers: {
    //             'Authorization': `Bearer ${bearerToken}`,
    //             'Content-Type': 'application/json'
    //         }
    //     };
    //     try {
    //         const response = await axios.get(apiEndpoint, axiosConfig);
    //         if (response.data) {
    //             console.log("from GetLastCart", response.data.results)
    //             const lastValue = response.data.results[response.data.results?.length - 1];
    //             // CreatePaymentAddPayment(lastValue?.id)
    //             setGetSingleCart(`https://api.us-central1.gcp.commercetools.com/obongg26te1hxzh/carts/${lastValue?.id}`)
    //         }
    //     }
    //     catch (error) {
    //         console.error(error);
    //     }
    // }

    // useEffect(() => {
    //     GetLastCart()
    // }, [])

    // to get all cart
    
    useEffect(() => {
        axios.get(apiEndpointForAllCart, axiosConfig)
            .then(res => { console.log(res.data, "All carts") })
            .catch(error => console.error(error));
    }, [])

    // Set all Products with last cart
    useEffect(() => {
        const myValue = localStorage.getItem("myKey");
            axios.get(`https://api.us-central1.gcp.commercetools.com/obongg26te1hxzh/carts/${myValue}`, axiosConfig)
            .then(response => setProductsQuantity(response?.data))
            .catch(error => console.error(error));
    }, [])
    
    console.log(productsquantity, "from cart33s")
    const myValue = localStorage.getItem("myKey");
    console.log("myValue",`https://api.us-central1.gcp.commercetools.com/obongg26te1hxzh/carts/${myValue}`)


    const deleteLineItem = (item_Id, item_Quantity, version) => {
        const apiLastcart = `https://api.us-central1.gcp.commercetools.com/obongg26te1hxzh/carts/${myValue}`;
        console.log(item_Id, item_Quantity, version, "from deleteLineItem")

        axios.post(apiLastcart, {
            "version": version,
            "actions": [
                {
                    "action": "removeLineItem",
                    "lineItemId": `${item_Id}`,
                    "quantity": item_Quantity,
                    "externalPrice": {
                        "currencyCode": "EUR",
                        "centAmount": 4000
                    },
                    "shippingDetailsToRemove": {
                        "targets": [{
                            "addressKey": "examplekey1",
                            "quantity": 1
                        }]
                    }
                }
            ]
        }, axiosConfig)
            .then(response => {
                console.log(response.data);
                setProductsQuantity(response?.data, "from cart")
            })
            .catch(error => console.error(error));
    }


    const CalldeleteLineItem = async (item_Id, item_Quantity, version) => {
        const apiEndpoint = "https://api.us-central1.gcp.commercetools.com/obongg26te1hxzh/carts";
        const bearerToken = process.env.REACT_APP_SECRET_API_KEY;
        const axiosConfig = {
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await axios.get(apiEndpoint, axiosConfig);
            if (response.data) {
                console.log("from GetLastCart", response.data.results)
                const lastValue = response.data.results[response.data.results?.length - 1];
                //   CreatePaymentAddPayment(lastValue?.id)
                deleteLineItem(item_Id, item_Quantity, version)
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    // console.log("last cart is ", getsinglecart)
    // console.log(getsinglecart, "this is url from last cart")
    return (
        <>
            <NavbarForCart />
            <div className='container'>
                <div className='row'>
                    {productsquantity?.lineItems?.map((i) => {
                        return (
                            <div key={i + 1} className='col-3'>
                                <div className="card shadow-sm p-3 mb-5 bg-body-tertiary rounded" style={{ width: "14rem", height: "34rem" }}>
                                    <img src={i["variant"]["images"][0]["url"]} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{i["name"]["en"]}</h5>

                                        <h5 className="card-title">Quantity {i["quantity"]}</h5>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item"><b>$</b>{i["totalPrice"]["centAmount"] / 100}</li>
                                            <li className="list-group-item"><button type="button" className="btn btn-danger" onClick={() => { CalldeleteLineItem(i.id, i.quantity, productsquantity.version) }}>Remove</button></li>
                                        </ul>

                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <FooterForCart productsquantity={productsquantity.lineItems} />
        </>

    )

}

export default Checkout   