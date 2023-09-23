import { useDispatch } from "react-redux";
import ConfirmModal from "../utility/ConfirmModal";
import { Link } from "react-router-dom";
import { useState } from "react";
import { deleteClass } from "./classSlice";

const ClassItem = (props) => {
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);

  function deleteHandler() {
    setModalOpen(true);
  }

  function cancelHandler() {
    setModalOpen(false);
  }

  function confirmHandler() {
    dispatch(deleteClass(props.id)).unwrap();
    setModalOpen(false);
  }

  return (
    <tr>
      <td>{props.id}</td>
      <td>{props.codeNo}</td>
      <td>{props.name}</td>

      <td>
        <Link to={`/admin/class/update/${props.id}`}>
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

export default ClassItem;
