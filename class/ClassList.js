import React, { useEffect } from 'react'
import { fetchClasses, getAllClasses } from './classSlice';
import { useDispatch, useSelector } from 'react-redux';
import ClassItem from './ClassItem';

const ClassList = () => {

  const dispatch = useDispatch()
    const yearClasses = useSelector(getAllClasses)
    console.log("year class"+yearClasses)


  
    useEffect(() => {
      dispatch(fetchClasses());
    }, );

    let content;
  
    content = yearClasses.map(
      (c) =>(
        <ClassItem 
        id = { c.id}
        codeNo ={c.codeNo}
        name = { c.name}
       
        />
      )
    );
  
    return content;
  }

export default ClassList