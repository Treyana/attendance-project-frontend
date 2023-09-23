import React, { useEffect } from 'react'
import { fetchClasses, selectClassById } from '../class/classSlice';
import { fetchTimeTables } from './TimeTableSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectSubjectById } from '../subject/subjectSlice';

const UserTimeTableItem = (props) => {
    const dispatch = useDispatch()
    const YearClass = useSelector((state)=>selectClassById(state,Number(props.className)));
    const Subject = useSelector((state)=>selectSubjectById(state,Number(props.subjectName)));
    
    useEffect(() => {
        dispatch(fetchClasses());
        dispatch(fetchTimeTables());
        
      }, [dispatch]);
  return (
    
    <tr>
    <td>{props.id}</td>
    <td>{props.semester?.name}</td>
    <td>{YearClass?.name}</td>
    <td>{Subject?.name}</td>
    <td>{props.classDay}</td>
    <td>{props.classTime}</td>
    
   </tr>
  )
}

export default UserTimeTableItem