import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const GET_ALL_CLASSES = 'http://localhost:8585/api/class/all'
const CREATE_CLASS = 'http://localhost:8585/api/class/create'
const EDIT_CLASS = 'http://localhost:8585/api/class/update'
const DELETE_CLASS = 'http://localhost:8585/api/class/delete/'

export const fetchClasses = createAsyncThunk('classes/fetchClasses', async () => {
    const response = await axios.get(GET_ALL_CLASSES)
    return response.data
})

export const createClass = createAsyncThunk('classes/createClass', async (data) => {
    console.log("Data" + data)
    const response = await axios.post(CREATE_CLASS, data)
    return response.data
})

export const updateClass = createAsyncThunk('classes/updateClass', async (data) => {
    const response = await axios.patch(EDIT_CLASS, data)
    return response.data
})

export const deleteClass = createAsyncThunk('teachers/deleteTeacher', async (classId) => {
    const response = await axios.delete(`${DELETE_CLASS}${classId}`);
    return response.data
})

const initialState = {
    yearclass: [],
    status: 'idle',
    error: null
}

export const classSlice = createSlice({
    name: "yearclass",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchClasses.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchClasses.fulfilled, (state, action) => {
                console.log("Class" + action.payload)
                state.status = "succeeded"
                state.yearclass = action.payload
            })
            .addCase(createClass.fulfilled, (state, action) => {
                state.status = 'succeed'
                state.yearclass.push(Number(action.payload))
            })
            .addCase(updateClass.fulfilled, (state, action) => {
                const c = action.payload
                const yearclass = state.yearclass.filter(t => t.id !== c.id)
                state.yearclass = [...yearclass, c]
            })
            .addCase(deleteClass.fulfilled, (state, action) => {
                const c = state.yearclass.filter(t => t.id !== Number(action.payload))
                state.yearclass = c
            })

    }

})

export const getAllClasses = (state) => state.yearclass.yearclass
export const selectClassById = (state, classId) => state.yearclass.yearclass.find(c => c.id === classId)


export const { addClass } = classSlice.actions
export default classSlice.reducer