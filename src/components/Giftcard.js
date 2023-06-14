import React, { useEffect, useState } from 'react'
import axios from 'axios';

let wasApiCalled = false

const Giftcard = () => {
    console.log("Giftcard running...")
    const [giftcardbalance1, setGiftcardbalance] = useState([])
    const [giftcard_id, setGiftcard_id] = useState([])
    const Url = process.env.REACT_APP_API_PUBLIC_URL;
    const Project_key = process.env.REACT_APP_PROJECT_KEY

    useEffect(() => {
        if (!wasApiCalled) {
            const lastcartcall = async () => {
                const apiEndpointlastcart = `${Url}/${Project_key}/carts`;
                const bearerTokenCreate_CartDiscount = process.env.REACT_APP_SECRET_API_KEY;
                const axiosConfig = {
                    headers: {
                        'Authorization': `Bearer ${bearerTokenCreate_CartDiscount}`,
                        'Content-Type': 'application/json'
                    }
                }
                const responselastcart = await axios.get(apiEndpointlastcart, axiosConfig);
                console.log("api call...", responselastcart);
                if (responselastcart.data) {
                    const lastValue = responselastcart.data.results[responselastcart.data.results?.length - 1];
                    if ("discountCodes" in lastValue) {
                        console.log(lastValue.discountCodes)
                        lastValue.discountCodes.map((i) => { return (first(i.discountCode.id, axiosConfig)) })
                    }
                    console.log("lastcartcall...", lastValue);
                }
    
            }
            lastcartcall()
            wasApiCalled = true
        }
    }, [])


    const first = async (value, token) => {
        console.log("firstvalue", value)
        const apiEndpointlastcart = `${Url}/${Project_key}/discount-codes/${value}`;
        const responselastcart = await axios.get(apiEndpointlastcart, token);
        if (responselastcart?.data) {
            const apiEndpointGift = `https://dev.api.giftcard.99minds.co/api/v1/giftcards/balance?giftcard_number=${responselastcart.data.code}`;
            const bearerToken = process.env.REACT_APP_GIFT_CARD_SECRET_KEY;
            const axiosConfigGiftCard = {
                headers: {
                    'Authorization': `Bearer ${bearerToken}`,
                    'Content-Type': 'application/json'
                }
            };
            console.log("firstvalue...", responselastcart.data)
            const Check_Gift_Card_balance = await axios.get(apiEndpointGift, axiosConfigGiftCard);
            if (Check_Gift_Card_balance?.data) {
                console.log("Check_Gift_Card_balance...", Check_Gift_Card_balance.data.data.balance)
                const giftvalue1=Check_Gift_Card_balance.data.data?.balance
                const giftcard_number=Check_Gift_Card_balance.data.data?.giftcard_number
                console.log("payment..",giftvalue1,"giftcard_number...",giftcard_number)
                setGiftcardbalance(prev => [ ...prev, giftvalue1 ])
                setGiftcard_id(prev=>[...prev,giftcard_number])
            }
        }
    }
    // localStorage.setItem*********

    console.log("giftcard  giftcardbalance1....",giftcardbalance1)
    localStorage.setItem("Giftcard_balance",JSON.stringify(giftcardbalance1));
    localStorage.setItem("Giftcard_id",JSON.stringify(giftcard_id));

    const value1= localStorage.getItem('Giftcard_id');
    const value2= localStorage.getItem('Giftcard_balance');
    const id=JSON.parse(value1)
    const balance=JSON.parse(value2)
    console.log("Giftcard_id..",id)
    console.log("Giftcard_balance..",balance)
    console.log("giftcard_id...",giftcard_id)
    const arr=[];
    for (let i in id) {
        console.log(id[i],balance[i]);
        arr.push({
			"giftcard_number": id[i],
			"redemption_amount": balance[i]
		})
    }
    console.log(arr,"jjjjjjjjjjjjj")
    return (
        <>
        {
            giftcardbalance1?.map((i)=>{return(
                <tr> <th scope="row">Gift certificate</th><td><b>-${i}</b></td></tr>
            )})
            
            }
        </>
    )
}

export default Giftcard