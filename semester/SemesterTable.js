import { useDispatch } from "react-redux";
import { fetchSemesters } from "./semesterSlice";
import SemesterList from "./SemesterList";
import { useEffect } from "react";
import classes from "../teacher/TeacherForm.module.css";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import CreateSemesterButton from "./CreateSemesterButton";

const SemesterTable = () => {
  const dispatch = useDispatch();

  const text = `m-0 font-weight-bold text-center ${classes.text}`;

  useEffect(() => {
    dispatch(fetchSemesters());
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
        <h1 className={classes.mainTitle}> Semester List</h1>
      </div>
      <br />
      <CreateSemesterButton />
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
              <th>startDate</th>
              <th>endDate</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <SemesterList />
          </tbody>
          <tfoot>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>startDate</th>
              <th>endDate</th>
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

export default SemesterTable;
