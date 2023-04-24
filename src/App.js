
import './App.css';
import axios from 'axios';
// import Navbar from './components/Navbar';
import { useEffect, useState } from 'react';
import Card from './components/Card';
import Cart from './components/Cart';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import AddPayment from './components/AddPayment';
import Koko from './components/Stripe';
import "@stripe/stripe-js"
import Success from './components/Success';
import Cancel from './components/Cancel';


function App() {
  const [apidata, setApidata] = useState([])
  const bearerToken = process.env.REACT_APP_SECRET_API_KEY;
  const apiEndpoint = 'https://api.us-central1.gcp.commercetools.com/obongg26te1hxzh/products';



  const axiosConfig = {
    headers: {
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/json'
    }
  };


  // for products
  useEffect(() => {
    axios.get(apiEndpoint, axiosConfig)
      .then(response => setApidata(response.data.results
      ))
      .catch(error => console.error(error));
  }, [])




  console.log(apidata, "All products")


  return (
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
        {/* <Route path='/' element={<Navbar />} /> */}
        <Route path='/cart' element={<Cart />} />
        <Route path='/AddPayment' element={<AddPayment />} />
        <Route path='/Koko' element={<Koko />} />
        <Route path='/Success' element={<Success />} />
        <Route path='/Cancel' element={<Cancel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
