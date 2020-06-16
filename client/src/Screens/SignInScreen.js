import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/userAction';


const SignInScreen = (props)=>{
    
    
    const dispatch = useDispatch();
    const userSignIn = useSelector(state=> state.userSignIn);

    const { loading, userInfo, error } = userSignIn

    const redirect = props.location.search ? props.location.search.split("=")[1] : "/";
    console.log(userInfo)
    

    useEffect(() => {

        if(userInfo)
        {
            props.history.push(redirect);
            
        }
       
        return () => {
            
        }
    }, [  userInfo  ])

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    

    const submitHandler =(e)=>{
        
            e.preventDefault();
            dispatch(signin(email, password ));
            
        
        
    }

    
    return(
        <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h2 style={{textAlign:"center", marginBottom:0}}>Sign In</h2>
                    </li>
                    <li>
                        {loading && <div>Loading...</div>}
                        {error && <div>{error}</div>}
                    </li>
                    <li>
                        <label htmlFor="email">
                            Email
                        </label>
                        <input type="email" name="email" id="email"  onChange={(e)=>setEmail(e.target.value)} className="input">
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
                        <button type="submit" className="button primary"> Sign In</button>
                    </li>
                    <li>
                       <h3 style={{marginBottom: 0}}> New To Koob?</h3> 
                    </li>
                    <li>
                        <Link to={ redirect ==="/" ? "register" : "register?redirect=" + redirect } className="button secondary">
                            Create Your Koob Account
                        </Link>
                    </li>
                     
                </ul>
            </form>
        </div>

        
    )
}
export default SignInScreen;
