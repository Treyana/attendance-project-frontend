import React from "react";
import { Link } from "react-router-dom";

const UserStudentItem = (props) => {
  return (
    <tr>
      <td>{props.id}</td>
      <td>{props.yearClass?.name}</td>
      <td>{props.fullname}</td>
      <td>{props.rollno}</td>
      {/* <td>{props.username}</td> */}
      <td>
        <Link
          to={`/user/student/${props.id}`}
          style={{ textDecoration: "none" }}
          className="fw-bold text-success"
        >
          View Detail
        </Link>
      </td>
    </tr>
  );
};

export default UserStudentItem;
