import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteStudent } from './studentSlice'
import ConfirmModal from '../utility/ConfirmModal'
import { Link } from 'react-router-dom'

const StudentItem = (props) => {
    const dispatch = useDispatch()
    const [isModalOpen, setModalOpen] = useState(false)

    function deleteHandler() {
        setModalOpen(true);
    }
    
    function cancelHandler() {
        setModalOpen(false);
    }
    
    function confirmHandler() {
        dispatch(deleteStudent(props.id)).unwrap()
        setModalOpen(false)
    }
    
  return (
    <tr>
    <td>{props.id}</td>
    <td>{props.yearClass?.name}</td>
    <td>{props.fullname}</td>
    <td>{props.rollno}</td>
    <td>{props.username}</td>
    {/* <td>{props.phno}</td>
    <td>{props.address}</td> */}
    
    {/* <td>{props.fathername}</td> */}
    {/* <td>{props.nrc}</td>
    <td>{props.dob}</td>
    <td>{props.gender}</td> */}
    <td><Link to={`/admin/student/${props.id}`} style={{textDecoration : 'none'}} className="fw-bold text-success">View Detail</Link></td>
    <td><Link to={`/admin/student/update/${props.id}`}  ><i class="far fa-edit fa-lg" style={{color:"green"}}></i></Link>&nbsp;&nbsp;
     <Link  type='button' onClick={deleteHandler} ><i class="ms-3 fas fa-trash fa-lg" style={{color:"green"}}></i></Link></td>
    
    {isModalOpen && <ConfirmModal onCancel={cancelHandler} onConfirm={confirmHandler} />}
    </tr>

    
  )
}

export default StudentItem