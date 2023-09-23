import { useDispatch } from "react-redux";

import { useEffect } from "react";
import classes from "../teacher/TeacherForm.module.css";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

import { Link } from "react-router-dom";

import { fetchActivity } from "./activitySlice";
import ActivityList from "./ActivityList";
import { AddActivityButton } from "./AddActivityButton";

const ActivityTable = () => {
  const dispatch = useDispatch();

  const text = `m-0 font-weight-bold text-center ${classes.text}`;

  useEffect(() => {
    dispatch(fetchActivity());
  }, [dispatch]);

  $(document).ready(function () {
    setTimeout(function () {
      $("#example").DataTable();
    }, 1000);
  });
  return (
    // <div
    //   style={{
    //     width: "79%",
    //     padding: "50px",
    //     background: "whitesmoke",
    //   }}
    // >

    <div class="main-panel">
      <div class="content-wrapper">
        <center>
          <h1 className={classes.mainTitle}>Activity TimeCount</h1>
          {/* </div> */}
        </center>
        <br />
        <AddActivityButton />
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
                <th>TimeCount</th>
                <th>FromDate</th>
                <th>ToDate</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <ActivityList />
            </tbody>
            <tfoot>
              <tr>
                <th>ID</th>

                <th>TimeCount</th>
                <th>FromDate</th>
                <th>ToDate</th>
                <th>Actions</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ActivityTable;
