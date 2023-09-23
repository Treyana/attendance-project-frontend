import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import ConfirmModal from '../utility/ConfirmModal'
import { deleteTimeTable, fetchTimeTables } from './TimeTableSlice'
import { fetchClasses, selectClassById } from '../class/classSlice'
import { useSelector } from "react-redux";
import { selectSubjectById } from '../subject/subjectSlice'
import { useEffect } from 'react'

const TimeTableItem = (props) => {
  const dispatch = useDispatch()
  const YearClass = useSelector((state)=>selectClassById(state,Number(props.className)));
  const Subject = useSelector((state)=>selectSubjectById(state,Number(props.subjectName)));
 
  const [isModalOpen, setModalOpen] = useState(false)

  function deleteHandler() {
    setModalOpen(true);
}
useEffect(() => {
  dispatch(fetchClasses());
  dispatch(fetchTimeTables());
  
}, [dispatch]);
function cancelHandler() {
    setModalOpen(false);
}

function confirmHandler() {
    dispatch(deleteTimeTable(props.id)).unwrap()
    setModalOpen(false)
}
  return (
    <tr>
    <td>{props.id}</td>
    <td>{props.semester?.name}</td>
    <td>{YearClass?.name}</td>
    <td>{Subject?.name}</td>
    <td>{props.classDay}</td>
    <td>{props.classTime}</td>
    <td><Link to={`/admin/timetable/update/${props.id}`}  ><i class="far fa-edit fa-lg" style={{color:"green"}}></i></Link>&nbsp;&nbsp;
            <Link  type='button' onClick={deleteHandler} ><i class="ms-3 fas fa-trash fa-lg" style={{color:"green"}}></i></Link> 
      </td> 

      {isModalOpen && <ConfirmModal onCancel={cancelHandler} onConfirm={confirmHandler} />} 
    
   </tr>
  )
}

export default TimeTableItem