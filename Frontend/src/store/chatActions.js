import {axiosInstance} from '../lib/axios.js'
import toast from 'react-hot-toast'
import { getSocket } from "../lib/socket.js";
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
        const res=await axiosInstance.get('messages/users');
        dispatch(setUsers(res.data))
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
    console.log(res)

    dispatch(addMessage(res.data));
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to send message");
  }

}


export const subscribeToMessages = () => (dispatch, getState) => {
  const socket = getSocket();

  if (!socket) return;

  // remove previous listener
  socket.off("newMessage");

  socket.on("newMessage", (newMessage) => {
    console.log("Received:", newMessage);

    const { selectedUser } = getState().chat;

    if (!selectedUser) return;

    // MySQL column names
    if (
      newMessage.sender_id === selectedUser.id ||
      newMessage.receiver_id === selectedUser.id
    ) {
      dispatch(addMessage(newMessage));
    }
  });
};

export const unsubscribeFromMessages = () => {
  const socket = getSocket();

  if (!socket) return;

  socket.off("newMessage");
};