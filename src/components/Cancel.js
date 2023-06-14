import React from 'react'
import { useEffect } from 'react'
import axios from 'axios';
const Cancel = () => {

  const Url = process.env.REACT_APP_API_PUBLIC_URL;
  const Project_key = process.env.REACT_APP_PROJECT_KEY

  const RemoveDiscountCode = async (id, version, discount_id) => {
    const apiEndpoint = `${Url}/${Project_key}/carts/${id}`;
    const bearerToken = process.env.REACT_APP_SECRET_API_KEY;
    const axiosConfig = {
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json'
      }
    };
    try {
      const response = await axios.post(apiEndpoint, {
        "version": version,
        "actions": [
          {
            "action": "removeDiscountCode",
            "discountCode": {
              "typeId": "discount-code",
              "id": `${discount_id}`
            }
          }
        ]
      }, axiosConfig);
      console.log("RemoveDiscountCode was called....", response)
    }
    catch (error) {
      console.error(error);
    }

    console.log("RemoveDiscountCode...", "id is", apiEndpoint, "version is", version)
  }

  const Get_last_cart = async () => {
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
        const lastValue = response.data.results[response.data.results?.length - 1];
        console.log("Get_last_cart...", lastValue)
        const flag = lastValue.discountCodes.length >= 1
        console.log("flag is...", flag)
        if (flag) {
          console.log("flag2 is...", flag)
          RemoveDiscountCode(lastValue.id, lastValue.version, lastValue.discountCodes[0].discountCode.id)
        }
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    Get_last_cart()
    console.log("Payment was cancell...", "Get_last_cart was called")
  }, [])

  return (
    <>
      <div>Payment was cancell</div>
      <button to="/App" type="button" class="btn btn-info" onClick={console.log("from cancel page")}> <a className="nav-link active" aria-current="page" href="/">Home</a></button>
    </>
  )
}

export default Cancel