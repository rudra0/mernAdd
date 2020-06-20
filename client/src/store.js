import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { productListReducer, productDetailReducer, productSaveReducer, productDeleteReducer } from './reducer/productListReducer';
import { cartReducer } from './reducer/cartReducer';
import  thunk  from 'redux-thunk';
import Cookie from "js-cookie";
import { userReducer, userRegisterReducer, userUpdateReducer  } from './reducer/userReducer';
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, myOrderListReducer, orderListReducer, orderDeleteReducer } from './reducer/orderReducer';

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
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    myOrderList: myOrderListReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    userUpdate: userUpdateReducer,

    
})
const store = createStore(reducer, initialState, compose(applyMiddleware(thunk)));

export default store;