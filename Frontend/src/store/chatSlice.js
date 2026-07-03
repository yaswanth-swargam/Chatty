import {createSlice} from '@reduxjs/toolkit'

import toast from 'react-hot-toast'
import {axiosInstance} from '../lib/axios.js'

import {useSelector} from 'react-redux'


const initialState={
    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,
}
export const chatSlice=createSlice({
    name: 'chat',
    initialState,

    reducers:{
        setUsers: (state,action)=>{
            state.users=action.payload;
        },
        setMessages: (state,action)=>{
            state.messages=action.payload;
        },
        setUsers: (state,action)=>{
            state.users=action.payload;
        },
        setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },

    setUsersLoading: (state, action) => {
      state.isUsersLoading = action.payload;
    },

    setMessagesLoading: (state, action) => {
      state.isMessagesLoading = action.payload;
    },

    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },

    clearMessages: (state) => {
      state.messages = [];
    },
    }
})

export const { setUsers,
  setMessages,
  setSelectedUser,
  setUsersLoading,
  setMessagesLoading,
  addMessage,
  clearMessages,} = chatSlice.actions;

  export default chatSlice.reducer;