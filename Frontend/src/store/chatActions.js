import {axiosInstance} from '../lib/axios.js'
import toast from 'react-hot-toast'
import {
  setUsers,
  setUsersLoading,
  setMessages,
  setMessagesLoading,
  addMessage,
} from "./chatSlice";

export const getUsers = () => async (dispatch)=>{
    dispatch(setUsersLoading(true))

    try{
        const res=await axiosInstance.get('messages/getUsersForSidebar');
        dispatch(setUsers(res.data))
        return res.data
    }
    catch(e){
        toast.error(e.res?.data?.message || "Failed to fetch Users")
    }
    finally{
            dispatch(setUsersLoading(false))

    }
};

export const getMessages=(userId)=>async (dispatch) =>{
    dispatch(setMessagesLoading(true))
    try{
        const res=await axiosInstance.get(`/messages/${userId}`)
        dispatch(setMessages(res.data))
    }
     catch (error) {
    toast.error(error.response?.data?.message || "Failed to fetch messages");
  } finally {
    dispatch(setMessagesLoading(false));
  }
}

export const sendMessage=(userId,messageData)=>async (dispatch) =>{
    try {
    const res = await axiosInstance.post(
      `/messages/send/${userId}`,
      messageData
    );

    dispatch(addMessage(res.data));
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to send message");
  }

}