import React, { useEffect, useState } from "react";
import { fetchStudents, getAllStudents } from "../student/studentSlice";
import { fetchClasses, getAllClasses } from "../class/classSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubjects, getAllSubjects } from "../subject/subjectSlice";
import { useNavigate } from "react-router-dom";
import { createAttendance } from "./attendanceSlice";
import classes from "../teacher/TeacherForm.module.css";
import { fetchSemesters, getAllSemesters } from "../semester/semesterSlice";
// import "datatables.net-dt/js/dataTables.dataTables";
// import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import { getUser } from "../login/authSlice";
import { fetchTimeTables, getAllTimeTables } from "../timetable/TimeTableSlice";
import DataTable from "react-data-table-component";

const AttendanceForm = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchClasses());
    dispatch(fetchStudents());
    dispatch(fetchSubjects());
    dispatch(fetchSemesters());
    dispatch(fetchTimeTables());
  }, [dispatch]);

  const loginUser = useSelector(getUser);
  const loginId = loginUser?.id;
  const students = useSelector(getAllStudents);
  const yearclasses = useSelector(getAllClasses);
  const subjects = useSelector(getAllSubjects);
  const semesters = useSelector(getAllSemesters);
  const timetables = useSelector(getAllTimeTables);
  const [permissions, setPermissions] = useState([]);
  const [classId, setClassId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [date, setDate] = useState("");
  const [selectSemester, setSemesterId] = useState("");

  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const data = {
    classId: classId,
    subjectId: subjectId,
    date: date,
    permissions: permissions,
  };

  const columns = [
    { name: "RollNo", selector: "rollno", sortable: true },
    { name: "Name", selector: "fullname", sortable: true },

    {
      name: "Action",
      cell: (row) => (
        // filterStudent.map(
        //   (student) => (
        <input
          type="checkbox"
          value={row.id}
          key={row.id}
          name={"permission"}
          id={"permission"}
          onChange={addToAttendanceList}
        />
      ),
      //   )
      // ),
    },
  ];

  const onClassIdChange = (e) => {
    setClassId(e.target.value);
    setPermissions("");
  };

  const onSubjectIdChange = (e) => {
    setSubjectId(e.target.value);
    setPermissions("");
  };

  const filterByClass = (c) => {
    const filteredClass = students?.filter(
      (student) => student?.yearClass?.id == c
    );
    return filteredClass;
  };
  const filterStudent = filterByClass(String(classId));

  const filterByTeacher = (c) => {
    const filteredTeacher = subjects?.filter(
      (subject) => subject?.user?.id === c
    );
    return filteredTeacher;
  };
  const filterSubjectByTeacher = filterByTeacher(Number(loginId));
  console.log(filterSubjectByTeacher);

  const filterSubjectByClass = (c) => {
    const filteredSubjects = filterSubjectByTeacher?.filter(
      (subject) => subject?.yearClass?.id == c
    );
    return filteredSubjects;
  };
  const filteredSubjectByclass = filterSubjectByClass(String(classId));

  const filterBySemester = (c) => {
    const filteredSemester = filteredSubjectByclass?.filter(
      (subject) => subject?.semester?.id === c
    );
    return filteredSemester;
  };
  const filterSubjectBysemester = filterBySemester(Number(selectSemester));
  console.log(filterSubjectBysemester);
  const addToAttendanceList = (event) => {
    var permissions_array = [...permissions];
    if (event.target.checked) {
      permissions_array = [...permissions, event.target.value];
    } else {
      permissions_array.splice(permissions.indexOf(event.target.value), 1);
    }
    setPermissions(permissions_array);
  };

  $(document).ready(function () {
    setTimeout(function () {
      $("#example").DataTable();
    }, 1000);
  });

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
            <span>&nbsp;&nbsp;Not within the semester date range!</span>
          </div>
        );
      }
    }
  };
  const onSemesterIdChange = (e) => setSemesterId(e.target.value);

  const canSave =
    [classId, subjectId, date, permissions].every(Boolean) &&
    addRequestStatus === "idle";
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();

    if (canSave) {
      try {
        setAddRequestStatus("pending");

        dispatch(
          createAttendance({
            subjectId,
            classId,
            date,
            permissions,
          })
        );
      } catch (error) {
      } finally {
        setAddRequestStatus("idle");
      }

      setPermissions("");
      setClassId("");
      setDate("");
      setSemesterId("");

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

  const customStyles = {
    rows: {
      style: {
        minHeight: "55px", // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        background: "#040738",
        color: "#b9fefe",
        fontSize: "15px",
      },
    },
    cells: {
      style: {
        paddingLeft: "5px", // override the cell padding for data cells
        paddingRight: "5px",
        fontSize: "15px",
        color: "#160158",
      },
    },
  };

  const formSelect = `form-select ${classes.formSelect}`;
  // const formControl = `form-control ${classes.formControl}`;
  return (
    <div class="main-panel">
      <div class="container">
        <center style={{ marginTop: "30px" }}>
          <h1 className={classes.mainTitle}> Take Attendance</h1>
        </center>
        {errorMessage && errorMessage}
        {/* {errorMessage && (
          <span type="button" className={classes.errMsg}>
            {errorMessage}
          </span>
        )} */}
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
                <option value="" className={classes.input}>
                  Choose Class{" "}
                </option>
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
                <option value="">Choose Semester</option>

                {semesters.map((year) => (
                  <option key={year.id} value={year.id}>
                    <span> {year.name} </span>
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
                <option value="">Choose Subject </option>
                {filterSubjectBysemester.map((y) => (
                  <option key={y.id} value={y.id}>
                    <span color="black"> {y.name} </span>
                  </option>
                ))}
              </select>
            </div>

            <div class="col">
              {/* {errorMessage && (
                <span for="Tooltips" className={classes.error}>
                  {errorMessage}
                </span>
              )} */}
              <input
                type="date"
                className={formSelect}
                value={date}
                onChange={onDateChange}
              />
            </div>
          </div>
          <div class="col">
            <button className={classes.color3} onClick={onSubmit}>
              <i class="mdi mdi-file-check btn-icon-prepend"></i>Take Attendance
            </button>
          </div>
        </form>

        <div>
          {/* Select aAll Checkbox */}
          {/* <div style={{ float: "right" }}>
            {" "}
            <input
              type="checkbox"
              id="selectAllCheckbox"
              onChange={(e) => selectAll(e.target)}
            />
            <label htmlFor="selectAllCheckbox">&nbsp;&nbsp;Select All</label>
          </div> */}
          {/* <table
            id="example"
            class="display table table-bordered table-hover table-striped"
          >
            <thead style={{ background: "#040738", color: "#b9fefe" }}>
              <tr>
                <th>Roll No</th>
                <th>Name</th>
                <th>Active</th>
              </tr>
            </thead>
            <tbody>
              {filterStudent.map((student) => (
                <tr>
                  <td>{student.rollno}</td>
                  <td>{student.fullname}</td>
                  <td>
                    <input
                      type="checkbox"
                      value={student.id}
                      key={student.id}
                      name={"permission"}
                      id={"permission"}
                      onChange={addToAttendanceList}
                    ></input>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}
          <div>
            <input
              type="text"
              placeholder="Search By Name"
              value={searchText}
              onChange={handleSearch}
              className={classes.FormSearch}
            />
          </div>
          <DataTable
            // title="Filtered Students"
            columns={columns}
            data={filteredData}
            // className="customDatatable"
            pagination
            highlightOnHover
            pointerOnHover
            customStyles={customStyles}
          />
        </div>
      </div>
    </div>
  );
};

export default AttendanceForm;
