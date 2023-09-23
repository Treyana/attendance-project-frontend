import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createSubjects, fetchSubjects } from "./subjectSlice";
import classes from "../teacher/TeacherForm.module.css";
import { fetchTeachers, getAllTeachers } from "../teacher/teacherSlice";
import { fetchClasses, getAllClasses } from "../class/classSlice";

const SubjectForm = () => {
  const [codeno, setCodeno] = useState("");
  const [name, setName] = useState("");
  const [userId, setTeacher] = useState("");
  const [classId, setClass] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const onCodenoChange = (e) => setCodeno(e.target.value);
  const onNameChange = (e) => setName(e.target.value);
  const onTeacherIdChange = (e) => setTeacher(e.target.value);
  const onClassIdChange = (e) => setClass(e.target.value);

  const canSave =
    [codeno, name, userId, classId].every(Boolean) &&
    addRequestStatus === "idle";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchTeachers());
    dispatch(fetchSubjects());
    dispatch(fetchClasses());
  }, [dispatch]);

  const teachers = useSelector(getAllTeachers);
  const yearclasses = useSelector(getAllClasses);
  console.log(yearclasses);

  const onSubmit = (event) => {
    event.preventDefault();

    if (canSave) {
      try {
        setAddRequestStatus("pending");

        dispatch(
          createSubjects({
            codeno,
            name,
            userId,
            classId,
          })
        );
      } catch (error) {
        console.log(error);
      } finally {
        setAddRequestStatus("idle");
      }

      setCodeno("");
      setName("");

      navigate("/admin/allsubjects");
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
        <Link to="/admin/allsubjects">
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
        <p className={classes.title}>Create Subject</p>
        {/* <div className={classes.flex}> */}

        <select
          style={{ width: "80%", marginBottom: "35px" }}
          className={classes.FormSelect}
          value={userId}
          onChange={onTeacherIdChange}
          required
        >
          <option className="text-center" value="">
            Choose Teacher
          </option>
          {teachers.map((a) => (
            <option className="text-center" key={a.id} value={a.id}>
              {a.fullname}
            </option>
          ))}
          ;
        </select>

        <select
          style={{ width: "80%", marginBottom: "35px" }}
          className={classes.FormSelect}
          value={classId}
          onChange={onClassIdChange}
          required
        >
          <option className="text-center" value="">
            Choose Class
          </option>
          {yearclasses.map((a) => (
            <option className="text-center" key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
          ;
        </select>

        <input
          type="text"
          placeholder="Code No"
          className={classes.Forminput}
          value={codeno}
          onChange={onCodenoChange}
          required
        />
        <label className={classes.Formlabel}>Code No</label>
        <input
          type="text"
          placeholder="Subject"
          className={classes.Forminput}
          value={name}
          onChange={onNameChange}
          required
        />
        <label className={classes.Formlabel}>Subject</label>

        <center>
          <button className={classes.send} style={{ marginTop: "0px" }}>
            <i class="mdi mdi-file-check btn-icon-prepend"></i> Create
          </button>
        </center>
      </form>
    </div>
  );
};

export default SubjectForm;
