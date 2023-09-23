import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const GET_ALL_ACTIVITY ='http://localhost:8585/api/activity/all'
const CREATE_ACTIVITY = 'http://localhost:8585/api/activity/create'
const EDIT_ACTIVITY = 'http://localhost:8585/api/activity/update'
const DELETE_ACTIVITY = 'http://localhost:8585/api/activity/delete/'

export const createActivity = createAsyncThunk('activities/createActivity',async(data) =>{
  
    const response = await axios.post( CREATE_ACTIVITY,data)
    return response.data
})

export const fetchActivity = createAsyncThunk('activities/fetchActivity',async()=>{
    const response = await axios.get(GET_ALL_ACTIVITY)
    return response.data
})

export const updateActivity = createAsyncThunk('activities/updateActivity',async (data) =>{
    const response = await axios.patch(EDIT_ACTIVITY ,data)
    return response.data
})

export const deleteActivity = createAsyncThunk('activities/deleteActivity',async (activityId) => {
    const response = await axios.delete(`${DELETE_ACTIVITY}${activityId}`);
    return response.data
 })


const initialState ={
    activities:[],
    status:'idle',
    error:null
}

export const activitySlice = createSlice({
    name:"activities",
    initialState,
    reducers:{},
    extraReducers(builder){
        builder
            .addCase(fetchActivity.fulfilled,(state,action) =>{
                console.log("timecount"+action.payload)
                state.status = "succeeded"
                state.activities = action.payload
            })
            .addCase(createActivity.fulfilled,(state,action)=>{
                state.status = 'succeeded'
                console.log(action.payload);
                state.activities.push(Number(action.payload))
            })
            
            .addCase(updateActivity.fulfilled,(state,action)=>{
                const activity = action.payload
                const activities = state.activities.filter(t => t.id !== activity.id)
                state.activities = [...activities,activity]
            })
            .addCase(deleteActivity.fulfilled,(state,action) =>{
                const activity = state.activities.filter(t => t.id !== Number(action.payload))
                state.activities = activity
            })
    }
    
})


export const getAllActivity = (state) => state.activities?.activities
export const selectActivityById = (state,activityId) => state.activities.activities.find(activity => activity.id === activityId)

export const { addActivity } = activitySlice.actions
export default activitySlice.reducer

