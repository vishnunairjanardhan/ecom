import React from 'react'
import axios from 'axios'





const Card = (props) => {

    const bearerToken = process.env.REACT_APP_SECRET_API_KEY;
    const apiEndpoint = 'https://api.us-central1.gcp.commercetools.com/obongg26te1hxzh/carts/fc056b00-d1fa-405f-bb52-6cbb57bc7a80'

    const axiosConfig = {
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json'
        }
    };




    // function Handleclick(values) {

        // axios.post(apiEndpoint, {
        //     "version": cartversion,
        //     "actions": [
        //         {
        //             "action": "addLineItem",
        //             "productId": values.id,
        //             "variantId": 1,
        //             "quantity": 1,
        //             "supplyChannel": {
        //                 "typeId": "channel",
        //                 "id": "02473a99-4fc2-41d3-8412-23199c1b1f1b"
        //             },
        //             "distributionChannel": {
        //                 "typeId": "channel",
        //                 "id": "02473a99-4fc2-41d3-8412-23199c1b1f1b"
        //             },
        //             "externalTaxRate": {
        //                 "name": "StandardExternalTaxRate",
        //                 "amount": 0.19,
        //                 "country": "DE",
        //                 "state": "Bavaria"
        //             },
        //             "shippingDetails": {
        //                 "targets": [{
        //                     "addressKey": "exampleKey",
        //                     "quantity": 1
        //                 }]
        //             }
        //         }
        //     ]
        // }, axiosConfig)
        //     .then(response => console.log(response.data,"from addlineitem function"))
        //     .catch(error => console.error(error));

    //     return (<h1>lol</h1>)
    // }


    const addLineItem = async (cartVersion, product_Id) => {
        console.log(cartVersion,product_Id,"get productId and caerVersion")
    
        try {
            const response = await axios.post(apiEndpoint,{
                "version": cartVersion,
                "actions": [
                    {
                        "action" : "addLineItem",
                        "productId" : product_Id,
                        "variantId" : 1,
                        "quantity" : 1,
                        "supplyChannel" : {
                          "typeId" : "channel",
                          "id" :  "02473a99-4fc2-41d3-8412-23199c1b1f1b"
                        },
                        "distributionChannel" : {
                          "typeId" : "channel",
                          "id" : "02473a99-4fc2-41d3-8412-23199c1b1f1b"
                        },
                        "externalTaxRate" : {
                          "name" : "StandardExternalTaxRate",
                          "amount" : 0.19,
                          "country" : "DE",
                          "state" : "Bavaria"
                        },
                        "shippingDetails" : {
                          "targets" : [ {
                            "addressKey" : "kokko",
                            "quantity" : 1
                          } ]
                        }
                      }
                ]
            },axiosConfig);
            console.log(response.data,"from addLineItem")
        }
        catch (error) {
            console.error(error);
        }


    }



    const getCartVersion = async () => {
        try {
            const response = await axios.get(apiEndpoint, axiosConfig);
            if (response.data) {
                console.log("from getCartVersion ",response.data)
                addLineItem(response.data.version,props.prop1.id)
            }
        }
        catch (error) {
            console.error(error);
        }


    }



    // function for Addlineitem
    return (
        <>
        <div>
            <div className="card shadow-sm p-3 mb-5 bg-body-tertiary rounded" style={{ width: "18rem", height: "35rem" }}>
                <img src={props.prop1["masterData"]["current"]["masterVariant"]["images"][0]["url"]} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{props.prop1["masterData"]["current"]["name"]["en"]}</h5>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><b>$</b>{props.prop1["masterData"]["current"]["masterVariant"]["prices"][15]["value"]["centAmount"] / 100}</li>

                        <li className="list-group-item"><button type="button" className="btn btn-secondary btn-lg" onClick={() => { getCartVersion() }}>Add to Cart</button></li>

                    </ul>

                </div>
            </div></div>
            </>
            
    )

}

export default Card