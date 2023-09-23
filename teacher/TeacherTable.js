import React, { useEffect } from "react";
import TecherList from "./TecherList";
import { useDispatch } from "react-redux";
import { fetchTeachers } from "./teacherSlice";
import classes from "./TeacherForm.module.css";

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import CreateTeacherButton from "./CreateTeacherButton";

const TeacherTable = () => {
  const dispatch = useDispatch();

  const text = `m-0 font-weight-bold text-center ${classes.text}`;

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  $(document).ready(function () {
    setTimeout(function () {
      $("#example").DataTable();
    }, 1000);
  });
  return (
    // <div class="main-panel">
    //   <div class="content-wrapper">
    //     <div className="MainDiv">
    <div
      style={{
        width: "79%",
        padding: "50px",
        background: "whitesmoke",
      }}
    >
      <div class="text-center">
        <h1 className={classes.mainTitle}> Teacher List</h1>
      </div>
      <br />
      <CreateTeacherButton />
      <div className="container">
        <br />
        <br />
        <table
          id="example"
          class="display table table-bordered table-hover table-striped"
        >
          <thead style={{ background: "#040738", color: "#b9fefe" }}>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              {/* <th>Password</th> */}
              <th>Details</th>
              <th>Send Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <TecherList />
          </tbody>
          <tfoot>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              {/* <th>Password</th> */}
              <th>Details</th>
              <th>Send Email</th>
              <th>Actions</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    //   </div>
    // </div>
  );
};

export default TeacherTable;
