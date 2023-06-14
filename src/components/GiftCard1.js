import axios from 'axios';
import React, { useEffect, useState } from 'react'
const first = (second) => {  }
const GiftCard1 = () => {
    async function fetchData() {
        const apiEndpointlastcart = "https://api.us-central1.gcp.commercetools.com/99minds/carts";
        const bearerTokenCreate_CartDiscount = process.env.REACT_APP_SECRET_API_KEY;
        const axiosConfig = {
            headers: {
                'Authorization': `Bearer ${bearerTokenCreate_CartDiscount}`,
                'Content-Type': 'application/json'
            }
        };
        const response = await axios.get(apiEndpointlastcart, axiosConfig);
        

    }

    const data =  fetchData()
    useEffect(() => {

    }, [])

    return (
        <div>GiftCard1</div>
    )
}

export default GiftCard1