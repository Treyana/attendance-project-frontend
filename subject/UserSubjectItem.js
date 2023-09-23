import React from 'react'


const UserSubjectItem = (props) => {
   
    return (
      <tr>
      <td>{props.id}</td>
      <td>{props.user?.fullname}</td>
      <td>{props.yearClass?.name}</td>
      <td>{props.semester?.name}</td>
      <td>{props.codeno}</td>
      <td>{props.name}</td> 
     </tr>
    )
}

export default UserSubjectItem