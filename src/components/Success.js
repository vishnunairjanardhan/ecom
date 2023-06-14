import React, { useEffect, useState } from 'react'
import axios from 'axios';
import NavbarForCart from './NavbarForCart';
const Url = process.env.REACT_APP_API_PUBLIC_URL;
const Project_key = process.env.REACT_APP_PROJECT_KEY

const CreatePayment = async (Price) => {
  const DigitGenrator = (Math.floor(1000000000 + Math.random() * 9000000000))
  const apiEndpoint = `${Url}/${Project_key}/payments`;
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
        "centAmount": 99999
      },
      "paymentMethodInfo": {
        "paymentInterface": "Gift_card",
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
        "state": "Success"
      }]
    }, axiosConfig);
    console.log(response.data, "from CreatePayment ")
    return response;
  }

  catch (error) {
    console.error(error);
  }

}

const AddPayment = async (last_cart_id, cartver, pay_id) => {
  console.log("adding payment..", last_cart_id, cartver, pay_id, {
    "version": cartver,
    "actions": [
      {
        "action": "addPayment",
        "payment": {
          "id": pay_id,
          "typeId": "payment"
        }
      }
    ]
  });
  const apiLastcart = `${Url}/${Project_key}/carts/${last_cart_id}`;

  const bearerToken = process.env.REACT_APP_SECRET_API_KEY;

  const axiosConfig = {
    headers: {
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/json'
    }
  };
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
      console.log(last_cart_id, cartver, pay_id, "last_cart_id  cartver   pay_id", "from AddPayment")
      return response
    }
  }
  catch (error) {
    console.error(error);
  }

}

const CreatePaymentAddPayment = async (last_cart_id) => {

  const apiLastcart = `${Url}/${Project_key}/carts/${last_cart_id}`;
  const bearerToken = process.env.REACT_APP_SECRET_API_KEY;
  const axiosConfig = {
    headers: {
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/json'
    }
  };

  try {
    const response = await axios.get(apiLastcart, axiosConfig);
    console.log("CreatePaymentAddPayment is called", response.data.totalPrice.centAmount)
    return response;
  }
  catch (error) {
    console.error(error);
  }

}

const SetShippingAddress = async (last_cart_id, cart_version) => {
  const apiLastcart = `${Url}/${Project_key}/carts/${last_cart_id}`;
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
            "state": "",
            "country": "US",
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
    if (response.data)
      return response
  }
  catch (error) {
    console.error(error);
  }

}

const CreateOrder = async (last_cart_id, cart_version) => {
  const DigitGenrator = (Math.floor(10000000000 + Math.random() * 90000000000))
  const apiEndpoint = `${Url}/${Project_key}/orders`;
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
    if (response.data) {
      return response
    }
  }
  catch (error) {
    console.error(error);
  }
}

const CreateCart = async () => {
  const apiEndpoint = `${Url}/${Project_key}/carts`;
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
    localStorage.setItem("myKey", response.data?.id);
    if (response.data) {
      return response
    }
  }
  catch (error) {
    console.error(error);
  }
}


const AddItemShippingAddress = async (LastCartId, CartVersion) => {
  console.log("inside AddItemShippingAddress...", LastCartId, CartVersion)
  const apiEndpoint = `${Url}/${Project_key}/carts/${LastCartId}`;
  const bearerToken = process.env.REACT_APP_SECRET_API_KEY;
  const axiosConfig = {
    headers: {
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/json'
    }
  };
  try {
    const response = await axios.post(apiEndpoint, {
      "version": CartVersion,
      "actions": [
        {
          "action": "addItemShippingAddress",
          "address": {
            "key": "exampleKey1",
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
    if (response.data) {
      return response
    }
  }
  catch (error) {
    console.error(error);
  }
}

const ChangeTaxMode = async (LastCartID, CartVersioN) => {
  const apiEndpoint = `${Url}/${Project_key}/carts/${LastCartID}`;
  const bearerToken = process.env.REACT_APP_SECRET_API_KEY;
  const axiosConfig = {
    headers: {
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/json'
    }
  };
  try {
    const response = await axios.post(apiEndpoint, {
      "version": CartVersioN,
      "actions": [
        {
          "action": "changeTaxMode",
          "taxMode": "External"
        }
      ]
    }, axiosConfig);
    console.log("from ChangeTaxMode", response.data)
    if (response.data) {

    }
  }
  catch (error) {
    console.error(error);
  }
}

const Redeem = async () => {

  const value1 = localStorage.getItem('Giftcard_id');
  const value2 = localStorage.getItem('Giftcard_balance');
  const id = JSON.parse(value1)
  const balance = JSON.parse(value2)
  console.log("Giftcard_id..", id)
  console.log("Giftcard_balance..", balance)
  const arr = [];
  for (let i in id) {
    console.log(id[i], balance[i]);
    arr.push({
      "giftcard_number": id[i],
      "redemption_amount": balance[i]
    })
  }

  if (arr.length !== 0) {
    const url = 'https://dev.api.giftcard.99minds.co/api/v1/giftcards/bulk_redeem';

    const bearerToken = process.env.REACT_APP_GIFT_CARD_SECRET_KEY;

    try {
      const response = await axios.post(url, {
        "giftcard": {
          // "store_ref": "store_b1e9eb7ae7873d14c6",
          "data": arr
        }
      }, {
        headers: {
          Authorization: `Bearer ${bearerToken}`
        }
      });
      console.log('Response:', response.data);
      // Handle the response data here
    } catch (error) {
      console.error('Error:', error);
      // Handle the error here
    }
  }
};

const GetLastCart = async () => {

  const apiEndpoint = `${Url}/${Project_key}/carts`;
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
        if (r.data) {
          CreatePayment(r.data.totalPrice.centAmount).then((p) => {
            if (p?.data) {
              console.log("response from log of createpayment", p?.data, '\nversion', p?.data?.version)
              AddPayment(lastValue?.id, lastValue?.version, p?.data?.id).then((q) => {
                if (q?.data) {
                  SetShippingAddress(lastValue?.id, q?.data?.version).then((s) => {
                    if (s?.data) {
                      CreateOrder(lastValue?.id, s?.data.version).then((x) => {
                        if (x?.data) {
                          CreateCart().then((y) => {
                            if (y?.data) {
                              AddItemShippingAddress(y?.data?.id, y?.data?.version).then((z) => {
                                if (z?.data) {
                                  ChangeTaxMode(z?.data?.id, z?.data?.version);
                                  Redeem();
                                }
                              })
                            }
                          })
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    }

  }
  catch (error) {
    console.error(error);
  }
}
let boolvalue = false
const Success = () => {
  useEffect(() => {
    if (boolvalue === false) {
      GetLastCart()
      boolvalue = true
    }
  }, [])
  return (
    <>
      <NavbarForCart />
      <div>Order was successfull</div>
      <div>Continue to shopping........</div>
      <button type="button" className="btn btn-info" ><a className="nav-link" href="/">Continue shopping</a></button>
      <a className="nav-link" href="/">Home</a>
    </>
  )
}

export default Success



