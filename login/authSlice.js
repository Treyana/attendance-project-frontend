import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const LOGIN_URL = 'http://localhost:8585/api/user/login'

export const login = createAsyncThunk('auths/login',async (loginRequest) => {
    console.log(loginRequest)

        const response = await axios.post(LOGIN_URL,loginRequest)
        return response.data
 
})

const initialState = {
    user:[],
    roles:[],
    token:'',
    loginStatus:'idle'
}

const authSlice = createSlice({
    name : 'authSlice',
    initialState,
    reducers : {
        logout : (state) => {
            state.user = {}
            state.roles = []
            state.loginStatus = 'idle'
            state.token = ''
            localStorage.clear()
        },
        setToken : (state) => {
            const token = localStorage.getItem('token')
            if(token){
                state.token = token
            }else{
                state.token = ''
            }
        }
    },
    extraReducers(builder){
        builder
            .addCase(login.fulfilled,(state,action)=>{
                console.log(action.payload)
                if(action.payload?.token){
                    state.user = action.payload.user
                    state.roles = action.payload.roleList
                    state.loginStatus = Boolean(action.payload.success) ? 'success' : 'failed'
                    state.token = action.payload.token
                    localStorage.setItem('token',action.payload.token)
               
                }else{
                    console.log('login fail!')
                    state.loginStatus = 'failed'
                }
            })
    }
})

export const getUser = state => state.auths.user
export const getRoles = state => state.auths.roles

export const getLoginStatus = state => state.auths.loginStatus
//export const getUserMarkByFullname = (state,markId) => state.auths.user.find(user => user.mark.id === markId)

export const getSuccess = state => state.auths.success
export const getToken = state => state.auths.token
export const isAuth = state => String(state.auths.token).length !== 0
export const { logout,setToken } = authSlice.actions
export default authSlice.reducer