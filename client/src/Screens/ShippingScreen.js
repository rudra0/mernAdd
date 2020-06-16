import React, {  useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveShipping } from '../actions/cartAction';
import Steps from '../Component/steps';


const ShippingScreen = (props)=>{
    
    
    const dispatch = useDispatch();
    

   
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('')
    const [postal, setPostal] = useState('')
    

    const submitHandler =(e)=>{
        
            e.preventDefault();
            dispatch(saveShipping( {address, city, country, postal} ));
            props.history.push("payment")
            
        
        
    }

    
    return(
        <div>
            <Steps step1 step2/>
        <div className="form">

            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h2 style={{textAlign:"center", marginBottom:0}}>Shipping</h2>
                    </li>

                    <li>
                        <label htmlFor="name">
                            Address
                        </label>
                        <input type="text" name="address" id="address"  onChange={(e)=>setAddress(e.target.value)} className="input">
                        </input>
                    </li>

                    <li>
                        <label htmlFor="City">
                            City
                        </label>
                        <input type="text" name="city" id="city"  onChange={(e)=>setCity(e.target.value)} className="input">
                        </input>
                    </li>

                    <li>
                        <label htmlFor="Country">
                            Country
                        </label>
                        <input type="text" name="country" id="country"  onChange={(e)=>setCountry(e.target.value)} className="input">
                        </input>
                    </li>

                    <li>
                        <label htmlFor="Postal">
                            Postal Code
                        </label>
                        <input type="text" name="postal" id="postal"  onChange={(e)=>setPostal(e.target.value)} className="input">
                        </input>
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
export default ShippingScreen;
