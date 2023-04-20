import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
const AddPayment = () => {
    // const [name, setName] = useState("");
    const [payMode, setpayMode] = useState("");
    const [totalPrice, setTotalPrice] = useState([])

    const randomNumber = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
    const randomNumber12 = Math.floor(Math.random() * 900000000000) + 100000000000;



    const bearerToken = process.env.REACT_APP_SECRET_API_KEY;
    const apiEndpoint = 'https://api.us-central1.gcp.commercetools.com/obongg26te1hxzh/payments';

    const apiEndpoint1 = 'https://api.us-central1.gcp.commercetools.com/obongg26te1hxzh/carts/fc056b00-d1fa-405f-bb52-6cbb57bc7a80'

    const axiosConfig = {
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json'
        }
    };

    // useEffect(() => {
    //     axios.get(apiEndpoint1, axiosConfig)
    //         .then(response => setTotalPrice(response.data, "from cart"))
    //         // .then(response => console.log(response.data, "from cart"))
    //         .catch(error => console.error(error));
    // }, [])




    // const CreatOrder = (Values) => {
    //     // console.log(Values,"fromorder fun.")
    //     // axios.post(apiEndpoint1, {
    //     //     "id" :`${Values.id}`,
    //     //     "version" : Values.version,
    //     //     "orderNumber" :`${String(randomNumber12)}`
    //     //   }, axiosConfig)
    //     //     .then(response => console.log(response.data,"from made order"))
    //     //     // .then(response => console.log(response.data, "from cart"))
    //     //     .catch(error => console.error(error));
    //     console.log("from CreatOrder",Values)
    // }

  
    
    // const SetShippingAddress = (Values) => {
    //     // axios.post(apiEndpoint1, {
    //     //     "version":Values.version,
    //     //     "actions": [
    //     //         {
    //     //             "action" : "setShippingAddress",
    //     //             "address" : {
    //     //               "key" : "exampleKey",
    //     //               "title" : "My Address",
    //     //               "salutation" : "Mr.",
    //     //               "firstName" : "Example",
    //     //               "lastName" : "Person",
    //     //               "streetName" : "Example Street",
    //     //               "streetNumber" : "4711",
    //     //               "additionalStreetInfo" : "Backhouse",
    //     //               "postalCode" : "80933",
    //     //               "city" : "Exemplary City",
    //     //               "region" : "Exemplary Region",
    //     //               "state" : "",
    //     //               "country" : "DE",
    //     //               "company" : "My Company Name",
    //     //               "department" : "Sales",
    //     //               "building" : "Hightower 1",
    //     //               "apartment" : "247",
    //     //               "pOBox" : "2471",
    //     //               "phone" : "+49 89 12345678",
    //     //               "mobile" : "+49 171 2345678",
    //     //               "email" : "email@example.com",
    //     //               "fax" : "+49 89 12345679",
    //     //               "additionalAddressInfo" : "no additional Info",
    //     //               "externalId" : "Information not needed"
    //     //             }
    //     //           }
    //     //     ]
    //     // }, axiosConfig)
    //     //     .then(response => console.log(response.data,"from SetShippingAddress"))
    //     //     .catch(error => console.error(error));
    //     // console.log("SetShippingAddress",Values.version)
    //     // CreatOrder(Values)
    //     console.log("from SetShippingAddress",Values)
    // }
    
  


    // const SetcustomerEmail = (Values) => {
    //     axios.post(apiEndpoint1, {
    //         "version": Values.version,
    //         "actions": [
    //             {
    //                 "action" : "setCustomerEmail",
    //                 "email" : "spongeBob@gmail.com"
    //               }
    //         ]
    //     }, axiosConfig)
    //         .then(response => console.log(response.data,"from SetcustomerEmail"))
    //         .catch(error => console.error(error));
    //         console.log("SetcustomerEmail",Values,Values.version,"is version")
        
    // }


    // const AddPayment_1 = (Values) => {
    //     let payment_id=`${Values.id}`
    //     axios.post(apiEndpoint1, {
    //         "version": totalPrice.version,
    //         "actions": [
    //             {
    //                 "action": "addPayment",
    //                 "payment": {
    //                     "id": payment_id,
    //                     "typeId": "payment"
    //                 }
    //             }
    //         ]
    //     }, axiosConfig)
    //         .then(response => console.log(response.data))
    //         // .then(response => console.log(response.data, "from cart"))
    //         .catch(error => console.error(error));
    //         SetcustomerEmail(totalPrice)
    //         SetShippingAddress(totalPrice)
    //         CreatOrder(totalPrice)
    //     console.log(Values, "Payment id ", totalPrice.version, "is version ","from addpayment funct also",payment_id)


    // }



    // const createPayment = () => {
    //     // e.preventDefault();

    //     let totalcost = Math.floor(totalPrice.totalPrice.centAmount / 100);
    //     console.log(`Email: ${payMode}`, randomNumber, randomNumber + 5, totalcost);


    //     axios.post(apiEndpoint, {
    //         "key": String(randomNumber-6),
    //         "interfaceId": String(randomNumber + 147),
    //         "amountPlanned": {
    //             "currencyCode": "USD",
    //             "centAmount": totalcost
    //         },
    //         "paymentMethodInfo": {
    //             "paymentInterface": "STRIPE",
    //             "method": `${payMode}`,
    //             "name": {
    //                 "en": `${payMode}`
    //             }
    //         },
    //         "transactions": [{
    //             "timestamp": "2015-10-20T08:54:24.000Z",
    //             "type": "Charge",
    //             "amount": {
    //                 "currencyCode": "USD",
    //                 "centAmount": 1000
    //             },
    //             "state": "Pending"
    //         }]
    //     }, axiosConfig)
    //         .then(response => {
    //             AddPayment_1(response.data);
    //             console.log(response.data, "from create payment");
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });

    // };


    // window.location="https://stripe.com/docs/checkout/quickstart"

    return (
        <>

            <Navbar />
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    select payment
                </button>
                <ul className="dropdown-menu">
                    <li><button className="dropdown-item" onClick={() => { setpayMode("DEBIT_CARD") }}>credit card</button></li>
                    <li><button className="dropdown-item" onClick={() => { setpayMode("CREDIT_CARD") }}>debit card</button></li>
                </ul>
            </div>
            <hr />


            <button type="submit" className="btn btn-primary" onClick={() => { console.log("ok") }}>Proceed to checkout</button>
           
        </>
    )
}

export default AddPayment