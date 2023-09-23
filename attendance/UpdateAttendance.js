import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClasses, getAllClasses } from "../class/classSlice";
import { useEffect } from "react";
import { useState } from "react";
import classes from "../teacher/TeacherForm.module.css";

import { fetchStudents, getAllStudents } from "../student/studentSlice";
import { fetchSubjects, getAllSubjects } from "../subject/subjectSlice";
import { getAllAttendances } from "./attendanceSlice";
import { useNavigate } from "react-router-dom";
import { fetchAllAttendances, updateAttendance } from "./attendanceSlice";
import { getAllSemesters } from "../semester/semesterSlice";
import { getUser } from "../login/authSlice";
import { fetchTimeTables, getAllTimeTables } from "../timetable/TimeTableSlice";

const UpdateAttendance = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchClasses());
    dispatch(fetchStudents());
    dispatch(fetchSubjects());
    dispatch(fetchAllAttendances());
    dispatch(fetchTimeTables());
  }, [dispatch]);

  const students = useSelector(getAllStudents);
  const yearclasses = useSelector(getAllClasses);
  const subjects = useSelector(getAllSubjects);
  const attendances = useSelector(getAllAttendances);
  const semesters = useSelector(getAllSemesters);
  const timetables = useSelector(getAllTimeTables);
  let [permissions, setPermissions] = useState([]);

  const [classId, setClassId] = useState();
  const [subjectId, setSubjectId] = useState("");
  const [date, setDate] = useState("");
  const [selectSemester, setSemesterId] = useState("");

  const loginUser = useSelector(getUser);

  const loginId = loginUser?.id;

  const [updateRequestStatus, setUpdateRequestStatus] = useState("idle");
  const addcheckedList = (classId, subjectId, date) => {
    var CheckedList = [];
    const checkedList = attendances?.filter(
      (attendance) =>
        attendance?.class_id == classId &&
        attendance?.subject_id == subjectId &&
        attendance?.date == date
    );
    checkedList.map((checked) => {
      CheckedList.push(checked?.student_id);
      //checkedList.splice(checkedList.indexOf(checked?.student_id),1);
    });
    // setPermissions(CheckedList);
    return CheckedList;
  };
  const CheckedList = addcheckedList(
    String(classId),
    String(subjectId),
    String(date)
  );
  useEffect(() => {
    // Fetch data and initialize permissions here
    const initialPermissions = addcheckedList(classId, subjectId, date);
    setPermissions(initialPermissions);
  }, [classId, subjectId, date]);
  //permissions=CheckedList
  const data = {
    classId: classId,
    subjectId: subjectId,
    date: date,
    permissions: permissions,
  };

  const onSemesterIdChange = (e) => setSemesterId(e.target.value);

  const onClassIdChange = (e) => {
    setClassId(e.target.value);
    setPermissions("");
  };

  const onSubjectIdChange = (e) => {
    setSubjectId(e.target.value);
    setPermissions("");
  };

  const filterByTeacher = (c) => {
    const filteredTeacher = subjects?.filter(
      (subject) => subject?.user?.id === c
    );
    return filteredTeacher;
  };
  const filterSubjectByTeacher = filterByTeacher(Number(loginId));
  console.log(filterSubjectByTeacher);

  const filterByClass = (c) => {
    const filteredClass = students?.filter(
      (student) => student?.yearClass?.id == c
    );
    return filteredClass;
  };
  const filterStudent = filterByClass(String(classId));

  const filterSubjectByClass = (c) => {
    const filteredSubjects = filterSubjectByTeacher?.filter(
      (subject) => subject?.yearClass?.id == c
    );
    return filteredSubjects;
  };
  const filteredSubjects = filterSubjectByClass(String(classId));

  const filterBySemester = (c) => {
    const filteredSemester = filteredSubjects?.filter(
      (subject) => subject?.semester?.id === c
    );
    return filteredSemester;
  };
  const filterSubjectBysemester = filterBySemester(Number(selectSemester));
  console.log(filterSubjectBysemester);

  const addToAttendanceList = (id) => {
    console.log(id);

    // }
    if (permissions.includes(id)) {
      setPermissions(permissions.filter((permission) => permission !== id));
    } else {
      setPermissions([...permissions, id]);
    }
  };

  // const onDateChange = (e) => {
  //   const truelist = [];
  //   const weekday = [
  //     "Sunday",
  //     "Monday",
  //     "Tuesday",
  //     "Wednesday",
  //     "Thursday",
  //     "Friday",
  //     "Saturday",
  //   ];
  //   const dt = new Date(e.target.value);
  //   let day = weekday[dt.getDay()];
  //   //setDate('');
  //   timetables.map((timetable) => {
  //     if (timetable.subjectName === subjectId) {
  //     }
  //     if (timetable.subjectName === subjectId && timetable.classDay === day) {
  //       truelist.push(timetable.subjectName);
  //     }
  //   });
  //   console.log("true: " + JSON.stringify(truelist));
  //   if (truelist.includes(subjectId)) {
  //     setDate(e.target.value);
  //   } else {
  //     setDate("");
  //     alert("Invalid Date");
  //   }
  // };

  const [errorMessage, setErrorMessage] = useState("");

  //   const truelist = [];
  //   const weekday = [
  //     "Sunday",
  //     "Monday",
  //     "Tuesday",
  //     "Wednesday",
  //     "Thursday",
  //     "Friday",
  //     "Saturday",
  //   ];
  //   const dt = new Date(e.target.value);
  //   let day = weekday[dt.getDay()];
  //   //setDate('');
  //   timetables.map((timetable) => {
  //     console.log("subjectname : " + timetable.subjectName);
  //     if (timetable.subjectName == subjectId && timetable.classDay == day) {
  //       //console.log("If Serve");
  //       //
  //       truelist.push(timetable.subjectName);
  //     }
  //   });
  //   if (truelist.includes(subjectId)) {
  //     setDate(e.target.value);
  //     setErrorMessage("");
  //   } else {
  //     setDate("");
  //     // alert("Invalid Date");

  //     setErrorMessage(
  //       <div className={classes.errMsg}>
  //         {" "}
  //         <i class="mdi mdi-alert-octagon fs-5"></i>
  //         <span>"Invalid Date! Please choose again."</span>
  //       </div>
  //     );
  //   }
  // };

  function getSemesterDatesByName(semesterName) {
    const semester = semesters.find((s) => s.id === semesterName);
    if (semester) {
      return {
        startdate: new Date(semester.startdate),
        enddate: new Date(semester.enddate),
      };
    } else {
      return null;
    }
  }

  const semesterDates = getSemesterDatesByName(Number(selectSemester));

  if (semesterDates) {
    console.log(` Start Date:`, semesterDates.startdate);
    console.log(` End Date:`, semesterDates.enddate);
  } else {
    console.log(`Semester  not found.`);
  }

  const onDateChange = (e) => {
    // Function to check if the selected date is within the semester's date range
    function isDateWithinSemester(d, start, end) {
      return d >= start && d <= end;
    }

    const selectedDate = new Date(e.target.value); // Parse the selected date
    const startDate = semesterDates ? semesterDates.startdate : null;
    const endDate = semesterDates ? semesterDates.enddate : null;

    if (startDate && endDate) {
      console.log("startDate" + startDate);
      if (isDateWithinSemester(selectedDate, startDate, endDate)) {
        const weekday = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];

        const dt = new Date(selectedDate);
        let day = weekday[dt.getDay()];
        console.log("Days" + day);

        // Filter timetables to find matching subjects for the selected date and day
        const matchingTimetables = timetables.filter(
          (timetable) =>
            timetable.subjectName === subjectId && timetable.classDay === day
        );
        console.log("timetable" + timetables.length);

        console.log(matchingTimetables.length);

        if (matchingTimetables.length > 0) {
          setErrorMessage("");
          setDate(e.target.value);
        } else {
          setErrorMessage(
            <div className={classes.errMsg}>
              {" "}
              <i class="mdi mdi-alert-octagon fs-5"></i>
              <span>"Error: No subject classes are scheduled"</span>
            </div>
          );
          setDate("");
        }
      } else {
        setDate("");
        // setErrorMessage(" not within the semester date range."
        // );
        setErrorMessage(
          <div className={classes.errMsg}>
            {" "}
            <i class="mdi mdi-alert-octagon fs-5"></i>
            <span>"not within the semester date range."</span>
          </div>
        );
      }
    }
  };
  const canSave =
    [classId, subjectId, date, permissions].every(Boolean) &&
    updateRequestStatus === "idle";
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    if (canSave) {
      try {
        setUpdateRequestStatus("pending");

        dispatch(
          updateAttendance({
            subjectId,
            classId,
            date,
            permissions,
          })
        );
      } catch (error) {
      } finally {
        setUpdateRequestStatus("idle");
      }
      navigate("/user");
    }
  };
  const [searchText, setSearchText] = useState("");

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredData = filterStudent.filter((item) =>
    item.fullname?.toLowerCase().includes(searchText.toLowerCase())
  );
  const formSelect = `form-select ${classes.formSelect}`;
  return (
    <div class="main-panel">
      <div className="container">
        <center style={{ marginTop: "30px" }}>
          <h1 className={classes.mainTitle}> Update Attendance</h1>
        </center>
        {errorMessage && errorMessage}
        <form
          onSubmit={onSubmit}
          className={classes.center}
          style={{ width: "100%" }}
        >
          <div className="row">
            <div class="col">
              <select
                className={formSelect}
                value={classId}
                onChange={onClassIdChange}
              >
                <option value="">Choose Class </option>
                {yearclasses.map((y) => (
                  <option key={y.id} value={y.id}>
                    <span> {y.name} </span>
                  </option>
                ))}
              </select>
            </div>

            <div class="col">
              <select
                className={formSelect}
                value={selectSemester}
                onChange={onSemesterIdChange}
              >
                <option value="" className={classes.input}>
                  Choose Semester{" "}
                </option>
                {semesters.map((y) => (
                  <option key={y.id} value={y.id}>
                    <span color="black"> {y.name} </span>
                  </option>
                ))}
              </select>
            </div>

            <div class="col">
              <select
                className={formSelect}
                value={subjectId}
                onChange={onSubjectIdChange}
              >
                <option value="" className={classes.input}>
                  Choose Subject{" "}
                </option>
                {filterSubjectBysemester.map((y) => (
                  <option key={y.id} value={y.id}>
                    <span color="black"> {y.name} </span>
                  </option>
                ))}
              </select>
            </div>

            <div class="col">
              <input
                type="date"
                className={formSelect}
                value={date}
                onChange={onDateChange}
              />
            </div>

            <div class="col">
              <button className={classes.color3} onClick={onSubmit}>
                <i class="mdi mdi-file-check btn-icon-prepend"></i>&nbsp;Update
                Attendance
              </button>
            </div>
          </div>
        </form>
        <div>
          <div>
            <input
              type="text"
              placeholder="Search By Name"
              value={searchText}
              onChange={handleSearch}
              className={classes.FormSearch}
            />
          </div>
          <table id="example" class="display table table-hover w-100 mb-5">
            <thead
              style={{
                background: "#040738",
                color: "#b9fefe",
              }}
            >
              <tr style={{ fontSize: "25px" }}>
                <th>Roll No</th>
                <th>Name</th>
                <th>Active</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((student) => (
                <tr>
                  <td>{student.rollno}</td>
                  <td>{student.fullname}</td>
                  <td>
                    <input
                      type="checkbox"
                      value={student.id}
                      key={student.id}
                      checked={permissions.includes(student?.id)}
                      name={"permission"}
                      id={"permission"}
                      onChange={() => addToAttendanceList(student.id)}
                    ></input>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UpdateAttendance;
