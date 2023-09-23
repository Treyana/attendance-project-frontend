import React, { useEffect } from "react";
import classes from "../teacher/TeacherForm.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { createActivity } from "./activitySlice";

const CreateActivity = () => {
  const [timeCount, setTimeCount] = useState("");
  const [fromDate, setFromdate] = useState("");
  const [toDate, setTodate] = useState("");

  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const onTimeCountChange = (e) => setTimeCount(e.target.value);
  const onFromDateChange = (e) => setFromdate(e.target.value);
  const onToDateChange = (e) => setTodate(e.target.value);

  const canSave =
    [timeCount, fromDate, toDate].every(Boolean) && addRequestStatus === "idle";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();

    if (canSave) {
      try {
        setAddRequestStatus("pending");

        dispatch(
          createActivity({
            timeCount,
            fromDate,
            toDate,
          })
        );
      } catch (error) {
        console.log(error);
      } finally {
        setAddRequestStatus("idle");
      }

      setTimeCount("");
      setFromdate("");
      setTodate("");

      navigate("/admin/activity");
    }
  };

  console.log("Reach form");
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
        <div>
          <Link to="/admin/activity">
            <button
              className={classes.color2}
              style={{ float: "right" }}
              type="button"
            >
              <i class="mdi mdi-arrow-left-bold btn-icon-prepend"></i>Back
            </button>
          </Link>
        </div>
        <form className={classes.form} onSubmit={onSubmit}>
          <p className={classes.title}>Create Activity</p>

          {/* <label>
          <input
            type="text"
            className={classes.input}
            value={timeCount}
            onChange={onTimeCountChange}
          />
          <span>TotaltimeCount</span>
        </label>

        <label>
          <input
            type="date"
            className={classes.input}
            value={fromDate}
            onChange={onFromDateChange}
          />
          <span>From Date</span>
        </label>

        <label>
          <input
            type="date"
            className={classes.input}
            value={toDate}
            onChange={onToDateChange}
          />
          <span>To Date</span>
        </label> */}

          <input
            type="text"
            placeholder="Timecount"
            className={classes.Forminput}
            value={timeCount}
            onChange={onTimeCountChange}
          />
          <label className={classes.Formlabel}>Timecount</label>

          <input
            type="date"
            placeholder="From Date"
            className={classes.Forminput}
            value={fromDate}
            onChange={onFromDateChange}
          />
          <label className={classes.Formlabel}>From Date</label>

          <input
            type="date"
            placeholder="To Date"
            className={classes.Forminput}
            value={toDate}
            onChange={onToDateChange}
          />
          <label className={classes.Formlabel}>To Date</label>

          <center>
            <button className={classes.send}>
              <i class="mdi mdi-file-check btn-icon-prepend"></i> Create
            </button>
          </center>
        </form>
      </div>
    </div>
  );
};

export default CreateActivity;
