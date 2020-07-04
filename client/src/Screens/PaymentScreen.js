import React, {  useState } from 'react';
import { useDispatch } from 'react-redux';
import { savePayment } from '../actions/cartAction';
import Steps from '../Component/steps';


const PaymentScreen = (props)=>{
    
    
    const dispatch = useDispatch();
    

   
    const [paymentMethod, setPaymentMethod] = useState('');
    
    

    const submitHandler =(e)=>{
        
            e.preventDefault();
            dispatch(savePayment({ paymentMethod} ));
            props.history.push("placeorder")
            
        
        
    }

    
    return(
        <div>
            <Steps step1 step2 step3/>
        <div className="form">

            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h2 style={{textAlign:"center", marginBottom:0}}>Payment</h2>
                    </li>

                    <li>
                        <div>
                            <input type="radio" name="payment" id="payment" value="Cash On Delivery"  
                            onChange={(e)=>setPaymentMethod(e.target.value)} className="input">
                             </input>
                             
                            <label htmlFor="payment">
                                Cash On Delivery
                            </label>
                            <br/>
                            <br/>
                            <input type="radio" name="payment" id="payment" value="Online"  
                            onChange={(e)=>setPaymentMethod(e.target.value)} className="input">
                             </input>
                            <label htmlFor="payment">
                                Online Payment
                            </label>
                        </div>
                        
                        
                        
                    </li>

                    <li>
                        <button type="submit" className="button primary"> Continue </button>
                    </li>

                   
                     
                </ul>
            </form>
        </div>

        </div>

        
    )
}
export default PaymentScreen;
