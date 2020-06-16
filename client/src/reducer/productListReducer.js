import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAILED, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAILED } from "../constants/productConstants";
import { PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_FAILED } from "../constants/productConstants";
import { PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAILED } from "../constants/productConstants";
function productListReducer(state = {products: []}, action)
{
     
    switch(action.type)
    {
        case PRODUCT_LIST_REQUEST:
            return {loading: true, products:[] };
        case PRODUCT_LIST_SUCCESS:
            return {loading: false, products: action.payload};
            
            
        case PRODUCT_LIST_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function productDetailReducer(state = {products: {}}, action)
{
      
    switch(action.type)
    {
        case PRODUCT_DETAIL_REQUEST:
            return {loading: true};
        case PRODUCT_DETAIL_SUCCESS:
            return {loading: false, products: action.payload};
            
            
        case PRODUCT_DETAIL_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function productDeleteReducer(state = {products: {}}, action)
{
      
    switch(action.type)
    {
        case PRODUCT_DELETE_REQUEST:
            return {loading: true};
        case PRODUCT_DELETE_SUCCESS:
            return {loading: false, product: action.payload, success: true };
            
            
        case PRODUCT_DELETE_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}


function productSaveReducer(state = {product: {}}, action)
{
       
    switch(action.type)
    {
        case PRODUCT_SAVE_REQUEST:
            return {loading: true};
        case PRODUCT_SAVE_SUCCESS:
            return {loading: false, success: true, product: action.payload};
            
            
        case PRODUCT_SAVE_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}



export { productListReducer, productDetailReducer, productSaveReducer, productDeleteReducer } ;