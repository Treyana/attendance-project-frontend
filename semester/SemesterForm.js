import React from "react";
import classes from "../teacher/TeacherForm.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createSemester } from "./semesterSlice";

const SemesterForm = () => {
  const [name, setName] = useState("");
  const [startdate, setStartDate] = useState("");
  const [enddate, setEndDate] = useState("");

  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const onNameChange = (e) => setName(e.target.value);
  const onStartDateChange = (e) => setStartDate(e.target.value);
  const onEndDateChange = (e) => setEndDate(e.target.value);

  const canSave =
    [name, startdate, enddate].every(Boolean) && addRequestStatus === "idle";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();

    if (canSave) {
      try {
        setAddRequestStatus("pending");

        dispatch(
          createSemester({
            name,
            startdate,
            enddate,
          })
        );
        console.log("starDate");
      } catch (error) {
        console.log(error);
      } finally {
        setAddRequestStatus("idle");
      }

      setName("");
      setStartDate("");
      setEndDate("");

      navigate("/admin/allsemesters");
    }
  };

  console.log("Reach form");
  return (
    <div
      style={{
        width: "79%",
        padding: "50px",
        background: "whitesmoke",
      }}
    >
      <div>
        <Link to="/admin/allsemesters">
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
        <p className={classes.title}>Create Semester</p>

        <div style={{ width: "80%", marginBottom: "35px" }}>
          <select
            className={classes.FormSelect}
            value={name}
            onChange={onNameChange}
            required
          >
            <option className="text-center">Choose Semester</option>
            <option className="text-center" value="SemesterI">
              SemesterI
            </option>
            <option className="text-center" value="SemesterII">
              SemesterII
            </option>
          </select>
        </div>

        <input
          type="date"
          className={classes.Forminput}
          value={startdate}
          onChange={onStartDateChange}
          required
        />
        <label className={classes.Formlabel}>Start Date</label>

        <input
          type="date"
          className={classes.Forminput}
          value={enddate}
          onChange={onEndDateChange}
          required
        />
        <label className={classes.Formlabel}>End Date</label>

        <center>
          <button className={classes.send}>
            <i class="mdi mdi-file-check btn-icon-prepend"></i> Create
          </button>
        </center>
      </form>
    </div>
  );
};

export default SemesterForm;
