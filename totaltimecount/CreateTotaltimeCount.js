import React, { useEffect } from "react";
import classes from "../teacher/TeacherForm.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createTotaltimeCount } from "./totaltimecountSlice";
import { fetchSubjects, getAllSubjects } from "../subject/subjectSlice";

const CreateTotaltimeCount = () => {
  useEffect(() => {
    dispatch(fetchSubjects());
  }, []);

  const subjects = useSelector(getAllSubjects);
  console.log("Subject" + subjects);
  const [subjectId, setSubjectId] = useState("");
  const [timeCount, setTimeCount] = useState("");
  const [fromDate, setFromdate] = useState("");
  const [toDate, setTodate] = useState("");

  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const onTimeCountChange = (e) => setTimeCount(e.target.value);
  const onFromDateChange = (e) => setFromdate(e.target.value);
  const onToDateChange = (e) => setTodate(e.target.value);
  const onSubjectIdChange = (e) => setSubjectId(e.target.value);

  const canSave =
    [timeCount, fromDate, toDate, subjectId].every(Boolean) &&
    addRequestStatus === "idle";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();

    if (canSave) {
      try {
        setAddRequestStatus("pending");

        dispatch(
          createTotaltimeCount({
            timeCount,
            fromDate,
            toDate,
            subjectId,
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

      navigate("/admin/alltimecount");
    }
  };

  console.log("Reach form");
  return (
    <div class="main-panel">
      <div class="content-wrapper">
        <Link to="/admin/alltimecount">
          <button
            className={classes.color2}
            style={{ float: "right" }}
            type="button"
          >
            <i class="mdi mdi-arrow-left-bold btn-icon-prepend"></i>Back
          </button>
        </Link>

        <form
          className={classes.form}
          onSubmit={onSubmit}
          style={{ marginBottom: "50px" }}
        >
          <p className={classes.title}>Create Total Timecount</p>
          <select
            className={classes.Forminput}
            style={{ marginBottom: "35px" }}
            value={subjectId}
            onChange={onSubjectIdChange}
            required
          >
            <option value="" className="text-center">
              Choose Subject
            </option>

            {subjects.map((s) => (
              <option className="text-center" key={s.id} value={s.id}>
                <span> {s.name} </span>
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Timecount"
            className={classes.Forminput}
            value={timeCount}
            onChange={onTimeCountChange}
            required
          />
          <label className={classes.Formlabel}>Total TimeCount</label>

          <input
            type="date"
            placeholder="FromDate"
            className={classes.Forminput}
            value={fromDate}
            onChange={onFromDateChange}
            required
          />
          <label className={classes.Formlabel}>From Date</label>

          <input
            type="date"
            placeholder="ToDate"
            className={classes.Forminput}
            value={toDate}
            onChange={onToDateChange}
            required
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

export default CreateTotaltimeCount;
