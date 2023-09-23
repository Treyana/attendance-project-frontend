import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const POST_NEW_EMAIL = 'http://localhost:8585/api/email/contact'

export const sendEmail = createAsyncThunk('emails/sendEmail',async(data)=>{
    console.log(data)
    console.log(data.email)
    console.log(data.token)
    try{
        const response = await axios.post(POST_NEW_EMAIL,data.email,{
            headers: {
                Authorization: data.token,
            },
        });
        
        return response.email;
    }catch(error){
        console.error("You Have Error")
    }

   
})

const initialState = {
    email:{},
    status:'idle',
    error :null
}

export const emailSlice = createSlice({
    name : 'emails',
    initialState,
    reducers:{},

    extraReducers(builder){
        builder
        .addCase(sendEmail.fulfilled,(state,action) => {
            state.status = "succeeded"
            console.log("in the successful")
            state.email = action.payload
            console.log("Action"+action.payload)
        })
    }
    
})


export default emailSlice.reducer