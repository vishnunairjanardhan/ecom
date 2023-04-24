import React from 'react'

const Success = () => {
  return (
    <>
      <div>Order was successfull</div>
      <div>Continue to shopping........</div>
      <button to="/App" type="button" class="btn btn-info" onClick={console.log("from cancel page")}> <a className="nav-link active" aria-current="page" href="/">Home</a></button>
    </>
  )
}

export default Success