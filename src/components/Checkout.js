import React, { useState, useEffect } from 'react'
import axios from 'axios';
import NavbarForCart from './NavbarForCart';
import FooterForCart from './FooterForCart';
import Subtotal from './Subtotal';


const Checkout = () => {
    const [productsquantity, setProductsQuantity] = useState([])
    const [couponprice, setCouponPrice] = useState(null)
    const [inputValue, setInputValue] = useState("")
    const [giftcardvalue, setGiftCardValue] = useState("")
    const bearerToken = process.env.REACT_APP_SECRET_API_KEY;
    const apiEndpointForAllCart = 'https://api.us-central1.gcp.commercetools.com/obongg26te1hxzh/carts'

    const axiosConfig = {
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json'
        }
    };

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
    console.log("myValue", `https://api.us-central1.gcp.commercetools.com/obongg26te1hxzh/carts/${myValue}`)


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
                deleteLineItem(item_Id, item_Quantity, version)
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        console.log("handleInputChange...", event.target.value)
    };

    const handleInputChangeforgiftcard = (event) => {
        setGiftCardValue(event.target.value);
        console.log("handleInputChangeforgiftcard...", event.target.value)
    };

    const CouponFunc = async (Cart_version) => {
        const apiLastcart = `https://api.us-central1.gcp.commercetools.com/obongg26te1hxzh/carts/${myValue}`;
        const bearerToken = process.env.REACT_APP_SECRET_API_KEY;
        const axiosConfig = {
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            }
        };
        console.log("CouponFunc..", Cart_version, myValue, inputValue)
        try {
            const response = await axios.post(apiLastcart, {
                "version": Cart_version,
                "actions": [
                    {
                        "action": "addDiscountCode",
                        "code": `${inputValue}`
                    }
                ]
            }, axiosConfig);
            if (response.data) {
                console.log("CouponFunc..", response.data)
                setCouponPrice(response.data.totalPrice.centAmount)
            }
        }
        catch (error) {
            console.error(error);
        }

    }

    const AddCouponCodeFunc = async () => {
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
                const lastValue = response.data.results[response.data.results?.length - 1];
                console.log("AddCouponCodeFunc...", lastValue)
                CouponFunc(lastValue.version)
            }

        }
        catch (error) {
            console.error(error);
        }
    }


    const Create_CartDiscount = async () => {
        const apiEndpoint = "https://api.us-central1.gcp.commercetools.com/obongg26te1hxzh/cart-discounts";
        const bearerToken = process.env.REACT_APP_SECRET_API_KEY;
        const axiosConfig = {
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await axios.post(apiEndpoint, {
                "name": {
                    "en": "May_End_30%"
                },
                "value": {
                    "type": "absolute",
                    "money": [{
                        "currencyCode": "EUR",
                        "centAmount": 5000
                    }]
                },
                "cartPredicate": "1=1",
                "target": {
                    "type": "lineItems",
                    "predicate": "1=1"
                },
                "sortOrder": `${Math.random()}`,
                "isActive": true,
                "requiresDiscountCode": true
            }, axiosConfig);
            console.log("Create_CartDiscount....", response)
            if (response.data) {
                Create_DiscountCode(response.data);
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    const Create_DiscountCode = async (r, s, t) => {
        console.log("(3)Create_DiscountCode....", r)
        const apiEndpoint = "https://api.us-central1.gcp.commercetools.com/obongg26te1hxzh/discount-codes";
        const bearerToken = process.env.REACT_APP_SECRET_API_KEY;
        const axiosConfig = {
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await axios.post(apiEndpoint, {
                "code": `${s}`,
                "name": {
                    "en": `${t}`
                },
                "cartDiscounts": [{
                    "typeId": "cart-discount",
                    "id": `${r.id}` //respones id from Create_DiscountCode function 
                }],
                "isActive": true,
                "cartPredicate": "1=1"
            }, axiosConfig);
            console.log("(4) Create_DiscountCode......", response)

        }
        catch (error) {
            console.error(error);
        }
    }

    // code flow starts here for gift card.
    const Check_Gift_Card_balance = async () => {
        const apiEndpointGiftCard = `https://dev.api.giftcard.99minds.co/api/v1/giftcards/${giftcardvalue}`;
        const bearerToken = process.env.REACT_APP_GIFT_CARD_SECRET_KEY;
        const axiosConfigGiftCard = {
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            }
        };
        const apiEndpointforCreate_CartDiscount = "https://api.us-central1.gcp.commercetools.com/obongg26te1hxzh/cart-discounts";
        const bearerTokenCreate_CartDiscount = process.env.REACT_APP_SECRET_API_KEY;
        const axiosConfig = {
            headers: {
                'Authorization': `Bearer ${bearerTokenCreate_CartDiscount}`,
                'Content-Type': 'application/json'
            }
        };

        const apiEndpointCreate_DiscountCode = "https://api.us-central1.gcp.commercetools.com/obongg26te1hxzh/discount-codes";
        const apiEndpointlastcart = "https://api.us-central1.gcp.commercetools.com/obongg26te1hxzh/carts";


        try {

            const response = await axios.get(apiEndpointGiftCard, axiosConfigGiftCard)

            if (response.data) {
                console.log("(1)Check_Gift_Card_balance......", response.data.data.giftcard)
                let giftcardnumber = response.data.data.giftcard.giftcard_number
                let giftcardbalance = response.data.data.giftcard.balance
                let giftcardcampaign_name = response.data.data.giftcard.campaign_name
                // working on Create_CartDiscount 253 
                

                // Create_CartDiscount
                const responseofCreate_CartDiscount = await axios.post(apiEndpointforCreate_CartDiscount, {
                    "name": {
                        "en": `${giftcardnumber}`
                    },
                    "value": {
                        "type": "absolute",
                        "money": [{
                            "currencyCode": "EUR",
                            "centAmount": giftcardbalance * 100
                        }]
                    },
                    "cartPredicate": "1=1",
                    "target": {
                        "type": "lineItems",
                        "predicate": "1=1"
                    },
                    "sortOrder": `${Math.random()}`,
                    "isActive": true,
                    "requiresDiscountCode": true
                }, axiosConfig);

                console.log("(2)responseofCreate_CartDiscount....", responseofCreate_CartDiscount)

                if (responseofCreate_CartDiscount.data) {
                    // Create_DiscountCode
                    const responseCreate_DiscountCode = await axios.post(apiEndpointCreate_DiscountCode, {
                        "code": `${giftcardnumber}`,
                        "name": {
                            "en": `${giftcardcampaign_name}`
                        },
                        "cartDiscounts": [{
                            "typeId": "cart-discount",
                            "id": `${responseofCreate_CartDiscount.data.id}` //respones id from Create_DiscountCode function 
                        }],
                        "isActive": true,
                        "cartPredicate": "1=1"
                    }, axiosConfig);
                    console.log("(4) Create_DiscountCode......", responseCreate_DiscountCode)

                    if (responseCreate_DiscountCode.data) {
                        // lastcart
                        const responselastcart = await axios.get(apiEndpointlastcart, axiosConfig);
                        if (responselastcart.data) {
                            const lastValue = responselastcart.data.results[responselastcart.data.results?.length - 1];
                            console.log("AddCouponCodeFunc...", lastValue)
                            // Add discountcode
                            const apiLastcart = `https://api.us-central1.gcp.commercetools.com/obongg26te1hxzh/carts/${myValue}`;
                            const response = await axios.post(apiLastcart, {
                                "version": lastValue.version,
                                "actions": [
                                    {
                                        "action": "addDiscountCode",
                                        "code": `${giftcardnumber}`
                                    }
                                ]
                            }, axiosConfig);
                            if (response.data) {
                                console.log("CouponFunc..", response.data)
                                setCouponPrice(response.data.totalPrice.centAmount)
                            }
                            // CouponFunc(lastValue.version)

                        }
                    }


                    // Create_DiscountCode(responseofCreate_CartDiscount.data,giftcardnumber,giftcardcampaign_name);
                }

            }
        }
        catch (error) {
            console.error(error);
        }
    }

    // gift card ends here

    return (
        <>
            <NavbarForCart />
            <div>
                <div style={{ height: '25%' }}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Item</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Total</th>
                            </tr>
                        </thead>

                        {productsquantity?.lineItems?.map((i, j) => {
                            return (
                                <tbody key={j}>
                                    <tr>
                                        <th scope="row">
                                            <div className="col-md-4" style={{ display: "flex", width: "25%" }}>
                                                <img src={i["variant"]["images"][0]["url"]} style={{ height: "25%", width: "25%" }} className="img-fluid rounded-start" alt="..." />
                                            </div>
                                            <div>
                                                <h5 className="card-title">{i["name"]["en"]}</h5>
                                            </div>
                                        </th>
                                        <td><div className="card-body">
                                            <h5 className="card-title">${i["price"]["value"]["centAmount"] / 100}</h5>
                                        </div>
                                        </td>
                                        <td><div><h5 className="card-title"> {i["quantity"]}</h5></div>
                                        </td>
                                        <td><div className="card-body" style={{ display: "flex" }}>${i["price"]["value"]["centAmount"] * i["quantity"] / 100}<li className="list-group-item" style={{ paddingLeft: "10px" }}><button type="button" className="btn btn-danger"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16" onClick={() => { CalldeleteLineItem(i.id, i.quantity, productsquantity.version) }}>
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                        </svg></button></li></div>
                                        </td>
                                    </tr>
                                </tbody>
                            )
                        })}
                    </table>
                </div>

                <div style={{ height: '25%', width: '50%' }}>
                    <table className="table">
                        <tbody>
                            <tr>
                                <th scope="row">Subtotal</th>
                                <td>${<Subtotal />}</td>
                            </tr>
                            <tr>
                                <th scope="row">Coupon Code</th>
                                <p>
                                    <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" onClick={() => { console.log("Add Coupon called...") }} >
                                        Add Coupon
                                    </button>
                                </p>
                                <div className="collapse" id="collapseExample">
                                    <div className="card card-body">
                                        <div className="row g-3 align-items-center" style={{ width: "570px" }}>
                                            <div style={{ display: "flex" }}>
                                                <div className="col-auto" style={{ paddingRight: "10px" }}>
                                                    <label htmlFor="input" className="col-form-label">Coupon</label>
                                                </div>
                                                <div className="col-auto" style={{ paddingRight: "10px" }}>
                                                    <input type="Text" className="form-control" onChange={handleInputChange} />
                                                </div>
                                                <div className="col-auto" style={{ paddingRight: "10px" }}>
                                                    <button type="button" className="btn btn-primary" onClick={() => { AddCouponCodeFunc() }}>Redeem</button>
                                                </div>
                                            </div>
                                            <div style={{ display: "flex", width: "25%" }}>
                                                <div className="col-auto" style={{ paddingRight: "10px" }}>
                                                    <label htmlFor="input" className="col-form-label" >Gift Card</label>
                                                </div>
                                                <div className="col-auto" style={{ paddingRight: "10px" }}>
                                                    <input type="Text" className="form-control" onChange={handleInputChangeforgiftcard} />
                                                </div>
                                                <div className="col-auto" style={{ paddingRight: "10px" }}>
                                                    <label htmlFor="input" className="col-form-label">Pin</label>
                                                </div>
                                                <div className="col-auto" style={{ paddingRight: "10px" }}>
                                                    <input type="password" className="form-control" style={{ width: "120px" }} />
                                                </div>
                                                <div className="col-auto">
                                                    <button type="button" className="btn btn-primary" onClick={() => { Check_Gift_Card_balance() }}>Redeem</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </tr>
                            <tr>
                                <th scope="row">Grand Total</th>
                                <td colSpan="2"><h1>${couponprice === null ? (`${productsquantity?.totalPrice?.centAmount}` / 100.00) : (couponprice / 100.00)}</h1></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <FooterForCart productsquantity={productsquantity.lineItems} />
        </>

    )

}

export default Checkout   