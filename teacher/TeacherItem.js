import React from "react";
import { Link } from "react-router-dom";
import ConfirmModal from "../utility/ConfirmModal";
import { deleteTeacher, updateStatus, updateTeachers } from "./teacherSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import classes from "../teacher/TeacherForm.module.css";

const TeacherItem = (props) => {
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);

  function deleteHandler() {
    setModalOpen(true);
  }

  function cancelHandler() {
    setModalOpen(false);
  }

  function confirmHandler() {
    dispatch(deleteTeacher(props.id)).unwrap();
    setModalOpen(false);
  }
  console.log(props);
  console.log("Status" + props.status);

  const funDisabled = () => {
    if (props.status === "Sent") {
      return true;
    } else if (props.status === "Pending") {
      return false;
    }
  };

  function insertConfirmHandler() {
    //   updateTeachers({
    //     id:props.id,
    //     fullname:props.fullname,
    //     password:props.password,
    //     phno:props.phno,
    //     username:props.username,
    //     position:props.position,
    //     nrc:props.nrc,
    //     gender:props.gender,
    //     status:props.status
    // })

    dispatch(
      updateStatus({
        id: props.id,
        fullname: props.fullname,
        password: props.password,
        phno: props.phno,
        username: props.username,
        position: props.position,
        nrc: props.nrc,
        gender: props.gender,
        status: props.status,
      })
    );
  }

  return (
    <tr>
      <td>{props.id}</td>
      <td>{props.fullname}</td>
      <td>{props.username}</td>
      {/* <td>{props.password}</td> */}
      <td>
        <Link
          to={`/admin/teacher/${props.id}`}
          style={{ textDecoration: "none", color: "#040738" }}
          className="fw-bold"
        >
          View Detail
        </Link>
      </td>
      <td>
        <Link to={`/admin/email/${props.id}`}>
          <button
            onClick={insertConfirmHandler}
            disabled={funDisabled()}
            class="mdi mdi-gmail fa-lg"
          ></button>
          {/*  */}
        </Link>
      </td>

      <td>
        <Link to={`/admin/teacher/update/${props.id}`}>
          <i class="far fa-edit fa-lg" style={{ color: "#040738" }}></i>
        </Link>
        &nbsp;&nbsp;
        <Link type="button" onClick={deleteHandler}>
          <i class="ms-3 fas fa-trash fa-lg" style={{ color: "#040738" }}></i>
        </Link>
      </td>

      {isModalOpen && (
        <ConfirmModal onCancel={cancelHandler} onConfirm={confirmHandler} />
      )}
    </tr>
  );
};

export default TeacherItem;
