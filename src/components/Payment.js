import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import Card from "./Card";
const Payment = () => {
    const [address, setAddress] = useState({});
    const myValue = localStorage.getItem("myKey");
  const handleAddItemShippingAddress = async () => {
    try {
      const cartId = localStorage.getItem("cartId")
      const bearerToken = process.env.REACT_APP_SECRET_API_KEY;
      const apiEndpoint =`https://api.us-central1.gcp.commercetools.com/obongg26te1hxzh/carts/${cartId}`;
      const response = await axios.post(
        apiEndpoint,
        {
          version: myValue,
          actions: [
            {
              action: "addItemShippingAddress",
              address: {
                key: "hello",
                title: "301 Saismita",
                salutation: "Mr.",
                firstName: "VJ",
                lastName: "Nair",
                streetName: "Bara Bangla Road",
                streetNumber: "41",
                additionalStreetInfo: "Backhouse",
                postalCode: "421201",
                city: "Exemplary City",
                region: "Exemplary Region",
                state: "",
                country: "US",
                company: "My Company Name",
                department: "Sales",
                building: "Hightower 1",
                apartment: "247",
                pOBox: "2471",
                phone: "+49 89 12345678",
                mobile: "+49 171 2345678",
                email: "email@example.com",
                fax: "+49 89 12345679",
                additionalAddressInfo: "no additional Info",
                externalId: "Information not needed",
              },
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );
      setAddress(response.data.address);
      console.log("Address added successfully: ", address);
    } catch (error) {
      console.error(error);
    }
  };  
  const [payment, setPayment] = useState({});

  const handlePayment = async () => {
    try {
      const bearerToken = process.env.REACT_APP_SECRET_API_KEY;
      const apiEndpoint =
        "https://api.us-central1.gcp.commercetools.com/obongg26te1hxzh/payments";
      const response = await axios.post(
        apiEndpoint,
        {
          key: uuidv4(),
          interfaceId: uuidv4(),
          amountPlanned: {
            currencyCode: "EUR",
            centAmount: 1000,
          },
          paymentMethodInfo: {
            paymentInterface: "STRIPE",
            method: "CREDIT_CARD",
            name: {
              en: "Credit Card",
            },
          },
          transactions: [
            {
              timestamp: "2015-10-20T08:54:24.000Z",
              type: "Charge",
              amount: {
                currencyCode: "USD",
                centAmount: 1000,
              },
              state: "Success",
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );
      setPayment(response.data);
      console.log("Payment successful: ", payment);
    } catch (error) {
      console.error(error);
    }
    console.log("hit handlePayment")
  };

  console.log('payment id', payment?.id);


  const CallhandleAddPayment =async()=>{
    const apiEndpoint = "https://api.us-central1.gcp.commercetools.com/obongg26te1hxzh/carts";
  const bearerToken = process.env.REACT_APP_SECRET_API_KEY;
  const axiosConfig = {
    headers: {
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/json'
    }
  };
    try{
      const response = await axios.get(apiEndpoint, axiosConfig);
    if (response.data) {
      console.log("from GetLastCart", response.data.results)
      const lastValue = response.data.results[response.data.results?.length - 1];
      handleAddPayment(lastValue?.id)
      console.log("from CallhandleAddPayment")
      
    }
    }
    catch (error) {
      console.error(error);
    }
  }
  const handleAddPayment = async (cartId) => {
    try {
      const bearerToken = process.env.REACT_APP_SECRET_API_KEY;
      const apiEndpoint = `https://api.us-central1.gcp.commercetools.com/obongg26te1hxzh/carts/${cartId}`;
      const response = await axios.post(
        apiEndpoint,
        {
          version: myValue,
          actions: [
            {
              action: "addPayment",
              payment: {
                id: payment?.id,
                typeId: "payment",
              },
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setPayment(response.data);
      console.log("Payment added: ", payment);
    } catch (error) {
      console.error(error);
    }
    console.log("hit handleAddPayment")
  };
  const bearerToken = process.env.REACT_APP_SECRET_API_KEY;

  const orderData = {
    id: "fc056b00-d1fa-405f-bb52-6cbb57bc7a80",
    version: 459,
    orderNumber: uuidv4()
  };
  
  const createOrder = async () => {
    try {
      const response = await fetch("https://api.us-central1.gcp.commercetools.com/obongg26te1hxzh/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${bearerToken}`
        },
        body: JSON.stringify(orderData)
      });
      const data = await response.json();
      console.log("Order created successfully: ", data);
    } catch (error) {
      console.error("Error creating order: ", error);
    }
    console.log("hit createOrder")
  };
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
        "currency": "USD"
      }, axiosConfig);
      console.log("from CreateCart", response.data)
    }
    catch (error) {
      console.error(error);
    }
    console.log("hit CreateCart")
  }

  return (
    <div>
      <button onClick={() => {
        handlePayment();
        handleAddPayment();
        handleAddItemShippingAddress();
        createOrder();
        // CreateCart();
      }}>Confirm Payment</button>
    </div>
  );
};

export default Payment;