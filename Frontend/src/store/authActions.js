import {axiosInstance} from '../lib/axios.js'
import toast from 'react-hot-toast'

import {
  setAuthUser,
  setCheckingAuth,
  setLoggingIn,
  setSigningUp,
  setUpdatingProfile,
} from "./authSlice.js";


export const checkAuth=()=>async (dispatch)=>{
    try{
        const res=await axiosInstance.get('/auth/checkAuth')

        dispatch(setAuthUser(res.data));

        //connect socket()
    }
    catch(e){
        dispatch(setAuthUser(null))

    }
    finally{
        dispatch(setCheckingAuth(false))
    }
}

export const login =(data) => async (dispatch)=>{
    try{
        const res=await axiosInstance.post('/auth/signin',data);

        dispatch(setAuthUser(res.data))

        toast.success("Logged in successfully")

        //connectSocket()
    }
    catch (error) {
    toast.error(error.response?.data?.message || "Login failed");
  } finally {
    dispatch(setLoggingIn(false));
  }
}


export const signup=(data) => async (dispatch) =>{
    dispatch(setSigningUp(true))

    try{
        const res= await axiosInstance.post('/auth/signup',data);

        dispatch(setAuthUser(res.data))

        toast.success('Account created Succesfully')

        //connectSocket()
    }
    catch (error) {
    toast.error(error.response?.data?.message || "Signup failed");
  } finally {
    dispatch(setSigningUp(false));
  }
}

export const logout=()=> async (dispatch)=>{
    try{
        await axiosInstance.post('/auth/logout');
        dispatch(setAuthUser(null));
        toast.success("Logged out successfully");

        //disconnectSocket()
    }
    catch (error) {
    toast.error(error.response?.data?.message || "Logout failed");
  }
}


export const updateProfile = (data) => async (dispatch) => {
  dispatch(setUpdatingProfile(true));

  try {
    const res = await axiosInstance.put("/auth/update-profile", data);

    dispatch(setAuthUser(res.data));

    toast.success("Profile updated successfully");
  } catch (error) {
    toast.error(error.response?.data?.message || "Update failed");
  } finally {
    dispatch(setUpdatingProfile(false));
  }
};