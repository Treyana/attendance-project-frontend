import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const GET_ALL_ACCORDIONS ='http://localhost:8585/api/accordion/all'
const CREATE_ACCORDION = 'http://localhost:8585/api/accordion/create/'
const EDIT_ACCORDION = 'http://localhost:8585/api/accordion/update/'
const DELETE_ACCORDION  = 'http://localhost:8585/api/accordion/delete/'

export const fetchAccordions = createAsyncThunk('accordions/fetchAccordions',async()=>{
    const response = await axios.get(GET_ALL_ACCORDIONS)
    return response.data
})

export const createAccordion = createAsyncThunk('accordions/createAccordion',async(data) =>{
    console.log("SemesterId :"+ data.semesterId)
    console.log("Data"+data )
    const response = await axios.post(`${CREATE_ACCORDION}${data.classId}/${data.semesterId}`,data)
    return response.data
})

export const updateAccordion= createAsyncThunk('accordions/updateAccordion',async (data) =>{
    const response = await axios.patch(`${EDIT_ACCORDION}${data.classId}/${data.semesterId}`,data)
    return response.data
})

export const deleteAccordion = createAsyncThunk('accordions/deleteAccordion',async (classId) => {
    const response = await axios.delete(`${DELETE_ACCORDION}${classId}`);
    return response.data
 })

const initialState ={
    accordions:[],

    status:'idle',
    error:null
}

export const accordionSlice = createSlice({
    name:"accordions",
    initialState,
    reducers:{
       
    },
    extraReducers(builder){
        builder
            .addCase(fetchAccordions.fulfilled,(state,action) =>{
                console.log("Accordion"+action.payload)
                state.status = "succeeded"
                state.accordions = action.payload
            })
            .addCase(createAccordion.fulfilled,(state,action)=>{
                state.status = 'succeed'
                state.accordions.push(Number(action.payload))
            })
            .addCase(updateAccordion.fulfilled,(state,action)=>{
                const accordion = action.payload
                const accordions = state.accordions.filter(t => t.id !== accordion.id)
                state.accordions = [...accordions,accordion]
            })
            .addCase(deleteAccordion.fulfilled,(state,action) =>{
                const accordion = state.accordions.filter(t => t.id !== Number(action.payload))
                state.accordions = accordion
            })
           
    }
    
})

export const getAllAccordions = (state) => state.accordions.accordions

export const selectAccordionById = (state,accordionId) => state.accordions.accordions.find(a => a.id === accordionId)
export const selectAccordionClassById = (state,classId) => state.accordions.accordions.find(accordion => accordion.yearClass.id === classId)
export const selectAccordionSemesterById = (state,semesterId) => state.accordions.accordions.find(accordion => accordion.semester.id === semesterId)


export const { addAccordion,addFilteredTimetable } = accordionSlice.actions
export default accordionSlice.reducer