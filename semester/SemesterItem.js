import { useState } from "react";
import { Link } from "react-router-dom";
import ConfirmModal from "../utility/ConfirmModal";
import { useDispatch } from "react-redux";
import { deleteSemester } from "./semesterSlice";

const SemesterItem = (props) => {
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  function deleteHandler() {
    setModalOpen(true);
  }

  function cancelHandler() {
    setModalOpen(false);
  }

  function confirmHandler() {
    dispatch(deleteSemester(props.id)).unwrap();
    setModalOpen(false);
  }

  return (
    <tr>
      <td>{props.id}</td>
      <td>{props.name}</td>
      <td>{props.startDate}</td>
      <td>{props.endDate}</td>
      <td>
        <Link to={`/admin/semester/update/${props.id}`}>
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

export default SemesterItem;
