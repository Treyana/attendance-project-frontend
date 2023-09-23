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
import { useNavigate } from "react-router-dom";
import { fetchAllAttendances } from "./attendanceSlice";
import {
  fetchTotaltimeCount,
  getAllTotaltimecount,
} from "../totaltimecount/totaltimecountSlice";
import { getAllActivity, fetchActivity } from "../activity/activitySlice";
import { fetchSemesters, getAllSemesters } from "../semester/semesterSlice";
import XLSX from "sheetjs-style";
import { saveAs } from "file-saver";

const AttendanceListingbyMonthlyAll = () => {
  const students = useSelector(getAllStudents);
  const yearclasses = useSelector(getAllClasses);
  const subjects = useSelector(getAllSubjects);
  const attendances = useSelector(getAllAttendances);
  console.log(attendances);
  const totatimecounts = useSelector(getAllTotaltimecount);
  const activitytimes = useSelector(getAllActivity);
  console.log(activitytimes);

  let [permissions, setPermissions] = useState([]);
  const [classId, setClassId] = useState();
  const [subjectId, setSubjectId] = useState("");
  const [fdate, setFDate] = useState("");
  const [tdate, setTDate] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const semesters = useSelector(getAllSemesters);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchClasses());
    dispatch(fetchStudents());
    dispatch(fetchSubjects());
    dispatch(fetchAllAttendances());
    dispatch(fetchTotaltimeCount());
    dispatch(fetchActivity());
    dispatch(fetchSemesters());
  }, [dispatch]);

  var timecount = "";
  var CheckedList = [];
  var DateList = [];
  var i = 0;

  if (semesters.length >= 2) {
    var academicstardate = semesters[0].startdate;
    var academicenddate = semesters[1].enddate;
  } else {
    academicstardate = "";
    academicenddate = "";
  }

  const filterSubjectByClass = (c, fdate, tdate) => {
    console.log(fdate);
    console.log(c);
    console.log(tdate);

    const filteredSubjects = subjects?.filter(
      (subject) =>
        subject?.yearClass?.id == c &&
        fdate >= subject?.semester?.startdate.split("-").join("") &&
        tdate <= subject?.semester?.enddate.split("-").join("")
    );
    return filteredSubjects;
  };

  const filterSubjectByClassYs = (c, fdate, tdate) => {
    const filteredSubjects = subjects?.filter(
      (subject) => subject?.yearClass?.id == c
    );
    return filteredSubjects;
  };
  const filteredSubjects = filterSubjectByClass(
    String(classId),
    String(fdate.split("-").join("")),
    String(tdate.split("-").join(""))
  );
  console.log(filteredSubjects);

  const filteredSubjectsYS = filterSubjectByClassYs(
    String(classId),
    String(academicstardate?.split("-").join("")),
    String(academicenddate?.split("-").join(""))
  );

  var tmparry = [];
  filteredSubjects.map((sub) => {
    tmparry.push(sub.id);
  });

  var tmparryys = [];
  filteredSubjectsYS.map((sub) => {
    tmparryys.push(sub.id);
  });

  const addcheckedList = (subjectlist, classId, fdate, tdate) => {
    const checkedList = attendances?.filter(
      (attendance) =>
        attendance?.class_id == classId &&
        attendance?.date.split("-").join("") >= fdate &&
        attendance?.date.split("-").join("") <= tdate &&
        subjectlist.includes(attendance.subject_id)
    );
    return checkedList;
  };
  const checkedList = addcheckedList(
    tmparry,
    String(classId),
    String(fdate.split("-").join("")),
    String(tdate.split("-").join(""))
  );
  const checkedListYS = addcheckedList(
    tmparryys,
    String(classId),
    String(academicstardate.split("-").join("")),
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

  const groupItemsYS = checkedListYS.reduce((att, rec) => {
    const itemsInAcc = att.filter((a) => a.student_id === rec.student_id);
    if (itemsInAcc.length > 0) {
      itemsInAcc[0].timecount = +itemsInAcc[0].timecount + +rec.timecount;
    } else {
      att = [...att, { ...rec }];
    }
    return att;
  }, []);

  var subjectlist = [];
  const groupItems2 = checkedList.reduce((att, rec) => {
    const itemsInAcc = att.filter(
      (a) => a.student_id === rec.student_id && a.subject_id === rec.subject_id
    );
    if (itemsInAcc.length > 0) {
      itemsInAcc[0].timecount = +itemsInAcc[0].timecount + +rec.timecount;
      //itemsInAcc[0].timecount = (itemsInAcc[0].timecount.toString().concat(",", rec.timecount).toString());
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

  const groupItems3 = groupItems2.reduce((att, rec) => {
    const itemsInAcc = att.filter((a) => a.student_id === rec.student_id);
    if (itemsInAcc.length > 0) {
      //itemsInAcc[0].timecount = (+itemsInAcc[0].timecount) + (+rec.timecount)
      itemsInAcc[0].timecount = itemsInAcc[0].timecount
        .toString()
        .concat(",", rec.timecount)
        .toString();
      itemsInAcc[0].subject_id = itemsInAcc[0].subject_id
        .toString()
        .concat(",", rec.subject_id);
    } else {
      att = [...att, { ...rec }];
    }
    return att;
  }, []);

  groupItems3.map((gp) => {
    gp.timecount = gp.timecount.toString().split(",");
    gp.subject_id = gp.subject_id.toString().split(",");
  });

  let desired_output = (attendaces) => {
    let unique_values = [...new Set(attendaces.map((element) => element.date))];
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

  // $(document).ready(function () {
  //   setTimeout(function () {
  //     $("#example").DataTable();
  //   }, 1000);
  // });

  const onFDateChange = (e) => {
    setFDate(e.target.value);
  };
  const onTDateChange = (e) => {
    setTDate(e.target.value);
  };
  const filterTTimeCountbyDate = (sublist, fdate, tdate) => {
    const filterTTimeCount = totatimecounts?.filter(
      (ttimecount) =>
        ttimecount?.fromDate.split("-").join("").slice(0, 6) >=
          fdate.split("-").join("").slice(0, 6) &&
        ttimecount?.toDate.split("-").join("").slice(0, 6) <=
          tdate.split("-").join("").slice(0, 6) &&
        sublist.includes(ttimecount.subject.id)
    );
    return filterTTimeCount;
  };
  const filterTTimeCount = filterTTimeCountbyDate(
    tmparry,
    String(fdate),
    String(tdate)
  );
  const filterTTimeCountYS = filterTTimeCountbyDate(
    tmparryys,
    String(academicstardate),
    String(academicenddate)
  );

  const filterActTimeCountbyDate = (fdate, tdate) => {
    const filterActTimeCount = activitytimes?.filter(
      (act) =>
        act.fromDate.split("-").join("") >= fdate.split("-").join("") &&
        act.toDate.split("-").join("") <= tdate.split("-").join("")
    );
    return filterActTimeCount;
  };
  const filterActTimeCount = filterActTimeCountbyDate(
    String(fdate),
    String(tdate)
  );

  const groupTTime = filterTTimeCount.reduce((act, rec) => {
    const itemsInAcc = act.filter((a) => a.subject.id === rec.subject.id);
    if (itemsInAcc.length > 0) {
      itemsInAcc[0].timeCount = +itemsInAcc[0].timeCount + +rec.timeCount;
    } else {
      act = [...act, { ...rec }];
    }
    return act;
  }, []);

  const groupTTimeYS = filterTTimeCountYS.reduce((act, rec) => {
    const itemsInAcc = act.filter((a) => a.subject.id === rec.subject.id);
    if (itemsInAcc.length > 0) {
      itemsInAcc[0].timeCount = +itemsInAcc[0].timeCount + +rec.timeCount;
    } else {
      act = [...act, { ...rec }];
    }
    return act;
  }, []);

  var totalActTime = 0;
  filterActTimeCount?.map((timecount) => {
    totalActTime += timecount.timeCount;
  });

  var tmpTimecount = 0;
  groupItems.map((gp) => {
    tmpTimecount = gp.timecount + totalActTime;
    gp.timecount = tmpTimecount;
  });

  groupItemsYS.map((gp) => {
    gp.timecount = gp.timecount + totalActTime;
  });

  var Ttimecount = 0;
  filterTTimeCount.map((ttimecount) => {
    Ttimecount += ttimecount.timeCount;
  });
  Ttimecount = Ttimecount + totalActTime;

  var TtimecountYs = 0;
  filterTTimeCountYS.map((ttimecount) => {
    TtimecountYs += ttimecount.timeCount;
  });
  TtimecountYs = TtimecountYs + totalActTime;

  const calculatePercentage = (timecount) => {
    if (timecount == 0) return "0%";
    else return Math.round((timecount / Ttimecount) * 100);
  };

  const calculatePercentageYs = (timecount) => {
    if (timecount == 0) return "0%";
    else return Math.round((timecount / TtimecountYs) * 100);
  };

  let desired_output1 = (subjects) => {
    let unique_values = [...new Set(subjects.map((element) => element.name))];
    return unique_values;
  };
  subjectlist = desired_output1(filteredSubjects);
  console.log(subjectlist);

  let subjectlist2 = [];
  let desired_output2 = (filteredSubjects) => {
    let unique_values = [
      ...new Set(filteredSubjects.map((element) => element.id.toString())),
    ];
    return unique_values;
  };
  subjectlist2 = desired_output2(filteredSubjects);

  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };
  const filteredData = filterStudent.filter((item) =>
    item.fullname?.toLowerCase().includes(searchText.toLowerCase())
  );

  const generateExcel = () => {
    const headers = [
      "Roll No",
      "Name",
      ...subjectlist,
      "Activity",
      "အတန်းတက်ချိန် စုစုပေါင်း",
      "နှစ်စမှယခုလအထိ အတန်းချိန်စုစုပေါင်း",
      "အတန်းတက်ချိန် စုစုပေါင်းရာခိုင်နှုန်း",
      "နှစ်စမှယခုလအထိကျောင်းတက်ရာခိုင်နှုန်း",
    ];

    const data = [
      [
        "TotalTime Must have",
        "",
        ...subjectlist.map((sub) => {
          const matchingGroupTTime = groupTTime.find(
            (item) => item.subject.name === sub
          );
          const timeCount = matchingGroupTTime
            ? matchingGroupTTime.timeCount
            : 0;
          return timeCount;
        }),
        Number(totalActTime),
        Number(Ttimecount),
        Number(TtimecountYs),
        "100%",
        "100%",
      ],

      ...filteredData.map((student) => {
        const rowData = [
          student.rollno,
          student.fullname,

          ...subjectlist2.map((subject) => {
            const matchingAttendance = groupItems3.find((atten) => {
              const hasMatchingStudent = atten.student_id === student.id;
              const hasMatchingSubject = atten.subject_id.includes(subject);

              console.log("Student ID:", atten.student_id);
              console.log("Subject ID:", atten.subject_id);
              console.log("Has Matching Student:", hasMatchingStudent);
              console.log("Has Matching Subject:", hasMatchingSubject);

              return hasMatchingStudent && hasMatchingSubject;
            });

            console.log(matchingAttendance);

            if (matchingAttendance) {
              if (Array.isArray(matchingAttendance.timecount)) {
                // Convert the comma-separated string to an array of numbers
                const timecountArray = matchingAttendance.timecount.map(Number);
                const timecountIndex =
                  matchingAttendance.subject_id.indexOf(subject);

                return timecountIndex !== -1
                  ? timecountArray[timecountIndex]
                  : 0;
              } else {
                // Handle non-array case if needed
                return parseInt(matchingAttendance.timecount) || 2; // Default to 2 if timecount is falsy
              }
            } else {
              return 0;
            }
          }),

          totalActTime,
          groupItems.find((item) => item.student_id === student.id)
            ?.timecount || 0,
          groupItemsYS.find((item) => item.student_id === student.id)
            ?.timecount || 0,
          calculatePercentage(
            groupItems.find((item) => item.student_id === student.id)
              ?.timecount || 0
          ),
          calculatePercentageYs(
            groupItems.find((item) => item.student_id === student.id)
              ?.timecount || 0
          ),
        ];

        return rowData;
      }),
    ];

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance Data");

    // Generate a blob from the Excel workbook and save it as a file
    XLSX.writeFile(workbook, "attendance_data.xlsx");
  };

  const formSelect = `form-select ${classes.formSelect}`;
  return (
    <div class="main-panel">
      <div
        className="container"
        style={{
          width: "100%",
          height: "100%",
          padding: "50px",
          background: "whitesmoke",
        }}
      >
        <center>
          <h1 class={classes.mainTitle}>
            {" "}
            Monthly Attendance For All Subjects
          </h1>
        </center>
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

            {/* <div class="col">
              <button
                className={classes.color1}
                onClick={generateExcel}
                div
                style={{ float: "right" }}
              >
                <i class="mdi mdi-file-excel"></i>&nbsp;&nbsp;Export Excel
              </button>
            </div> */}
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
            <button
              className={classes.color1}
              onClick={generateExcel}
              div
              style={{ float: "right" }}
            >
              <i class="mdi mdi-file-excel"></i>&nbsp;&nbsp;Export Excel
            </button>
          </div>
          <table
            // id="example"
            class="display table table-bordered table-hover w-100"
          >
            <thead
              style={{
                background: "#040738",
                color: "#b9fefe",
              }}
            >
              <tr>
                <th>Roll No</th>
                <th>Name</th>
                {subjectlist.map((name) => (
                  <th className={classes.verTable}>{name}</th>
                ))}
                <th className={classes.verTable}>Activity</th>
                <th className={classes.verTable}>အတန်းတက်ချိန် စုစုပေါင်း</th>
                <th className={classes.verTable}>
                  နှစ်စမှယခုလအထိ အတန်းချိန်စုစုပေါင်း
                </th>
                <th className={classes.verTable}>
                  အတန်းတက်ချိန် စုစုပေါင်းရာခိုင်နှုန်း
                </th>
                <th className={classes.verTable}>
                  နှစ်စမှယခုလအထိကျောင်းတက်ရာခိုင်နှုန်း
                </th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ background: "rgba(47, 222, 245, 0.3)" }}>
                <td colspan="2" className="text-center fw-bold">
                  TotalTime Must have
                </td>
                {/* <td></td> */}
                {subjectlist.map((sub, i) => {
                  const matchingGroupTTime = groupTTime.find(
                    (item) => item.subject.name === sub
                  );
                  const timeCount = matchingGroupTTime
                    ? matchingGroupTTime.timeCount
                    : 0;
                  return <td key={i}>{timeCount}</td>;
                })}

                <td>{totalActTime}</td>
                <td>{Ttimecount}</td>
                <td>{TtimecountYs}</td>
                <td>100%</td>
                <td>100%</td>
              </tr>
              {filteredData.map((student) => (
                <tr>
                  <td>{student.rollno}</td>
                  <td>{student.fullname}</td>
                  {CheckedList.includes(student.id) &&
                    groupItems3.map((atten) => {
                      if (atten?.student_id == student.id) {
                        if (Array.isArray(atten?.timecount)) {
                          return subjectlist2.map((dd, i) => {
                            if (atten.subject_id?.includes(dd)) {
                              return atten.subject_id.map((ddd, i) => {
                                if (dd == ddd) {
                                  return <td>{atten.timecount[i]}</td>;
                                }
                              });
                            } else {
                              return <td>0</td>;
                            }
                          });
                        } else {
                          return subjectlist2.map((dd1) => {
                            if (atten.subject_id === dd1) {
                              return <td>{atten.timecount}</td>;
                            } else {
                              return <td>0</td>;
                            }
                          });
                        }
                      }
                    })}
                  {!CheckedList.includes(student.id) &&
                    subjectlist2.map((dd) => {
                      return <td>0</td>;
                    })}

                  <td>{totalActTime}</td>
                  {CheckedList.includes(student.id) &&
                    groupItems.map((att) => {
                      if (att.student_id == student?.id) {
                        return <td>{att.timecount}</td>;
                      }
                    })}
                  {!CheckedList.includes(student.id) && <td>{totalActTime}</td>}
                  {CheckedList.includes(student.id) &&
                    groupItemsYS.map((att) => {
                      if (att.student_id == student.id) {
                        return <td>{att.timecount}</td>;
                      }
                    })}
                  {!CheckedList.includes(student.id) && <td>{totalActTime}</td>}

                  {CheckedList.includes(student.id) &&
                    groupItems.map((att) => {
                      if (att.student_id == student.id) {
                        return (
                          <td
                            style={{
                              background:
                                calculatePercentage(att.timecount) >= 75
                                  ? "white"
                                  : "rgba(247, 85, 77, 0.4)",
                              fontWeight: "bold",
                            }}
                          >
                            {calculatePercentage(att.timecount)}%
                          </td>
                        );
                      }
                    })}
                  {!CheckedList.includes(student.id) && (
                    <td>{calculatePercentage(totalActTime)}%</td>
                  )}
                  {/* {CheckedList.includes(student.id) &&
                    groupItemsYS.map((att) => {
                      if (att.student_id == student.id) {
                        return <td>{calculatePercentageYs(att.timecount)}</td>;
                      }
                    })}
                  {!CheckedList.includes(student.id) && (
                    <td>{calculatePercentageYs(totalActTime)}</td>
                  )} */}

                  {CheckedList.includes(student.id) &&
                    groupItemsYS.map((att) => {
                      if (att.student_id == student.id) {
                        return (
                          <td
                            style={{
                              background:
                                calculatePercentageYs(att.timecount) >= 75
                                  ? "white"
                                  : "rgba(247, 85, 77, 0.4)",
                              fontWeight: "bold",
                            }}
                          >
                            {" "}
                            {calculatePercentageYs(att.timecount)}%
                          </td>
                        );
                      }
                    })}
                  {!CheckedList.includes(student.id) && (
                    <td>{calculatePercentageYs(totalActTime)}%</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceListingbyMonthlyAll;
