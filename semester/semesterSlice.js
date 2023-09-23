import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const GET_ALL_SEMESTERS ='http://localhost:8585/api/semester/all'
const CREATE_SEMESTER = 'http://localhost:8585/api/semester/create'
const EDIT_SEMESTER = 'http://localhost:8585/api/semester/update'
const DELETE_SEMESTER = 'http://localhost:8585/api/semester/delete/'

export const createSemester = createAsyncThunk('semesters/createSemester',async(data) =>{
    console.log("Data"+JSON.stringify(data));
    const response = await axios.post(CREATE_SEMESTER,data)
    return response.data
})

export const fetchSemesters = createAsyncThunk('semesters/fetchSemesters',async()=>{
    const response = await axios.get(GET_ALL_SEMESTERS)
    return response.data
})

export const updateSemester = createAsyncThunk('semesters/updateSemester',async (data) =>{
    const response = await axios.patch(EDIT_SEMESTER,data)
    return response.data
})

export const deleteSemester = createAsyncThunk('semesters/deleteSemester',async (semesterId) => {
    const response = await axios.delete(`${DELETE_SEMESTER}${semesterId}`);
    return response.data
 })


const initialState ={
    semesters:[],
    status:'idle',
    error:null
}

export const semesterSlice = createSlice({
    name:"semesters",
    initialState,
    reducers:{},
    extraReducers(builder){
        builder
            .addCase(fetchSemesters.fulfilled,(state,action) =>{
                console.log("semester"+action.payload)
                state.status = "succeeded"
                state.semesters = action.payload
            })
            .addCase(createSemester.fulfilled,(state,action)=>{
                state.status = 'succeeded'
                console.log(action.payload);
                state.semesters.push(Number(action.payload))
            })
            
            .addCase(updateSemester.fulfilled,(state,action)=>{
                const semester = action.payload
                const semesters = state.semesters.filter(t => t.id !== semester.id)
                state.semesters = [...semesters,semester]
            })
            .addCase(deleteSemester.fulfilled,(state,action) =>{
                const semester = state.semesters.filter(t => t.id !== Number(action.payload))
                state.semesters = semester
            })
    }
    
})


export const getAllSemesters = (state) => state.semesters.semesters
export const selectSemesterById = (state,semesterId) => state.semesters.semesters.find(semester => semester.id === semesterId)

export const { addSemester } = semesterSlice.actions
export default semesterSlice.reducer

