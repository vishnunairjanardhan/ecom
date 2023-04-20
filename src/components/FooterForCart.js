import React from 'react'
import { Link } from 'react-router-dom'

const FooterForCart = () => {
    return (
        <>
            <div class="card text-center">
                <div class="card-footer text-muted">
                    <Link to="/Koko" type="button" class="btn btn-info" onClick={()=>{console.log("clieked")}}>Order now</Link>
                </div>
            </div>
        </>
    )
}

export default FooterForCart