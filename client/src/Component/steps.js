import React from 'react'
function Steps(props){
    return <div className="checkout-steps">
        <div className={props.step1 ? "active" : ''}>SignIn</div>
        <div className={props.step1 ? "active" : ''}>Shipping</div>
        <div className={props.step3 ? "active" : ''}>Payment</div>
        <div className={props.step4 ? "active" : ''}>PlaceOrder</div>
    </div>
}

export default Steps;