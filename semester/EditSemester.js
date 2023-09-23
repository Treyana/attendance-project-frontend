import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSemesterById, updateSemester } from "./semesterSlice";
import classes from "../teacher/TeacherForm.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
const EditSemester = () => {
  const { semesterId } = useParams();
  const semesters = useSelector((state) =>
    selectSemesterById(state, Number(semesterId))
  );

  const [id] = useState(semesters.id);
  const [name, setName] = useState(semesters.name);
  const [startdate, setStartDate] = useState(semesters.startdate);
  const [enddate, setEndDate] = useState(semesters.enddate);

  const [updateRequestStatus, setUpdateRequestStatus] = useState("idle");

  const onNameChange = (e) => setName(e.target.value);
  const onStartDateChange = (e) => setStartDate(e.target.value);
  const onEndDateChange = (e) => setEndDate(e.target.value);

  const canSave =
    [id, name, startdate, enddate].every(Boolean) &&
    updateRequestStatus === "idle";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();

    if (canSave) {
      try {
        setUpdateRequestStatus("pending");

        dispatch(
          updateSemester({
            id,
            name,
            startdate,
            enddate,
          })
        );
      } catch (error) {
        console.log(error);
      } finally {
        setUpdateRequestStatus("idle");
      }

      setName("");
      setStartDate("");
      setEndDate("");

      navigate("/admin/allsemesters");
    }
  };

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
        <p className={classes.title}>Edit Semester</p>
        <div style={{ width: "80%", marginBottom: "35px" }}>
          <select
            className={classes.FormSelect}
            value={name}
            onChange={onNameChange}
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
        />
        <label className={classes.Formlabel}>Start Date</label>

        <input
          type="date"
          className={classes.Forminput}
          value={enddate}
          onChange={onEndDateChange}
        />
        <label className={classes.Formlabel}>End Date</label>
        <center>
          <button className={classes.send}>UPDATE</button>
        </center>
      </form>
    </div>
  );
};

export default EditSemester;
