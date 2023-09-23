import { useDispatch } from "react-redux";

import { useEffect } from "react";
import classes from "../teacher/TeacherForm.module.css";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import TotaltimeCountList from "./TotaltimeCountList";
import { Link } from "react-router-dom";
import { fetchTotaltimeCount } from "./totaltimecountSlice";

const TotaltimeCountTable = () => {
  const dispatch = useDispatch();

  const text = `m-0 font-weight-bold text-center ${classes.text}`;

  useEffect(() => {
    dispatch(fetchTotaltimeCount());
  }, [dispatch]);

  $(document).ready(function () {
    setTimeout(function () {
      $("#example").DataTable();
    }, 1000);
  });
  return (
    <div class="main-panel">
      <div class="content-wrapper">
        <div className="MainDiv">
          <div class="text-center">
            <h1 className={classes.mainTitle}> Total Timecount List</h1>
          </div>
          <br />
          <Link to="/admin/create-totaltimecount">
            <button className={classes.color3}>
              <i class="fas fa-plus fa-sm"></i> TotaltimeCount
            </button>
          </Link>
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
                  <th>Subject Name</th>
                  <th>TimeCount</th>
                  <th>FromDate</th>
                  <th>ToDate</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <TotaltimeCountList />
              </tbody>
              <tfoot>
                <tr>
                  <th>ID</th>
                  <th>Subject Name</th>
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
    </div>
  );
};

export default TotaltimeCountTable;
