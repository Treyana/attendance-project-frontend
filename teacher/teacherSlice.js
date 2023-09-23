import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const GET_ALL_TEACHERS ='http://localhost:8585/api/user/all'
const CREATE_TEACHERS = 'http://localhost:8585/api/user/create'
const EDIT_TEACHERS = 'http://localhost:8585/api/user/update'
const DELETE_TEACHERS = 'http://localhost:8585/api/user/delete/'
const UPDATE_PASSWORD_URL = 'http://localhost:8585/api/user/updatePassword'
const UPDATE_STATUS = 'http://localhost:8585/api/user/updateStatus'

export const fetchTeachers = createAsyncThunk('teachers/fetchTeachers',async()=>{
    const response = await axios.get(GET_ALL_TEACHERS)
    return response.data
})

export const createTeachers = createAsyncThunk('teachers/createTeachers',async(data) =>{
    console.log("Data"+data )
    const response = await axios.post(CREATE_TEACHERS,data,{
        'Content-Type':'application/json',
    })
    return response.data
})

export const updateTeachers = createAsyncThunk('teachers/updateTeachers',async (data) =>{
    const response = await axios.patch(EDIT_TEACHERS,data)
    return response.data
})

export const deleteTeacher = createAsyncThunk('teachers/deleteTeacher',async (userId) => {
    const response = await axios.delete(`${DELETE_TEACHERS}${userId}`);
    return response.data
 })

 export const updatePassword = createAsyncThunk('teachers/updatePassword',async(data)=>{
    console.log(data)
   
    const response = await axios.patch(UPDATE_PASSWORD_URL,data.user)
    return response.data
})

export const updateStatus = createAsyncThunk('teachers/updateStatus',async(data)=>{
    console.log(data)
   
    const response = await axios.patch(UPDATE_STATUS,data)
    return response.data
})

const initialState ={
    user:[],
    status:'idle',
    error:null
}

export const teacherSlice = createSlice({
    name:"teachers",
    initialState,
    reducers:{},
    extraReducers(builder){
        builder
            .addCase(fetchTeachers.fulfilled,(state,action) =>{
                console.log("Teacher"+action.payload)
                state.status = "succeeded"
                state.user = action.payload
            })
            .addCase(createTeachers.fulfilled,(state,action)=>{
                state.status = 'succeed'
                state.user.push(Number(action.payload))
            })
            .addCase(updateTeachers.fulfilled,(state,action)=>{
                const teacher = action.payload
                const user = state.user.filter(t => t.id !== teacher.id)
                state.user = [...user,teacher]
            })
            .addCase(deleteTeacher.fulfilled,(state,action) =>{
                const teacher = state.user.filter(t => t.id !== Number(action.payload))
                state.user = teacher
            })

            .addCase(updatePassword.fulfilled,(state,action)=>{
                const teacher = action.payload;
                const user = state.user?.filter((u) => u.id !== teacher.id)
                state.user = [...user,teacher]
            })
    }
    
})

export const getAllTeachers = (state) => state.teachers.user
export const selectTeacherById = (state,teacherId) => state.teachers.user.find(teacher => teacher.id === teacherId)

export const { addTeacher } = teacherSlice.actions
export default teacherSlice.reducer