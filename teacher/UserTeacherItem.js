import React from 'react'
import { Link } from 'react-router-dom'

const UserTeacherItem = (props) => {
  return (
    <tr>
    <td>{props.id}</td>
    <td>{props.fullname}</td>
    <td>{props.username}</td>
    <td><Link to={`/user/teacher/${props.id}`} style={{textDecoration : 'none'}} className="fw-bold text-success">View Detail</Link></td>

   </tr>
  )
}

export default UserTeacherItem