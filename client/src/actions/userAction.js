import Axios from "axios";
import Cookies from 'js-cookie'
import { USER_SIGNIN_FAILED, USER_SIGNIN_SUCCESS, USER_SIGNIN_REQUEST, USER_REGISTER_FAILED, USER_REGISTER_SUCCESS, USER_REGISTER_REQUEST, USER_LOGOUT, USER_UPDATE_FAIL, USER_UPDATE_SUCCESS, USER_UPDATE_REQUEST } from "../constants/userConstants";


const signin = ( email, password ) => async(dispatch) => {

    dispatch({
        type:USER_SIGNIN_REQUEST,
        payload: { email, password }
    });
    try{
        const { data } =await Axios.post("/api/users/signin", { email, password });
        dispatch({ 
            type: USER_SIGNIN_SUCCESS, payload: data ,
             });
            console.log(data)
            Cookies.set('userInfo', JSON.stringify(data))
    }
    catch(error){
        dispatch({
            type:USER_SIGNIN_FAILED, payload: error.message
        });

    }

}

const register = ( name, email, password, contact ) => async(dispatch) => {

    dispatch({
        type:USER_REGISTER_REQUEST,
        payload: { name, email, password }
    });
    try{
        const { data } =await Axios.post("/api/users/register", { name, email, password, contact });
        dispatch({ 
            type: USER_REGISTER_SUCCESS, payload: data ,
             });
            
            Cookies.set('userInfo', JSON.stringify(data))
    }
    catch(error){
        dispatch({
            type:USER_REGISTER_FAILED, payload: error.message
        });

    }

}

const update = ({ userId, name, email, password }) => async (dispatch, getState) => {
    const {userSignIn:{userInfo}} = getState();
    dispatch({ type: USER_UPDATE_REQUEST, payload: { userId, name, email, password } });
    try {
      const { data } = await Axios.put("/api/users/" + userId,
        { name, email, password }, {
        headers: {
          Authorization: 'Bearer ' + userInfo.token
        }
      });
      
      dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
      Cookies.set('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
    }
  }
  
  const logout = () => (dispatch) => {
    Cookies.remove("userInfo");
    dispatch({ type: USER_LOGOUT })
  }



export { signin, register, logout, update }