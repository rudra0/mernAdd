import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Register, register } from '../actions/userAction';


const RegisterScreen = (props)=>{
    
    
    const dispatch = useDispatch();
    const userRegister = useSelector(state=> state.userRegister);
    const redirect = props.location.search ? props.location.search.split("=")[1] : "/";

    const { loading, userInfo, error } = userRegister

   
    

    useEffect(() => {

        if(userInfo)
        {
            props.history.push(redirect);
            
        }
       
        return () => {
            
        }
    }, [  userInfo  ])

    const [name, setname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [repassword, setrePassword] = useState('')
    const [contact, setNumber] = useState('');

    const submitHandler =(e)=>{
        
            e.preventDefault();
            dispatch(register( name, email, password, contact ));
            
        
        
    }

    
    return(
        <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h2 style={{textAlign:"center", marginBottom:0}}>Register</h2>
                    </li>

                    <li>
                        {loading && <div>Loading...</div>}
                        {error && <div>{error}</div>}
                    </li>

                    <li>
                        <label htmlFor="name">
                            Name
                        </label>
                        <input type="text" name="name" id="name"  onChange={(e)=>setname(e.target.value)} className="input">
                        </input>
                    </li>

                    <li>
                        <label htmlFor="email">
                            Email
                        </label>
                        <input type="email" name="email" id="email"  onChange={(e)=>setEmail(e.target.value)} className="input">
                        </input>
                    </li>

                    <li>
                        <label htmlFor="mobileNumber">
                            Mobile Number
                        </label>
                        <input type="Number" name="number" id="number"  onChange={(e)=>setNumber(e.target.value)} className="input">
                        </input>
                    </li>

                    <li>
                        <label htmlFor="password">
                            Password
                        </label>
                        <input type="password" name="password" id="password" onChange={(e)=>setPassword(e.target.value)} className="input">
                        </input>
                    </li>

                    <li>
                        <label htmlFor="repassword">
                            Confirm Password
                        </label>
                        <input type="password" name="repassword" id="repassword" onChange={(e)=>setrePassword(e.target.value)} className="input">
                        </input>
                    </li>

                    <li>
                        <button type="submit" className="button primary"> Register </button>
                    </li>

                    <li>
                       <h3 style={{marginBottom: 0}}> Already Have an Account</h3> 
                    </li>

                    <li>
                    <Link to={ redirect ==="/" ? "signin" : "register?signin=" + redirect } className="button secondary">
                            Click To Sign In
                        </Link>
                    </li>
                     
                </ul>
            </form>
        </div>

        
    )
}
export default RegisterScreen;
