import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ConfirmModal from "../utility/ConfirmModal";
import { deleteSubject } from "./subjectSlice";

const SubjectItem = (props) => {
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);

  function deleteHandler() {
    setModalOpen(true);
  }

  function cancelHandler() {
    setModalOpen(false);
  }

  function confirmHandler() {
    dispatch(deleteSubject(props.id)).unwrap();
    setModalOpen(false);
  }
  return (
    <tr>
      <td>{props.id}</td>

      <td>{props.codeno}</td>
      <td>{props.name}</td>
      <td>{props.yearClass?.name}</td>
      <td>{props.user?.fullname}</td>

      <td>
        <Link to={`/admin/subject/update/${props.id}`}>
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

export default SubjectItem;
