import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from './components/Card';
import Checkout from './components/Checkout';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import "@stripe/stripe-js"
import Success from './components/Success';
import Cancel from './components/Cancel';
import Gotostripe from './components/Stripe/Gotostripe';

function App() {
  

  const [apidata, setApidata] = useState([])
  const bearerToken = process.env.REACT_APP_SECRET_API_KEY;
  const Url = process.env.REACT_APP_API_PUBLIC_URL;
  const Project_key = process.env.REACT_APP_PROJECT_KEY
  const apiEndpoint = `${Url}/${Project_key}/products`;

  const axiosConfig = {
    headers: {
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/json'
    }
  };

  const GetLastCart_1 = async () => {

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
            localStorage.setItem("myKey",lastValue?.id);
        }
    }
    catch (error) {
        console.error(error);
    }
}

  const Data = async () => {
    try {
        const response = await axios.get(apiEndpoint, axiosConfig);
        if (response.data) {
            setApidata(response.data.results)
        }
    }
    catch (error) {
        console.error(error);
    }
}
  useEffect(()=>{
    GetLastCart_1()
    Data()
  const query = new URLSearchParams(window.location.search);
      if (query.get("success")) {
        console.log("Order placed! You will receive an email confirmation.");
        window.location.href = "http://localhost:3000/success";
      }
      if (query.get("canceled")) {
        window.location.href = "http://localhost:3000/canceled";
       }
  },[])

  console.log(apidata, "All products")

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <div className='container'>
              <div className='row'>
                <Navbar />
                {apidata?.map((i) => {
                  return (
                    <div key={i + 5} className='col-3'>
                      <Card prop1={i} />
                    </div>
                  )
                })}
              </div>
            </div>} />
          <Route path='/checkout' element={<Checkout/>} />
          <Route path='/success' element={<Success />} />
          <Route path='/canceled' element={<Cancel />} />
          <Route path='/stripe' element={<Gotostripe />} />
          
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
