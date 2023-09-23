import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClasses, getAllClasses } from "../class/classSlice";
import { useEffect } from "react";
import { useState } from "react";
import classes from "../teacher/TeacherForm.module.css";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import { fetchStudents, getAllStudents } from "../student/studentSlice";
import { fetchSubjects, getAllSubjects } from "../subject/subjectSlice";
import { getAllAttendances } from "./attendanceSlice";
import { fetchAllAttendances } from "./attendanceSlice";
import { fetchSemesters, getAllSemesters } from "../semester/semesterSlice";
import { getUser } from "../login/authSlice";
import DataTable from "react-data-table-component";

const AttendanceListingbyDaily = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchClasses());
    dispatch(fetchStudents());
    dispatch(fetchSubjects());
    dispatch(fetchAllAttendances());
    dispatch(fetchSemesters());
  }, [dispatch]);

  const loginUser = useSelector(getUser);
  console.log(loginUser);

  const loginId = loginUser?.id;
  console.log(loginId);

  const students = useSelector(getAllStudents);
  const yearclasses = useSelector(getAllClasses);
  const subjects = useSelector(getAllSubjects);
  const attendances = useSelector(getAllAttendances);
  const semesters = useSelector(getAllSemesters);

  let [permissions, setPermissions] = useState([]);
  const [classId, setClassId] = useState();
  const [subjectId, setSubjectId] = useState("");
  const [date, setDate] = useState("");
  const [selectSemester, setSemesterId] = useState("");

  var timecount = "";
  var CheckedList = [];
  const addcheckedList = (classId, subjectId, date) => {
    const checkedList = attendances?.filter(
      (attendance) =>
        attendance?.class_id == classId &&
        attendance?.subject_id == subjectId &&
        attendance?.date == date
    );

    return checkedList;
  };

  const checkedList = addcheckedList(
    String(classId),
    String(subjectId),
    String(date)
  );
  checkedList.map((checked) => {
    CheckedList.push(checked.student_id);
    console.log("CheckedLsit : " + CheckedList);
    timecount = checked.timecount;
  });
  console.log("timecount" + timecount);

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

  const filterByClass = (c) => {
    const filteredClass = students?.filter(
      (student) => student?.yearClass?.id == c
    );
    return filteredClass;
  };
  const filterStudent = filterByClass(String(classId));

  $(document).ready(function () {
    setTimeout(function () {
      $("#example").DataTable();
    }, 1000);
  });

  const onDateChange = (e) => {
    setDate(e.target.value);
  };
  const formSelect = `form-select ${classes.formSelect}`;
  const formControl = `form-control ${classes.formControl}`;

  const columns = [
    { name: "Rollno", selector: "rollno", sortable: true },
    { name: "Name", selector: "fullname", sortable: true },

    {
      name: "Timecount",
      cell: (row) =>
        // filterStudent.map(
        //   (student) => (
        {
          if (CheckedList.includes(row.id)) {
            return <td>{timecount}</td>;
          } else {
            return <td>0</td>;
          }
        },
      //   )
      // ),
    },
  ];

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

  return (
    <div class="main-panel">
      <div className="container">
        <center style={{ marginTop: "30px" }}>
          <h1 class={classes.mainTitle}> Daily Attendance</h1>
        </center>
        <form className={classes.center}>
          {/* <div className={classes.inputGroup}> */}
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
                <option value="" className={classes.select1}>
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
          </div>
        </form>

        <div>
          <input
            type="text"
            placeholder="Search By Name"
            value={searchText}
            onChange={handleSearch}
            className={classes.FormSearch}
          />
        </div>

        <div>
          <DataTable
            // title="Filtered Students"
            columns={columns}
            data={filteredData}
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

export default AttendanceListingbyDaily;
