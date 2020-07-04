import React, { useState, useEffect } from 'react';
import {  useDispatch } from 'react-redux'
import Axios from 'axios';
import { paymnentId } from '../actions/orderActions';



 function loadScript(src) {
    return new Promise((resolve) => {

            const script = document.createElement('script')
            script.src = src
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }
    
    const __DEV__ = document.domain === 'localhost'
    
    const  PaymentGateway = ({ amount, orders, h })=> {

        
        
        var id = ''
        const dispatch = useDispatch();
        const idHandler = (dataId) =>
        {
           id = dataId;
           
           dispatch(paymnentId(id,orders))
           

        }
        
        
           
        
        
        async function displayRazorpay() {

            const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
    
            if (!res) {
                alert('Razorpay SDK failed to load. Are you online?')
                return
            }

           
    
            const {data} = await Axios.post('http://localhost:3002/razorpay', {amount})
           if(data)
           {
              idHandler(data.id);
           }
            

            
            const options = {
                key: __DEV__ ? 'rzp_test_VHWqslZ0KtAnIS' : 'PRODUCTION_KEY',
                currency: data.currency,
                amount: data.amount.toString(),
                order_id: data.id,
                name: 'Koob Shopping Cart',
                description: 'Thank you Choosing Us. We care for you!!',
                handler: function (response) {
                    
                    //alert(response)
                },
                prefill: {
                    name:'rudra',
                    email: 'sdfdsjfh2@ndsfdf.com',
                    phone_number: '9899999999'
                }
            }
            const paymentObject = new window.Razorpay(options)
            paymentObject.open()
            
        }
    
        return (
            <div >
                <header >
                    <p>You Have Selected online Payment Mode</p>
                    <a
                        className="App-link"
                        onClick={displayRazorpay}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{cursor:"pointer"}}
                    >
                       Click Me To Pay!! 
                    </a>
                </header>
            </div>
        )
    }
    


export default PaymentGateway