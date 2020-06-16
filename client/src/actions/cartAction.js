import Axios from "axios"
import { CART_ADD, CART_DELETE , CART_SAVE_SHIPPING, CART_SAVE_PAYMENT } from  '../constants/cartConstants'
import Cookie from "js-cookie";

const addToCart = (productId, qty ) => async(dispatch, getState) =>{

          
        const { data } = await Axios.get("/api/products/"+ productId);
        dispatch({ type:CART_ADD, payload: {
            product: data._id,
            name : data.name,
            image : data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty  
            }
        });
        const { cart:{ cartItems } } = getState();
        console.log(cartItems)
        Cookie.set( "cartItems", JSON.stringify(cartItems));
    
}
const removeFromCart = (productId) => async( dispatch, getState )=>{
        
        dispatch({
            type: CART_DELETE,
            payload: productId
        });
        const { cart:{ cartItems } } = getState();
        Cookie.set( "cartItems", JSON.stringify(cartItems));
}

const saveShipping =( data ) => (dispatch) =>
{

    dispatch({
        type:CART_SAVE_SHIPPING,
        payload: data
    });
}

const savePayment =( data ) => (dispatch, getState) =>
{

    
    dispatch({
        type:CART_SAVE_PAYMENT,
        payload: data
    });
}





export { addToCart, removeFromCart, saveShipping, savePayment };