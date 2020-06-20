import { USER_SIGNIN_FAILED, USER_SIGNIN_SUCCESS, USER_SIGNIN_REQUEST, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAILED, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL } from "../constants/userConstants";

function userReducer( state= {}, action)
{
    
    switch(action.type)
    {
        case USER_SIGNIN_REQUEST:
            {
                return  { loading: true};
            }
        case USER_SIGNIN_SUCCESS:
            {
                return { loading: false, userInfo: action.payload}

            }
        case USER_SIGNIN_FAILED:
            {
                return { loading: false, error: action.payload } 
               
            }
        default:
            return state;
    }


}

function userRegisterReducer( state= {}, action)
{
    
    switch(action.type)
    {
        case USER_REGISTER_REQUEST:
            {
                return  { loading: true};
            }
        case USER_REGISTER_SUCCESS:
            {
                return { loading: false, userInfo: action.payload}

            }
        case USER_REGISTER_FAILED:
            {
                return { loading: false, error: action.payload } 
               
            }
        default:
            return state;
    }


}

function userUpdateReducer(state = {}, action) {
    switch (action.type) {
      case USER_UPDATE_REQUEST:
        return { loading: true };
      case USER_UPDATE_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case USER_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      default: return state;
    }
  }

export {
    userReducer,
    userRegisterReducer,
    userUpdateReducer
}