import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react'

const Subtotal = () => {
    let subtotalvalue = 0
    const [productsquantity, setProductsQuantity] = useState([])
    const bearerToken = process.env.REACT_APP_SECRET_API_KEY;
    const axiosConfig = {
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json'
        }
    };
    useEffect(() => {
        const myValue = localStorage.getItem("myKey");
        axios.get(`https://api.us-central1.gcp.commercetools.com/99minds/carts/${myValue}`, axiosConfig)
            .then(response => setProductsQuantity(response?.data))
            .catch(error => console.error(error));
    }, [])

    if (productsquantity?.lineItems) {
        productsquantity?.lineItems.forEach((i) => {subtotalvalue=subtotalvalue+(i["price"]["value"]["centAmount"]*i["quantity"])});
        console.log("subtotalvalue...",subtotalvalue/100)
    }

    // console.log("Subtotal....", productsquantity.lineItems)
    return (
        subtotalvalue/100
    )
}

export default Subtotal
