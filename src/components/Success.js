import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';

const CreatePayment = async (Price) => {
  const DigitGenrator = (Math.floor(1000000000 + Math.random() * 9000000000))
  const apiEndpoint = "https://api.us-central1.gcp.commercetools.com/obongg26te1hxzh/payments";
  const bearerToken = process.env.REACT_APP_SECRET_API_KEY;
  const axiosConfig = {
    headers: {
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/json'
    }
  };

  try {
    const response = await axios.post(apiEndpoint, {
      "key": `${DigitGenrator - 2793}`,
      "interfaceId": `${DigitGenrator - 6743}`,
      "amountPlanned": {
        "currencyCode": "USD",
        "centAmount": Price
      },
      "paymentMethodInfo": {
        "paymentInterface": "Stripe",
        "method": "CREDIT_CARD",
        "name": {
          "en": "Credit Card"
        }
      },
      "transactions": [{
        "timestamp": "2015-10-20T08:54:24.000Z",
        "type": "Charge",
        "amount": {
          "currencyCode": "USD",
          "centAmount": 1000
        },
        "state": "Pending"
      }]
    }, axiosConfig);
    console.log(response.data, "from CreatePayment ")
    return response;
  }

  catch (error) {
    console.error(error);
  }
  
}


//  AddPayment function call

const AddPayment = async (last_cart_id, cartver,pay_id) => {
  console.log("adding payment..", last_cart_id, cartver,pay_id, {
    "version": cartver,
    "actions": [
      {
        "action": "addPayment",
        "payment": {
          "id": `${pay_id}`,
          "typeId": "payment"
        }
      }
    ]
  });
  const apiLastcart = `https://api.us-central1.gcp.commercetools.com/obongg26te1hxzh/carts/${last_cart_id}`;

  const bearerToken = process.env.REACT_APP_SECRET_API_KEY;

  const axiosConfig = {
    headers: {
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/json'
    }
  };
// 68
  try {
    const response = await axios.post(apiLastcart, {
      "version": cartver,
      "actions": [
        {
          "action": "addPayment",
          "payment": {
            "id": `${pay_id}`,
            "typeId": "payment"
          }
        }
      ]
    }, axiosConfig)
    if (response?.data) {
      console.log(last_cart_id, cartver,pay_id,"last_cart_id  cartver   pay_id", "from AddPayment")
    }
  }
  catch (error) {
    console.error(error);
  }

}

const CreatePaymentAddPayment = async (last_cart_id) => {

  const apiLastcart = `https://api.us-central1.gcp.commercetools.com/obongg26te1hxzh/carts/${last_cart_id}`;
  const bearerToken = process.env.REACT_APP_SECRET_API_KEY;
  const axiosConfig = {
    headers: {
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/json'
    }
  };

  try {
    const response = await axios.get(apiLastcart, axiosConfig);
    console.log("CreatePaymentAddPayment is called",response.data.totalPrice.centAmount)
    return response;
  }
  catch (error) {
    console.error(error);
  }

}

const SetCustomerEmail = async (last_cart_id, cart_version) => {
  const apiLastcart = `https://api.us-central1.gcp.commercetools.com/obongg26te1hxzh/carts/${last_cart_id}`;
  const bearerToken = process.env.REACT_APP_SECRET_API_KEY;

  const axiosConfig = {
    headers: {
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/json'
    }
  };

  try {
    const response = await axios.post(apiLastcart, {
      "version": cart_version,
      "actions": [
        {
          "action": "setCustomerEmail",
          "email": "azharshaik@gmail.com"
        }
      ]
    }, axiosConfig);
    console.log(response.data, "from SetCustomerEmail")
  }

  catch (error) {
    console.error(error);
  }

}


const CallSetCustomerEmail = async (last_cart_id) => {
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
      console.log("from CallSetCustomerEmail", response.data.results)
      const lastValue = response.data.results[response.data.results?.length - 1];
      SetCustomerEmail(last_cart_id, lastValue?.version)
    }
  }
  catch (error) {
    console.error(error);
  }
}

const SetShippingAddress = async (last_cart_id, cart_version) => {
  const apiLastcart = `https://api.us-central1.gcp.commercetools.com/obongg26te1hxzh/carts/${last_cart_id}`;
  const bearerToken = process.env.REACT_APP_SECRET_API_KEY;

  const axiosConfig = {
    headers: {
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/json'
    }
  };

  try {
    const response = await axios.post(apiLastcart, {
      "version": cart_version,
      "actions": [
        {
          "action": "setShippingAddress",
          "address": {
            "key": "exampleKey",
            "title": "My Address",
            "salutation": "Mr.",
            "firstName": "Example",
            "lastName": "Person",
            "streetName": "Example Street",
            "streetNumber": "4711",
            "additionalStreetInfo": "Backhouse",
            "postalCode": "80933",
            "city": "Exemplary City",
            "region": "Exemplary Region",
            "state": "Exemplary State",
            "country": "DE",
            "company": "My Company Name",
            "department": "Sales",
            "building": "Hightower 1",
            "apartment": "247",
            "pOBox": "2471",
            "phone": "+49 89 12345678",
            "mobile": "+49 171 2345678",
            "email": "email@example.com",
            "fax": "+49 89 12345679",
            "additionalAddressInfo": "no additional Info",
            "externalId": "Information not needed"
          }
        }
      ]
    }, axiosConfig)
    console.log("form SetShippingAddress", response.data)
  }
  catch (error) {
    console.error(error);
  }

}

const CallSetShippingAddress = async (last_cart_id) => {
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
    return response;
  }
  catch (error) {
    console.error(error);
  }
}


