import React from "react";
import ClassList from "./ClassList";
import { AddClassButton } from "./AddClassButton";
import { fetchClasses } from "./classSlice";
import classes from "./CreateClassForm.module.css";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const ClassTable = () => {
  const dispatch = useDispatch();

  const text = `m-0 font-weight-bold text-center ${classes.text}`;

  useEffect(() => {
    dispatch(fetchClasses());
  }, [dispatch]);

  $(document).ready(function () {
    setTimeout(function () {
      $("#example").DataTable();
    }, 1000);
  });
  return (
    // <div class="main-panel">
    // <div class="content-wrapper">
    <div
      style={{
        width: "79%",
        padding: "50px",
        background: "whitesmoke",
      }}
    >
      {/* <div class="text-center"> */}
      <center>
        <h1 className={classes.mainTitle}>Class List</h1>
        {/* </div> */}
      </center>
      <br />
      <AddClassButton />
      <br />
      <br />
      <table
        id="example"
        class="display table table-bordered table-hover table-striped"
      >
        <thead style={{ background: "#040738", color: "#b9fefe" }}>
          <tr>
            <th>ID</th>
            <th>CodeNo</th>
            <th>ClassName</th>

            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <ClassList />
        </tbody>
        <tfoot>
          <tr>
            <th>ID</th>
            <th>CodeNo</th>
            <th>ClassName</th>

            <th>Actions</th>
          </tr>
        </tfoot>
      </table>
    </div>
    //  </div>
  );
};

export default ClassTable;
