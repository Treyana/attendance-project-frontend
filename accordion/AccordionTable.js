import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useEffect } from 'react'


import AccordionList from './AccordionList'
import { fetchAccordions, getAllAccordions } from './accordionSlice'
import { fetchClasses } from '../class/classSlice'
import { fetchSemesters } from '../semester/semesterSlice'


const AccordionTable = () => {

    const dispatch = useDispatch()
  

    useEffect(()=>{
        dispatch(fetchClasses())
        dispatch(fetchSemesters())
        dispatch(fetchAccordions())
    },[dispatch])
    
    return (
      <div >      
  
      <h1 class="m-0  font-weight-bold text-success text-center">Timetable List</h1>
    
     <div class="container mt-5 ms-5">
   <AccordionList/>
   </div>
    
        </div>
  
  
    )
}

export default AccordionTable

