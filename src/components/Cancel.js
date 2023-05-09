import React from 'react'
// import { Link } from 'react-router-dom'
// import axios from 'axios';
const Cancel = () => {
 

  return (
    <>
      <div>Payment was cancell</div>
      <button to="/App" type="button" class="btn btn-info" onClick={console.log("from cancel page")}> <a className="nav-link active" aria-current="page" href="/">Home</a></button>
    </>
  )
}

export default Cancel