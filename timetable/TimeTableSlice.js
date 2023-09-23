import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const GET_ALL_TIMETABLE ='http://localhost:8585/api/timetable/all'
const CREATE_TIMETABLE = 'http://localhost:8585/api/timetable/create/'
const EDIT_TIMETABLE = 'http://localhost:8585/api/timetable/update/'
const DELETE_TIMETABLE = 'http://localhost:8585/api/timetable/delete/'

export const fetchTimeTables = createAsyncThunk('timetable/fetchTimetable',async()=>{
    const response = await axios.get(GET_ALL_TIMETABLE)
    return response.data
})

export const createTimeTable = createAsyncThunk('timetable/createTimeTable',async(data) =>{
    console.log("Data"+data )
    console.log("semesterid : "+data.SEMESTER_ID)
    const response = await axios.post(`${CREATE_TIMETABLE}${data.SEMESTER_ID}`,data)
    return response.data
})

export const updateTimeTable = createAsyncThunk('timetable/updateTimeTable',async (data) =>{
    console.log("Data"+data )
    console.log("semesterid : "+data.SEMESTER_ID)
    const response = await axios.patch(`${EDIT_TIMETABLE}${data.SEMESTER_ID}`,data)
    return response.data
})

export const deleteTimeTable = createAsyncThunk('timetable/deleteTimeTable',async (timetableId) => {
    const response = await axios.delete(`${DELETE_TIMETABLE}${timetableId}`);
    return response.data
 })
const initialState ={
    timetables:[],
    status:'idle',
    error:null
}
export const timetableSlice = createSlice({
    name:"timetables",
    initialState,
    reducers:{},
    extraReducers(builder){
        builder
            .addCase(fetchTimeTables.fulfilled,(state,action) =>{
                console.log("TimeTable"+action.payload)
                state.status = "succeeded"
                state.timetables = action.payload
            })
            .addCase(createTimeTable.fulfilled,(state,action)=>{
                state.status = 'succeed'
                state.timetables.push(Number(action.payload))
            })
            .addCase(updateTimeTable.fulfilled,(state,action)=>{
                const timetable = action.payload
                const timetables = state.timetables.filter(t => t.id !== timetable.id)
                state.timetables = [...timetables,timetable]
            })
            .addCase(deleteTimeTable.fulfilled,(state,action) =>{
                const timetable = state.timetables.filter(s => s.id !== Number(action.payload))
                state.timetables = timetable
            })
    }
    
})

export const getAllTimeTables = (state) => state.timetables.timetables
export const selectTimeTableById = (state,timetableId) => state.timetables.timetables.find(timetable => timetable.id === timetableId)

export const { addTeacher } = timetableSlice.actions
export default timetableSlice.reducer