import {createSlice} from '@reduxjs/toolkit'

const initialState={theme: localStorage.getItem('app-theme') || 'dark'}

const themeSlice=createSlice({
    name: 'theme',
    initialState,
    reducers: {
        getTheme: (state,action)=>{
            return localStorage.getItem('app-theme')
        },
        setTheme: (state,action)=>{
            state.theme=action.payload;
            localStorage.setItem('app-theme',action.payload)
        }
    }
})

export  const {setTheme}=themeSlice.actions;
export default themeSlice.reducer;