import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const GET_ALL_TIMECOUNT ='http://localhost:8585/api/totaltimecount/all'
const CREATE_TIMECOUNT = 'http://localhost:8585/api/totaltimecount/create/'
const EDIT_TIMECOUNT = 'http://localhost:8585/api/totaltimecount/update/'
const DELETE_TIMECOUNT = 'http://localhost:8585/api/totaltimecount/delete/'

export const createTotaltimeCount = createAsyncThunk('totaltimecount/createTotaltimeCount',async(data) =>{
  
    const response = await axios.post(`${CREATE_TIMECOUNT}${data.subjectId}`,data)
    return response.data
})

export const fetchTotaltimeCount = createAsyncThunk('totaltimecount/fetchTotaltimeCount',async()=>{
    const response = await axios.get(GET_ALL_TIMECOUNT)
    return response.data
})

export const updateTotaltimeCount = createAsyncThunk('totaltimecount/updateTotaltimeCount',async (data) =>{
    const response = await axios.patch(`${EDIT_TIMECOUNT}${data.subjectId}`,data)
    return response.data
})

export const deleteTotaltimeCount = createAsyncThunk('totaltimecount/deleteTotaltimeCount',async (totaltimecountId) => {
    const response = await axios.delete(`${DELETE_TIMECOUNT}${totaltimecountId}`);
    return response.data
 })


const initialState ={
    totaltimecount:[],
    status:'idle',
    error:null
}

export const totaltimecountSlice = createSlice({
    name:"totaltimecount",
    initialState,
    reducers:{},
    extraReducers(builder){
        builder
            .addCase(fetchTotaltimeCount.fulfilled,(state,action) =>{
                console.log("timecount"+action.payload)
                state.status = "succeeded"
                state.totaltimecount = action.payload
            })
            .addCase(createTotaltimeCount.fulfilled,(state,action)=>{
                state.status = 'succeeded'
                console.log(action.payload);
                state.totaltimecount.push(Number(action.payload))
            })
            
            .addCase(updateTotaltimeCount.fulfilled,(state,action)=>{
                const timecount = action.payload
                const totaltimecount = state.totaltimecount.filter(t => t.id !== timecount.id)
                state.totaltimecount = [...totaltimecount,timecount]
            })
            .addCase(deleteTotaltimeCount.fulfilled,(state,action) =>{
                const timecount = state.totaltimecount.filter(t => t.id !== Number(action.payload))
                state.totaltimecount = timecount
            })
    }
    
})


export const getAllTotaltimecount = (state) => state.totaltimecount.totaltimecount
export const selectTotaltimecountById = (state,totaltimecountId) => state.totaltimecount.totaltimecount.find(timecount => timecount.id === totaltimecountId)

export const { addTotaltimecount } = totaltimecountSlice.actions
export default totaltimecountSlice.reducer

