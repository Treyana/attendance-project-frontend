import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import ConfirmModal from "../utility/ConfirmModal";
import { deleteActivity } from "./activitySlice";

const ActivityItem = (props) => {
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  function deleteHandler() {
    setModalOpen(true);
  }

  function cancelHandler() {
    setModalOpen(false);
  }

  function confirmHandler() {
    dispatch(deleteActivity(props.id)).unwrap();
    setModalOpen(false);
  }

  return (
    <tr>
      <td>{props.id}</td>

      <td>{props.timeCount}</td>
      <td>{props.fromDate}</td>
      <td>{props.toDate}</td>

      <td>
        <Link to={`/admin/activity/update/${props.id}`}>
          <i class="far fa-edit fa-lg" style={{ color: "#040738" }}></i>
        </Link>
        {/* &nbsp;&nbsp;
        <Link type="button" onClick={deleteHandler}>
          {" "}
          <i class="ms-3 fas fa-trash fa-lg" style={{ color: "#040738" }}></i>
        </Link> */}
      </td>

      {isModalOpen && (
        <ConfirmModal onCancel={cancelHandler} onConfirm={confirmHandler} />
      )}
    </tr>
  );
};

export default ActivityItem;
