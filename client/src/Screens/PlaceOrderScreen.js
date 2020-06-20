import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import Steps from '../Component/steps';
import { createOrder } from '../actions/orderActions';


export default function PlaceOrderScreen ( props ) {

    const cart = useSelector(state=>state.cart);
    

    const orderCreate = useSelector(state=>state.orderCreate);
    

    const { loading, success, error, order } = orderCreate;

    console.log(orderCreate)

    const {cartItems, shipping, payment} = cart; 

    const dispatch = useDispatch();
    const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = 0.15 * itemsPrice;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    

    if(!shipping.address)
    {
        props.history.push("/shipping")
    }else if(!payment.paymentMethod)
    {
        props.history.push("/payment")
    }

    function placeOrderHandler()
    {
        dispatch(createOrder({
            orderItems: cartItems, shipping, payment, itemsPrice, shippingPrice, taxPrice, totalPrice
        }))
    }

    useEffect(()=>
    {
        if(success)
        {
            alert("Yay Your Order Has Been Placed...")
            props.history.push("/order/"+ order._id);
        }
    },[success])

    function backToHome(){
        alert('Your Order Is Cancelled !!')
    }
    

   
        return (
            <div>
                <Steps step1 step2 step3 step4/>
                    <div className="placeorder">
                        <div className="placeorder-info">
                            <div>
                                <h3>
                                    Shipping 
                                </h3>
                                <div>
                                    {cart.shipping.address?cart.shipping.address:' '}, {cart.shipping.city},
                                    {cart.shipping.postal}, {cart.shipping.country},
                                </div>
                            </div>
                            <div>
                                <h3>Payment</h3>
                                 <div>
                                     {cart.payment.paymentMethod}
                                 </div>
                            </div>
                            <div>
                                <ul className="cart-list-container">
                                    <li >
                                        <h3>Shopping Cart</h3>
                                        <div>
                                            Price
                                        </div>
                                    </li>
                                    {
                                        cartItems.length === 0?
                                        <div>
                                            <div> Cart Is Empty </div>
                                            <br/>
                                            
                                            <Link to="/">
                                                <div style={{textAlign:"center"}}>
                                                    <button type="button" className="button">
                                                        Continue Shopping</button> 
                                                        </div>
                                            </Link>
                                        </div>:
                                            cartItems.map( item =>  
                                            <li>
                                                <div className="cart-image">
                                                    <img src={item.image} alt="Product"/>
                                                </div>
                                                
                                                <div >
                                                    <div className="cart-name">
                                                        <Link to={"/product/"+ item.product}>
                                                            {item.name}
                                                        </Link>
                                                    </div>
                                                
                                                    <div className="cart-quantity">
                                                        Qty: {item.qty}
                                                       
                                                        
                                                    </div>
                                                    <div>
                                                    
                                                    </div>

                                                </div>

                                            
                                                <div className="cart-price">
                                                ${item.price}
                                                </div>
                                            </li>
                                            )
                                        
                                    }
                                </ul>
                            </div>
                            
                                    
                        </div>
                        
                      
                        

                        <div className="placeorder-action">
                            <ul>
                                <li >
                                    <button className="buttons primary "  onClick={ placeOrderHandler }>Place Order</button>
                                </li>
                                <li>
                                    <h3>Order Summary</h3>
                                </li>
                                <li>
                                    <div>Items</div>
                                    <div>${itemsPrice}</div>
                                </li>
                                <li>
                                    <div>Shipping</div>
                                    <div>${shippingPrice}</div>
                                </li>
                                <li>
                                    <div>Tax</div>
                                    <div>${taxPrice}</div>
                                </li>
                                
                                <li>
                                    <div>Total Price</div>
                                    <div>${totalPrice}</div>
                                </li>

                            </ul>
                           
                                <br/>
                                <br/>
                            <Link to="/">
                            <button className="buttons" type="button" onClick={backToHome}>Cancel Order</button>
                        </Link>
                            

                        </div>
                        
                    
                </div>
            </div>
            
            
        )
    }

