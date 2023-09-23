import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const GET_ALL_SUBJECTS ='http://localhost:8585/api/subject/all'
const CREATE_SUBJECTS = 'http://localhost:8585/api/subject/create/'
const EDIT_SUBJECTS = 'http://localhost:8585/api/subject/update/'
const DELETE_SUBJECTS = 'http://localhost:8585/api/subject/delete/'

export const fetchSubjects = createAsyncThunk('subjects/fetchSubjects',async()=>{
    const response = await axios.get(GET_ALL_SUBJECTS)
    return response.data
})

export const createSubjects = createAsyncThunk('subjects/createSubjects',async(data) =>{
    console.log("Data"+data )
    const response = await axios.post(`${CREATE_SUBJECTS}${data.userId}/${data.classId}`,data)
    return response.data
})

export const updateSubjects = createAsyncThunk('subjects/updateSubjects',async (data) =>{
    const response = await axios.patch(`${EDIT_SUBJECTS}${data.userId}/${data.classId}`,data)
    return response.data
})

export const deleteSubject = createAsyncThunk('subjects/deleteSubject',async (subjectId) => {
    const response = await axios.delete(`${DELETE_SUBJECTS}${subjectId}`);
    return response.data
 })
const initialState ={
    subjects:[],
    status:'idle',
    error:null
}
export const subjectSlice = createSlice({
    name:"subjects",
    initialState,
    reducers:{},
    extraReducers(builder){
        builder
            .addCase(fetchSubjects.fulfilled,(state,action) =>{
                console.log("Teahcer"+action.payload)
                state.status = "succeeded"
                state.subjects = action.payload
            })
            .addCase(createSubjects.fulfilled,(state,action)=>{
                state.status = 'succeed'
                state.subjects.push(Number(action.payload))
            })
            .addCase(updateSubjects.fulfilled,(state,action)=>{
                const subject = action.payload
                const subjects = state.subjects.filter(t => t.id !== subject.id)
                state.subjects = [...subjects,subject]
            })
            .addCase(deleteSubject.fulfilled,(state,action) =>{
                const subject = state.subjects.filter(s => s.id !== Number(action.payload))
                state.subjects = subject
            })
    }
    
})

export const getAllSubjects = (state) => state.subjects.subjects
export const selectSubjectById = (state,subjectId) => state.subjects.subjects.find(subject => subject.id === subjectId)

export const { addTeacher } = subjectSlice.actions
export default subjectSlice.reducer