const CreateOrder = async (last_cart_id, cart_version) => {
  const DigitGenrator = (Math.floor(10000000000 + Math.random() * 90000000000))
  const apiEndpoint = "https://api.us-central1.gcp.commercetools.com/obongg26te1hxzh/orders"
  const bearerToken = process.env.REACT_APP_SECRET_API_KEY;
  const axiosConfig = {
    headers: {
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/json'
    }
  };

  try {
    const response = await axios.post(apiEndpoint, {
      "id": `${last_cart_id}`,
      "version": cart_version,
      "orderNumber": `${DigitGenrator}`
    }, axiosConfig);
    console.log("from CreateOrder", response.data)
  }
  catch (error) {
    console.error(error);
  }
}

const CallCreateOrder = async () => {
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
    return response;
  }
  catch (error) {
    console.error(error);
  }
}

//  
const CreateCart = async () => {
  const apiEndpoint = "https://api.us-central1.gcp.commercetools.com/obongg26te1hxzh/carts";
  const bearerToken = process.env.REACT_APP_SECRET_API_KEY;
  const axiosConfig = {
    headers: {
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/json'
    }
  };
  try {
    const response = await axios.post(apiEndpoint, {
      "currency": "EUR"
    }, axiosConfig);
    console.log("from CreateCart", response.data)
  }
  catch (error) {
    console.error(error);
  }
}


const AddItemShippingAddress = async (last_cart_id, cart_version) => {
  const apiEndpoint = `https://api.us-central1.gcp.commercetools.com/obongg26te1hxzh/carts/${last_cart_id}`;
  const bearerToken = process.env.REACT_APP_SECRET_API_KEY;
  const axiosConfig = {
    headers: {
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/json'
    }
  };
  try {
    const response = await axios.post(apiEndpoint, {
      "version": cart_version,
      "actions": [
        {
          "action": "addItemShippingAddress",
          "address": {
            "key": "examplekey1",
            "title": "My Address",
            "salutation": "Mr.",
            "firstName": "Example",
            "lastName": "Person",
            "streetName": "Example Street",
            "streetNumber": "4711",
            "additionalStreetInfo": "Backhouse",
            "postalCode": "80933",
            "city": "Exemplary City",
            "region": "Exemplary Region",
            "state": "Exemplary State",
            "country": "DE",
            "company": "My Company Name",
            "department": "Sales",
            "building": "Hightower 1",
            "apartment": "247",
            "pOBox": "2471",
            "phone": "+49 89 12345678",
            "mobile": "+49 171 2345678",
            "email": "email@example.com",
            "fax": "+49 89 12345679",
            "additionalAddressInfo": "no additional Info",
            "externalId": "Information not needed"
          }
        }
      ]
    }, axiosConfig);
    console.log("from AddItemShippingAddress", response.data)
  }
  catch (error) {
    console.error(error);
  }
}

const CallAddItemShippingAddress=async()=>{
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
      console.log("from CallAddItemShippingAddress", response.data.results)
      const lastValue = response.data.results[response.data.results?.length - 1];
      AddItemShippingAddress(lastValue?.id,lastValue?.version)
    }
  }
  catch (error) {
    console.error(error);
  }
}

const ChangeTaxMode = async (last_cart_id, cart_version) => {
  const apiEndpoint = `https://api.us-central1.gcp.commercetools.com/obongg26te1hxzh/carts/${last_cart_id}`;
  const bearerToken = process.env.REACT_APP_SECRET_API_KEY;
  const axiosConfig = {
    headers: {
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/json'
    }
  };
  try {
    const response = await axios.post(apiEndpoint, {
      "version": cart_version,
      "actions": [
        {
          "action": "changeTaxMode",
          "taxMode": "External"
        }
      ]
    }, axiosConfig);
    console.log("from ChangeTaxMode", response.data)
  }
  catch (error) {
    console.error(error);
  }
}

const CallChangeTaxMode = async () => {

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
      console.log("from GetLastCart_Add_Change", response.data.results)
      const lastValue = response.data.results[response.data.results?.length - 1];
      ChangeTaxMode(lastValue?.id, lastValue?.version)
    }
  }
  catch (error) {
    console.error(error);
  }
}





const GetLastCart = async () => {

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

      CreatePaymentAddPayment(lastValue?.id).then((r) => {
        // response.data.totalPrice.centAmount
        if (r.data) {
          CreatePayment(r.data.totalPrice.centAmount).then((p) => {
            if (p?.data) {
              console.log("response from log of createpayment",p?.data, '\nversion', p?.data?.version)
              AddPayment(lastValue?.id, p?.data?.version,p?.data?.id)
              // cart-url,cart-version,
            }
          })
        }
        // CallSetCustomerEmail(lastValue?.id)
      }).then(() => {
        CallSetShippingAddress(lastValue?.id).then((res) => {
          console.log("from CallSetShippingAddress", res.data.results)
          if (res.data) {
            const lastCart1 = res.data.results?.at(-1);
            SetShippingAddress(lastCart1?.id, lastCart1?.version)
          }
        })
      }).then(() => {
        CallCreateOrder().then((res) => {
          console.log("from CallCreateOrder", res.data.results)
          if (res.data) {
            const lastCart2 = res.data.results?.at(-1);
            CreateOrder(lastCart2?.id, lastCart2?.version)
          }
        })
      })
      // CreateCart()
    }
  }
  catch (error) {
    console.error(error);
  }
}
// GetLastCart()
// CallAddItemShippingAddress()
// CallChangeTaxMode()

const Success = () => {
  // const myValue = localStorage.getItem("myKey");

  // const CallAll= async()=>{
    

  // }

  return (
    <>
      <div>Order was successfull</div>
      <div>Continue to shopping........</div>
      <button type="button" className="btn btn-info" onClick={GetLastCart}>Home</button>
    </>
  )
}

export default Success



