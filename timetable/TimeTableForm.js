import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTimeTable } from "./TimeTableSlice";
import classes from "../teacher/TeacherForm.module.css";
import { fetchSemesters, getAllSemesters } from "../semester/semesterSlice";
import { fetchClasses, getAllClasses } from "../class/classSlice";
import { fetchSubjects, getAllSubjects } from "../subject/subjectSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const TimeTableForm = () => {
  const [SEMESTER_ID, setSemesterId] = useState("");
  const [className, setClassName] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [classDay, setClassDay] = useState("");
  const [classTime, setClassTime] = useState("");

  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const semesters = useSelector(getAllSemesters);
  const _Classes = useSelector(getAllClasses);
  const subjects = useSelector(getAllSubjects);
  const dispatch = useDispatch();
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const classTimes = [
    "8:30-9:30",
    "9:35-10:35",
    "10:40-11:40",
    "12:40-1:40",
    "1:45-2:45",
    "2:50-3:50",
  ];
  console.log("semesters: " + semesters);
  useEffect(() => {
    dispatch(fetchSemesters());
    dispatch(fetchClasses());
    dispatch(fetchSubjects());
  }, [dispatch]);
  // const onCodenoChange = e => setCodeno(e.target.value)
  // const onNameChange = e => setName(e.target.value)
  const onSemesterIdChange = (e) => setSemesterId(e.target.value);
  const onClassIdChange = (e) => setClassName(e.target.value);
  const onSubjectIdChange = (e) => setSubjectName(e.target.value);
  const onClassDayChange = (e) => setClassDay(e.target.value);
  const onClassTimeChange = (e) => setClassTime(e.target.value);

  const canSave =
    [SEMESTER_ID, className, subjectName, classDay, classTime].every(Boolean) &&
    addRequestStatus === "idle";
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();

    if (canSave) {
      try {
        setAddRequestStatus("pending");

        dispatch(
          createTimeTable({
            SEMESTER_ID,
            className,
            subjectName,
            classDay,
            classTime,
          })
        );
      } catch (error) {
        console.log(error);
      } finally {
        setAddRequestStatus("idle");
      }

      // setCodeno('')
      // setName('')

      navigate("/admin/allTimeTables");
    }
  };

  return (
    // <div class="main-panel">
    //   <div class="content-wrapper">
    <div
      style={{
        width: "79%",
        padding: "50px",
        background: "whitesmoke",
      }}
    >
      <div className={classes.formboldformwrapper}>
        <form className={classes.form} onSubmit={onSubmit}>
          <p className={classes.title}>Create TimeTable</p>
          <div>
            <select className="form-select" onChange={onSemesterIdChange}>
              <option className={classes.input} value={SEMESTER_ID}>
                Choose Semester
              </option>
              {semesters.map((semester) => (
                <option
                  className={classes.input}
                  value={semester.id}
                  key={semester.id}
                >
                  {semester.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select className="form-select" onChange={onClassIdChange}>
              <option className={classes.input} value={className}>
                Choose Class
              </option>
              {_Classes.map((Class) => (
                <option
                  className={classes.input}
                  value={Class.id}
                  key={Class.id}
                >
                  {Class.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select className="form-select" onChange={onSubjectIdChange}>
              <option className={classes.input} value={subjectName}>
                Choose Subject
              </option>
              {subjects.map((subject) => (
                <option
                  className={classes.input}
                  value={subject.id}
                  key={subject.id}
                >
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select className="form-select" onChange={onClassDayChange}>
              <option className={classes.input} value={classDay}>
                Choose ClassDay
              </option>
              {days.map((classday) => (
                <option
                  className={classes.input}
                  value={classday}
                  key={classday}
                >
                  {classday}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select className="form-select" onChange={onClassTimeChange}>
              <option className={classes.input} value={classDay}>
                Choose ClassTime
              </option>
              {classTimes.map((classtime) => (
                <option
                  className={classes.input}
                  value={classtime}
                  key={classtime}
                >
                  {classtime}
                </option>
              ))}
            </select>
          </div>

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

export default TimeTableForm;
