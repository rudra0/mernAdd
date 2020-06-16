import React, {  useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartAction';
import {Link} from 'react-router-dom'


export default function CartScreen ( props ) {

    const cart = useSelector(state=>state.cart);

    const {cartItems} = cart; 

    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split("=")[1]):1; 

    const dispatch = useDispatch();

    const checkoutHandler =()=>{
        props.history.push("/signin?redirect=shipping"); 
    }

    const removeFromCartHandler = (productId) =>
    {
        dispatch(removeFromCart(productId));
    }
    
    useEffect(() => {
        if(productId)
            dispatch(addToCart(productId, qty));
        return () => {
            
        }
    }, [])
        return (
            <div className="cart">
                <div className="cart-list">
                    <ul className="cart-list-container">
                        <li >
                            <h3>Shopping Cart Items</h3>
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
                                         <img src={item.image} alt="Product" />
                                    </div>
                                    
                                    <div >
                                        <div className="cart-name">
                                            <Link to={"/product/"+ item.product}>
                                                 {item.name}
                                            </Link>
                                        </div>
                                    
                                        <div className="cart-quantity">
                                            Qty
                                            <select value={item.qty} onChange= { (e) => dispatch(addToCart( item.product, e.target.value))}>
                                            { [...Array(item.countInStock).keys()].map(x=>
                                                <option value= { x + 1 } key={x+1}>{ x + 1 }</option>
                                                )}
                                            </select>
                                            
                                        </div>
                                        <div>
                                        <button type="button" className="button" onClick={()=>removeFromCartHandler(item.product)}>
                                                Delete
                                            </button>
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
                 
                 <hr/>
                

                <div className="cart-action">
                    <h3>
                        Subtotal(Items { cartItems.reduce( (a, c)  => a + Number(c.qty), 0) })
                        :
                        ${ cartItems.reduce( ( a, c )=> a + c.price*c.qty, 0 ) }
                    
                        </h3>
                    <button className="button primary" disabled={ cartItems.length === 0} onClick={ checkoutHandler }>
                        Proceed To Check Out!
                    </button>
                        <br/>
                        <br/>
                    <Link to="/">
                    <button className="button" type="button">Shop More!!</button>
                 </Link>
                    

                </div>
                
                
            </div>
            
        )
    }

