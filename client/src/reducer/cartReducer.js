import { CART_ADD, CART_DELETE, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT  } from  '../constants/cartConstants';

function cartReducer (state= { cartItems: [], shipping:{}, payment: {} }, action)
{
    
    switch(action.type)
    {
        case CART_ADD:
            {
                const item = action.payload;
                const product = state.cartItems.find(x => x.product === item.product)

                if(product)
                {
                   return {   cartItems: state.cartItems.map( x => x.product === product.product? item : x) }
                }
                return { cartItems: [...state.cartItems, item]}


            }
        case CART_DELETE:
            {
                return{ cartItems: state.cartItems.filter(x=>x.product !== action.payload)}
            }

            case CART_SAVE_SHIPPING:
                {
                    return{ ...state, shipping: action.payload}
                }
            
            case CART_SAVE_PAYMENT:
                {
                    return{ ...state, payment: action.payload}
                }
        default :
            return state;
    }
}



export{ cartReducer }