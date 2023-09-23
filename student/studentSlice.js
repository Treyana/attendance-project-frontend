import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const GET_ALL_STUDENTS ='http://localhost:8585/api/student/all'
const CREATE_STUDENTS = 'http://localhost:8585/api/student/create/'
const EDIT_STUDENTS = 'http://localhost:8585/api/student/update/'
const DELETE_STUDENTS = 'http://localhost:8585/api/student/delete/'

export const fetchStudents = createAsyncThunk('students/fetchStudents',async()=>{
    const response = await axios.get(GET_ALL_STUDENTS)
    return response.data
})

export const createStudents = createAsyncThunk('students/createStudents',async(data) =>{
    console.log("Data"+data )
    console.log("ClassId"+data.classId)
    const response = await axios.post(`${CREATE_STUDENTS}${data.classId}`,data)
    return response.data
})

export const updateStudents = createAsyncThunk('students/updateStudents',async (data) =>{
    const response = await axios.patch(`${EDIT_STUDENTS}${data.classId}`,data)
    return response.data
})

export const deleteStudent = createAsyncThunk('students/deleteStudents',async (studentId) => {
    const response = await axios.delete(`${DELETE_STUDENTS}${studentId}`);
    return response.data
 })
const initialState ={
    students:[],
    status:'idle',
    error:null
}

export const studentSlice = createSlice({
    name:"students",
    initialState,
    reducers:{},
    extraReducers(builder){
        builder
            .addCase(fetchStudents.fulfilled,(state,action) =>{
                console.log("Student"+action.payload)
                state.status = "succeeded"
                state.students = action.payload
            })
            .addCase(createStudents.fulfilled,(state,action)=>{
                state.status = 'succeed'
                state.students.push(Number(action.payload))
            })
            .addCase(updateStudents.fulfilled,(state,action)=>{
                const student = action.payload
                const students = state.students.filter(t => t.id !== student.id)
                state.students = [...students,student]
            })
            .addCase(deleteStudent.fulfilled,(state,action) =>{
                const student = state.students.filter(s => s.id !== Number(action.payload))
                state.students = student
            })
    }
    
})

export const getAllStudents = (state) => state.students.students
export const selectStudentById = (state,studentId) => state.students.students.find(student => student.id === studentId)

 export const { addStudent } = studentSlice.actions

export default studentSlice.reducer