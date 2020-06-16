import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { productListReducer, productDetailReducer, productSaveReducer, productDeleteReducer } from './reducer/productListReducer';
import { cartReducer } from './reducer/cartReducer';
import  thunk  from 'redux-thunk';
import Cookie from "js-cookie";
import { userReducer, userRegisterReducer } from './reducer/userReducer';

const cartItems = Cookie.getJSON("cartItems") || [] ;

const userInfo = Cookie.getJSON("userInfo") || null ;



const initialState = { cart:{ cartItems, shipping:{}, payment:{} }, userSignIn:{userInfo},  };
const reducer = combineReducers({
    productList : productListReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    userSignIn: userReducer,
    userRegister: userRegisterReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,

    
})
const store = createStore(reducer, initialState, compose(applyMiddleware(thunk)));

export default store;