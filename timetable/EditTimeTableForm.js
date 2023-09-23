import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectTimeTableById, updateTimeTable } from "./TimeTableSlice";
import classes from "../teacher/TeacherForm.module.css";
import { fetchSemesters, getAllSemesters } from "../semester/semesterSlice";
import { fetchClasses, getAllClasses } from "../class/classSlice";
import { fetchSubjects, getAllSubjects } from "../subject/subjectSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const EditTimeTableForm = () => {
  const { timetableId } = useParams();
  console.log("paId : " + timetableId);
  const timetable = useSelector((state) =>
    selectTimeTableById(state, Number(timetableId))
  );
  console.log(timetable);
  const semesters = useSelector(getAllSemesters);

  const [id] = useState(timetable.id);
  const [className, setClassName] = useState(timetable.className);
  const [classDay, setClassDay] = useState(timetable.classDay);
  const [classTime, setClassTime] = useState(timetable.classTime);
  const [subjectName, setSubjectName] = useState(timetable.subjectName);
  const [SEMESTER_ID, setSemesterId] = useState(timetable.semester.id);

  const _Classes = useSelector(getAllClasses);
  const subjects = useSelector(getAllSubjects);
  const dispatch = useDispatch();
  const days = ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"];
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
  const [updateRequestStatus, setUpdateRequestStatus] = useState("idle");
  const canUpdate =
    [id, SEMESTER_ID, className, subjectName, classDay, classTime].every(
      Boolean
    ) && updateRequestStatus === "idle";

  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();

    if (canUpdate) {
      try {
        setUpdateRequestStatus("pending");

        dispatch(
          updateTimeTable({
            id,
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
        setUpdateRequestStatus("idle");
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
          <p className={classes.title}>Update TimeTable</p>
          <select
            class="form-select"
            className={classes.name}
            value={SEMESTER_ID}
            onChange={onSemesterIdChange}
          >
            <option value="">Choose Semester</option>

            {semesters.map((semester) => (
              <option key={semester.id} value={semester.id}>
                <span> {semester.name} </span>
              </option>
            ))}
          </select>
          <select
            class="form-select"
            className={classes.name}
            value={className}
            onChange={onClassIdChange}
          >
            <option value="">Choose Class</option>

            {_Classes.map((Class) => (
              <option key={Class.id} value={Class.id}>
                <span> {Class.name} </span>
              </option>
            ))}
          </select>
          <select
            class="form-select"
            className={classes.name}
            value={subjectName}
            onChange={onSubjectIdChange}
          >
            <option value="">Choose Subject</option>

            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                <span> {subject.name} </span>
              </option>
            ))}
          </select>
          <select
            class="form-select"
            className={classes.name}
            value={classDay}
            onChange={onClassDayChange}
          >
            <option value="">Choose ClassDay</option>

            {days.map((classday) => (
              <option key={classday} value={classday}>
                <span> {classday} </span>
              </option>
            ))}
          </select>

          <select
            class="form-select"
            className={classes.name}
            value={classTime}
            onChange={onClassTimeChange}
          >
            <option value="">Choose ClassTime</option>

            {classTimes.map((classtime) => (
              <option key={classtime} value={classtime}>
                <span> {classtime} </span>
              </option>
            ))}
          </select>

          <center>
            <button className={classes.send}>
              <i class="mdi mdi-file-check btn-icon-prepend"></i> UPDATE
            </button>
          </center>
        </form>
      </div>
    </div>
    // </div>
  );
};

export default EditTimeTableForm;
