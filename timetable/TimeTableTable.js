import React, { useEffect } from "react";
import classes from "../teacher/TeacherForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchTimeTables } from "../timetable/TimeTableSlice";
import CreateTimeTableButton from "./CreateTimeTableButton";
import TimeTableList from "./TimeTableList";

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import { getRoles } from "../login/authSlice";

const TimeTableTable = () => {
  const dispatch = useDispatch();

  const getRole = useSelector(getRoles);

  const text = `m-0 font-weight-bold text-center ${classes.text}`;
  useEffect(() => {
    dispatch(fetchTimeTables());
  }, [dispatch]);

  $(document).ready(function () {
    setTimeout(function () {
      $("#example").DataTable();
    }, 1000);
  });
  return (
    <div class="main-panel">
      {getRole == "ROLE_ADMIN" ? (
        <div class="content-wrapper">
          <div className="MainDiv">
            <div class="text-center">
              <h1 className={classes.mainTitle}> TimeTable List</h1>
            </div>
            <br />
            <CreateTimeTableButton />
            <br />
            <div className="container" class="margintop">
              <table id="example" class="display table  table-hover">
                <thead className="bg-success">
                  <tr>
                    <th>ID</th>
                    <th>Semester</th>
                    <th>Class</th>
                    <th>Subject</th>
                    <th>ClassDay</th>
                    <th>ClassTime</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <TimeTableList />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div class="content-wrapper">
          <div className="MainDiv">
            <div class="text-center">
              <h1 className={text}> TimeTable List</h1>
            </div>
            <br />
            <br />
            <div className="container" class="margintop">
              <table id="example" class="display table  table-hover">
                <thead className="bg-success">
                  <tr>
                    <th>ID</th>
                    <th>Semester</th>
                    <th>Class</th>
                    <th>Subject</th>
                    <th>ClassDay</th>
                    <th>ClassTime</th>
                  </tr>
                </thead>
                <tbody>
                  <TimeTableList />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeTableTable;
