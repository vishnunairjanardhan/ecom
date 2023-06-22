import axios from 'axios';
import { useState, useEffect } from 'react'

const Subtotal = () => {
    const Url = process.env.REACT_APP_API_PUBLIC_URL;
    const Project_key = process.env.REACT_APP_PROJECT_KEY
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
        axios.get(`${Url}/${Project_key}/carts/${myValue}`, axiosConfig)
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
