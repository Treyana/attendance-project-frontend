import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClasses, getAllClasses } from "../class/classSlice";
import { useEffect } from "react";
import { useState } from "react";
import classes from "../teacher/TeacherForm.module.css";

import { fetchStudents, getAllStudents } from "../student/studentSlice";
import { fetchSubjects, getAllSubjects } from "../subject/subjectSlice";
import { getAllAttendances } from "./attendanceSlice";
import { fetchAllAttendances } from "./attendanceSlice";
import {
  fetchTotaltimeCount,
  getAllTotaltimecount,
} from "../totaltimecount/totaltimecountSlice";
import { fetchSemesters, getAllSemesters } from "../semester/semesterSlice";
import { getUser } from "../login/authSlice";
import XLSX from "sheetjs-style";
import { saveAs } from "file-saver";

const AttendanceListingByMonthly = () => {
  const students = useSelector(getAllStudents);
  const yearclasses = useSelector(getAllClasses);
  const subjects = useSelector(getAllSubjects);
  const attendances = useSelector(getAllAttendances);
  const semesters = useSelector(getAllSemesters);
  const totatimecounts = useSelector(getAllTotaltimecount);

  const loginUser = useSelector(getUser);
  console.log(loginUser);

  const loginId = loginUser?.id;
  console.log(loginId);

  const loginUserName = loginUser?.fullname;

  let [permissions, setPermissions] = useState([]);
  const [classId, setClassId] = useState();
  const [subjectId, setSubjectId] = useState("");
  const [fdate, setFDate] = useState("");
  const [tdate, setTDate] = useState("");
  const [selectSemester, setSemesterId] = useState("");

  var timecount = "";
  var CheckedList = [];
  var DateList = [];
  var i = 0;
  const addcheckedList = (classId, subjectId, fdate, tdate) => {
    const checkedList = attendances?.filter(
      (attendance) =>
        attendance?.class_id == classId &&
        attendance?.subject_id == subjectId &&
        attendance?.date.split("-").join("") >= fdate &&
        attendance?.date.split("-").join("") <= tdate
    );
    return checkedList;
  };

  const checkedList = addcheckedList(
    String(classId),
    String(subjectId),
    String(fdate.split("-").join("")),
    String(tdate.split("-").join(""))
  );
  const groupItems = checkedList.reduce((att, rec) => {
    const itemsInAcc = att.filter((a) => a.student_id === rec.student_id);
    if (itemsInAcc.length > 0) {
      itemsInAcc[0].timecount = +itemsInAcc[0].timecount + +rec.timecount;
    } else {
      att = [...att, { ...rec }];
    }
    return att;
  }, []);

  var datelist = [];
  const groupItems2 = checkedList.reduce((att, rec) => {
    const itemsInAcc = att.filter((a) => a.student_id === rec.student_id);
    if (itemsInAcc.length > 0) {
      itemsInAcc[0].timecount = itemsInAcc[0].timecount
        .toString()
        .concat(",", rec.timecount)
        .toString();
      itemsInAcc[0].date = itemsInAcc[0].date.concat(",", rec.date);
    } else {
      att = [...att, { ...rec }];
    }
    return att;
  }, []);

  groupItems2.map((gp) => {
    gp.timecount = gp.timecount.toString().split(",");
    gp.date = gp.date.split(",");
  });

  groupItems2.map((atten) => {
    if (Array.isArray(atten.timecount)) {
    } else {
    }
  });

  const filterDate = (fdate, tdate) => {
    const filteredDate = attendances?.filter(
      (attendance) =>
        attendance?.date.split("-").join("") >= fdate &&
        attendance?.date.split("-").join("") <= tdate
    );
    return filteredDate;
  };
  const filteredDate = filterDate(
    String(fdate.split("-").join("")),
    String(tdate.split("-").join(""))
  );
  console.log(String(fdate.split("-").join("")).slice(0, 6));
  let desired_output = (attendaces) => {
    let unique_values = [
      ...new Set(filteredDate.map((element) => element.date)),
    ];
    return unique_values;
  };
  DateList = desired_output(attendances);
  groupItems.map((checked) => {
    CheckedList.push(checked.student_id);
    timecount = checked.timecount;
  });
  const data = {
    classId: classId,
    subjectId: subjectId,
    date: fdate,
    permissions: permissions,
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchClasses());
    dispatch(fetchStudents());
    dispatch(fetchSubjects());
    dispatch(fetchSemesters());
    dispatch(fetchAllAttendances());
    dispatch(fetchTotaltimeCount());
  }, [dispatch]);

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

  // const onFDateChange = (e) => {
  //   setFDate(e.target.value);
  // };
  // const onTDateChange = (e) => {
  //   setTDate(e.target.value);
  // };

  // add
  const [errorMessage, setErrorMessage] = useState("");

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

  const onFDateChange = (e) => {
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
        // setErrorMessage(" not within the semester date range."
        // );

        setFDate(e.target.value);

        setErrorMessage("");
      } else {
        setFDate("");
        setErrorMessage(
          <div className={classes.errMsg}>
            {" "}
            <i class="mdi mdi-alert-octagon fs-5"></i>
            <span>" not within the semester date range."</span>
          </div>
        );
      }
    }
  };

  const onTDateChange = (e) => {
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
        // Filter timetables to find matching subjects for the selected date and day

        setTDate(e.target.value);
        setErrorMessage("");
      } else {
        setTDate("");
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

  const onSemesterIdChange = (e) => setSemesterId(e.target.value);

  const filterTTimeCountbyDate = (c) => {
    const filterTTimeCount = totatimecounts?.filter(
      (ttimecount) =>
        ttimecount?.fromDate.split("-").join("").slice(0, 6) ===
          fdate.split("-").join("").slice(0, 6) &&
        ttimecount?.toDate.split("-").join("").slice(0, 6) ===
          tdate.split("-").join("").slice(0, 6) &&
        ttimecount?.subject?.id.toString() === subjectId
    );
    return filterTTimeCount;
  };
  const filterTTimeCount = filterTTimeCountbyDate(String(fdate), String(tdate));

  var Ttimecount = 0;
  filterTTimeCount.map((ttimecount) => {
    Ttimecount += ttimecount.timeCount;
  });
  const calculatePercentage = (timecount) => {
    return Math.round((timecount / Ttimecount) * 100);
  };

  function getWednesdaysAndThursdays(startDate, endDate, desiredDaysOfWeek) {
    const dateList = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const currentDayOfWeek = currentDate.getDay();
      if (desiredDaysOfWeek.includes(currentDayOfWeek)) {
        dateList.push(currentDate.toISOString().slice(0, 10)); // Store dates as strings (e.g., "YYYY-MM-DD")
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateList;
  }
  const userToDaysMapping = {
    "miss.khinmyochit@gmail.com": [2, 5],
    "pyepyeaung@gmail.com": [1, 2],
    "thandarsoee@gmail.com": [1, 2, 4],
    "eieik82@gmail.com": [1, 3],
    "shoonlaepeti195@gmail.com": [3, 4],
    "thiri.lucky@gmail.com": [1, 3],
    "mamagyi.thu@gmail.com": [1, 3, 5],
  };

  const startDate = new Date(fdate);
  const endDate = new Date(tdate);

  const User = loginUser.username;
  console.log(User);

  const desiredDaysOfWeek = userToDaysMapping[User] || []; // Get desired days for the login user

  const dayOfWeekList = getWednesdaysAndThursdays(
    startDate,
    endDate,
    desiredDaysOfWeek
  );
  console.log(dayOfWeekList);

  // Export Excel
  const generateExcel = () => {
    const headers = [
      "Roll No",
      "Name",
      // "Class",
      ...DateList, // Include the date values from DateList
      "Total TimeCount",
      "TotalCount",
      "%",
    ];

    const dataWithClassNames = filterStudent.map((student) => {
      const className =
        yearclasses.find((cls) => cls.id === student.yearClass.id)?.name ||
        "N/A";
      // Modify this part based on your data structure

      const dataObject = {
        "Roll No": student.rollno,
        Name: student.fullname,
        // Class: className,
      };
      DateList.forEach((date) => {
        const timecountForDate = checkedList
          .filter(
            (attendance) =>
              attendance.student_id === student.id && attendance.date === date
          )
          .reduce(
            (totalTimecount, attendance) =>
              totalTimecount + attendance.timecount,
            0
          );

        dataObject[date] = timecountForDate;
      });

      const totalCount = DateList.reduce(
        (total, date) => total + dataObject[date],
        0
      );
      dataObject["TotalCount"] = totalCount;
      dataObject["Total TimeCount"] = Ttimecount;
      // Calculate % for the student
      const percentage = (totalCount / Ttimecount) * 100;
      dataObject["%"] = `${percentage.toFixed(0)} %`;

      return dataObject;
    });

    const worksheet = XLSX.utils.json_to_sheet(dataWithClassNames, {
      header: headers,
    });

    // Manually set font color for cells with % < 15
    dataWithClassNames.forEach((_, rowIndex) => {
      if (parseFloat(dataWithClassNames[rowIndex]["%"]) < 15) {
        headers.forEach((_, colIndex) => {
          const cell =
            worksheet[XLSX.utils.encode_cell({ r: rowIndex + 1, c: colIndex })];
          if (cell) {
            cell.s = {
              font: { color: { rgb: "FF0000" } },
              fill: { fgColor: { rgb: "FFFF00" } },
            }; // Set font color to red
          }
        });
      }
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const excelBlob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(excelBlob, "attendance_data.xlsx");
  };

  const [searchText, setSearchText] = useState("");

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredData = filterStudent.filter((item) =>
    item.fullname?.toLowerCase().includes(searchText.toLowerCase())
  );
  const formSelect = `form-select ${classes.formSelect}`;
  // const formControl = `form-control ${classes.formControl}`;
  return (
    <div class="main-panel">
      <div className="container">
        <center style={{ marginTop: "30px" }}>
          <h1 class={classes.mainTitle}> Monthly Attendance</h1>
        </center>
        {errorMessage && errorMessage}

        <form className={classes.center} style={{ width: "100%" }}>
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
                value={fdate}
                onChange={onFDateChange}
              />
            </div>
            <div class="col">
              <input
                type="date"
                className={formSelect}
                value={tdate}
                onChange={onTDateChange}
              />
            </div>
          </div>
        </form>

        <div>
          <div>
            <button
              className={classes.color1}
              onClick={generateExcel}
              div
              style={{ float: "right" }}
            >
              <i class="mdi mdi-file-excel"></i>&nbsp;&nbsp;Export Excel
            </button>
            <input
              type="text"
              placeholder="Search By Name"
              value={searchText}
              onChange={handleSearch}
              className={classes.FormSearch}
            />
          </div>
          <table id="example" class="display table table-hover w-100">
            <thead
              style={{
                background: "#040738",
                color: "#b9fefe",
              }}
            >
              <tr style={{ fontSize: "25px" }}>
                <th>Roll No</th>
                <th>Name</th>
                {/* {DateList.map((date) => (
                  <th className={classes.verTable}>{date}</th>
                ))} */}
                {dayOfWeekList.map((date) => (
                  <th className={classes.verTable} key={date}>
                    {date}
                  </th>
                ))}
                <th className={classes.verTable}>Total TimeCount</th>
                <th className={classes.verTable}>Total Attendance</th>
                <th>%</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((student) => (
                <tr>
                  <td>{student.rollno}</td>
                  <td>{student.fullname}</td>

                  {CheckedList.includes(student.id)
                    ? groupItems2.map((atten) => {
                        if (atten?.student_id === student.id) {
                          if (Array.isArray(atten?.timecount)) {
                            return dayOfWeekList.map((dd, i) => {
                              if (atten.date.includes(dd)) {
                                const index = atten.date.indexOf(dd);
                                return (
                                  <td key={i}>{atten.timecount[index]}</td>
                                );
                              } else {
                                return <td key={i}>0</td>;
                              }
                            });
                          } else {
                            return dayOfWeekList.map((dd1, i) => {
                              return atten.date === dd1 ? (
                                <td key={i}>{atten.timecount}</td>
                              ) : (
                                <td key={i}>0</td>
                              );
                            });
                          }
                        }
                        return null; // Return null for other students
                      })
                    : // If the student is not in Checkedlist, show "0" for all days
                      dayOfWeekList.map((dd, i) => <td key={i}>0</td>)}

                  <td class="fw-bold text-primary">{Ttimecount}</td>

                  {CheckedList.includes(student.id) &&
                    groupItems.map((att) => {
                      if (att.student_id == student.id) {
                        return <td class="fw-bold">{att.timecount}</td>;
                      }
                    })}
                  {!CheckedList.includes(student.id) && (
                    <td class="fw-bold">0</td>
                  )}

                  {/* {CheckedList.includes(student.id) &&
                    groupItems.map((att) => {
                      if (att.student_id == student.id) {
                        return (
                          <td style={{ color: "red" }}>
                            {calculatePercentage(att.timecount)}
                          </td>
                        );
                      }
                    })} */}

                  {CheckedList.includes(student.id) &&
                    groupItems.map((att) => {
                      if (att.student_id == student.id) {
                        return (
                          <td
                            style={{
                              background:
                                calculatePercentage(att.timecount) > 75
                                  ? "white"
                                  : "rgba(247, 85, 77, 0.4)",
                              fontWeight: "bold",
                            }}
                          >
                            {console.log(
                              "Percentage" + calculatePercentage(att.timecount)
                            )}
                            {calculatePercentage(att.timecount)}%
                          </td>
                        );
                      }
                    })}
                  {!CheckedList.includes(student.id) && (
                    <td style={{ color: "red" }}>0</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <div className={classes.center}>
            <i className="mdi mdi-checkbox-multiple-marked-circle"></i>
            &nbsp;Approved By&nbsp;&nbsp;
            <span
              className="fw-bold"
              style={{ color: "#160158", marginRight: "10px" }}
            >
              {loginUserName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceListingByMonthly;
