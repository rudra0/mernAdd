import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import data from './data';
import './App.css';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen';
import SignInScreen from './Screens/SignInScreen';
import RegisterScreen from './Screens/RegisterScreen';
import { useSelector } from 'react-redux';
import ProductsScreen from './Screens/ProductsScreen';
import ShippingScreen from './Screens/ShippingScreen';
import PaymentScreen from './Screens/PaymentScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import OrderScreen from './Screens/OrderScreen';
import OrdersScreen from './Screens/OrdersScreen';
import ProfileScreen from './Screens/ProfileScreen';


function App() {

  const userSignIn = useSelector(state => state.userSignIn);

  const {userInfo} = userSignIn
  

  const openMenu = ()=>{
    document.querySelector(".sidebar").classList.add("open");
  }

  const closeMenu =()=>{
    document.querySelector(".sidebar").classList.remove("open");
  }
  
  return (
    <BrowserRouter>
          <div className="grid-container">
            <header className="header">
                <div className="brand">
                    <button onClick={openMenu}>
                        &#9776;
                    </button>
                    <Link to='/'>Koob..</Link>
                    
                </div>
                <div className="header-links">
                <Link to="/cart" style={{color:"white"}}>Cart</Link>
                    {
                      userInfo  ? <Link to="/profile" style={{color:"white"}}>{userInfo.name}</Link>
                    :
                    <Link to='/signin'>
                        SignIn
                    </Link>  
                    }

                    {
                      userInfo && userInfo.isAdmin ? <Link to="/products" style={{color:"white"}}>Admin</Link>:
                        <div>{ " " }</div>
                    }
                    
                </div>
            </header>

            <aside className="sidebar">
                <button className="sidebar-close-button" onClick={closeMenu}>x</button>
                <h3>Shopping Cart</h3>
                <ul>
                  
                    <li>
                        <a href="pants.html">Pants</a>
                    </li>
                    <li>
                        <a href="shirts.html">Shirts</a>
                    </li>
                </ul>
            </aside>
            
            <main className="main">
                <div className="content">
                  <Route path="/orders" component={OrdersScreen} />
                  <Route path="/profile" component={ProfileScreen} />
                  <Route path="/order/:id" component={OrderScreen} />
                  <Route path='/products' component={ProductsScreen} />
                  <Route path='/shipping' component={ShippingScreen} />
                  <Route path='/payment' component={PaymentScreen} />
                  <Route path='/placeorder' component={PlaceOrderScreen} />
                  <Route path='/register' component={RegisterScreen} />
                  <Route path='/signin' component = {SignInScreen} />
                  <Route path = '/cart/:id?' component = { CartScreen } />
                  <Route path = '/product/:id' component= { ProductScreen } />
                  <Route path='/' exact= {true} component= { HomeScreen } />
                    
                </div> 
            </main>
            <footer className="footer">All Right Reserverd @2020.</footer>
      </div>
</BrowserRouter>
  );
}

export default App;
