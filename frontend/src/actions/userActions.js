import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../constants/userConstants";

export const login =
  (email, password) =>
  async (
    dispatch 
  ) => {   // redux-thunk allow us nested function, first for params and second for callback and returning another func
    try {
      dispatch({ type: USER_LOGIN_REQUEST }); // loading=true

      const config = {
        //whenever we request an api it takes json data so we need to provide some headers
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        // fetching data by axios
        "/api/users/login",
        {
          email,
          password,
        },
        config
      );

      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

      // after successfully login store data in our localstorage
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  
  export const logout = () => async (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({type: USER_LOGOUT});  //  it calling USER_LOGOUT  and its cleared from the redux too.
  };


  export const register = (name, email, password,isAdmin, pic) => async (dispatch) => {
    try {
      dispatch({type: USER_REGISTER_REQUEST});

     const config = {
       headers: {
         "Content-type": "application/json",
       },
     };

     const  {data} = await axios.post(
       "api/users",
       {name, email, password,isAdmin, pic},
       config
     );

     dispatch({type: USER_REGISTER_SUCCESS, payload: data});
     
     dispatch({type: USER_LOGIN_SUCCESS, payload:data});

     localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
          ?error.response.data.message
          : error.message,
      });
      
    }
  };

 export const updateProfile = (user) => async (dispatch, getState) => {
   try {
     dispatch({type:USER_UPDATE_REQUEST});

     const {
       userLogin: {userInfo},
     } = getState();   // currently login user is authorized to update their profile

     const config = {
       headers: {
         "Content-Type": "application/json",  // since we are passing json data to backend
         Authorization:  `Bearer ${userInfo.token}`,
       },
     };

     const { data } = await axios.post("/api/users/profile", user, config);
     
     dispatch({type:USER_UPDATE_SUCCESS, payload: data});

     dispatch({type: USER_LOGIN_SUCCESS, payload:data});

     localStorage.setItem("userInfo", JSON.stringify(data));
   } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
        ?error.response.data.message
        : error.message,
    });
   }
 };