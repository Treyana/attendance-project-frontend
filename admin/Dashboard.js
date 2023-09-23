import React from "react";
import { fetchTeachers, getAllTeachers } from "../teacher/teacherSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubjects, getAllSubjects } from "../subject/subjectSlice";
import { fetchStudents, getAllStudents } from "../student/studentSlice";
import { fetchClasses, getAllClasses } from "../class/classSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchTeachers());
    dispatch(fetchSubjects());
    dispatch(fetchClasses());
  }, [dispatch]);

  const teachers = useSelector(getAllTeachers);
  console.log("All Teachers in Card" + teachers);
  const teacherCount = Object.keys(teachers).length;
  console.log("All Teacher     length in Card" + teacherCount);

  const subjects = useSelector(getAllSubjects);
  const subjectCount = Object.keys(subjects).length;

  const students = useSelector(getAllStudents);
  const studentCount = Object.keys(students).length;

  const classes = useSelector(getAllClasses);
  const classCount = Object.keys(classes).length;
  return (
    // <div class=" main-panel">
    //   <div class="content-wrapper">
    <div
      style={{
        width: "79%",
        padding: "50px",
        background: "whitesmoke",
      }}
    >
      <div class="d-xl-flex justify-content-between align-items-start">
        <h2 class=" font-weight-bold mb-2"> Overview Dashboard </h2>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="d-sm-flex justify-content-between align-items-center transaparent-tab-border {">
            <ul class="nav nav-tabs tab-transparent" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  id="business-tab"
                  data-toggle="tab"
                  href="#business-1"
                  role="tab"
                  aria-selected="false"
                >
                  Counting
                </a>
              </li>
            </ul>
            <div class="d-md-block d-none">
              <a href="#" class="text-light p-1">
                <i class="mdi mdi-view-dashboard"></i>
              </a>
              <a href="#" class="text-light p-1">
                <i class="mdi mdi-dots-vertical"></i>
              </a>
            </div>
          </div>
          <div class="tab-content tab-transparent-content">
            <div
              class="tab-pane fade show active"
              id="business-1"
              role="tabpanel"
              aria-labelledby="business-tab"
            >
              <div class="row">
                <div class="col-xl-3 col-lg-6 col-sm-6 grid-margin stretch-card ">
                  <div class="card card1">
                    <Link
                      to="/admin/teacher"
                      class="card-body text-center"
                      style={{ textDecoration: "none" }}
                    >
                      <h5 class="mb-2 text-dark font-weight-normal">
                        Teachers
                      </h5>
                      <br />
                      <div class="dashboard-progress dashboard-progress-1 d-flex align-items-center justify-content-center item-parent">
                        <i
                          class="fas fa-chalkboard-teacher absolute-center text-dark"
                          style={{ fontSize: "25px" }}
                        ></i>
                      </div>
                      <br />
                      <h3 class="mb-0 font-weight-bold mt-2 text-dark">
                        {teacherCount}
                      </h3>
                    </Link>
                  </div>
                </div>
                <div class="col-xl-3 col-lg-6 col-sm-6 grid-margin stretch-card">
                  <div class="card card2">
                    <Link
                      to="/admin/allstudents"
                      class="card-body text-center"
                      style={{ textDecoration: "none" }}
                    >
                      <h5 class="mb-2 text-dark font-weight-normal">
                        Students
                      </h5>
                      <br />
                      <div class="dashboard-progress dashboard-progress-1 d-flex align-items-center justify-content-center item-parent">
                        <i
                          class="fas fa-user-graduate absolute-center text-dark"
                          style={{ fontSize: "25px" }}
                        ></i>
                      </div>
                      <br />
                      <h3 class="mb-0 font-weight-bold mt-2 text-dark">
                        {studentCount}
                      </h3>
                    </Link>
                  </div>
                </div>
                <div class="col-xl-3 col-lg-6 col-sm-6 grid-margin stretch-card">
                  <div class="card card3">
                    <Link
                      to="/admin/allsubjects"
                      class="card-body text-center"
                      style={{ textDecoration: "none" }}
                    >
                      <h5 class="mb-2 text-dark font-weight-normal">
                        Subjects
                      </h5>
                      <br />
                      <div class="dashboard-progress dashboard-progress-2 d-flex align-items-center justify-content-center item-parent">
                        <i
                          class="fas fa-book-open icon-md absolute-center text-dark"
                          style={{ fontSize: "25px" }}
                        ></i>
                      </div>
                      <br />
                      <h3 class="mb-0 font-weight-bold mt-2 text-dark">
                        {subjectCount}
                      </h3>
                    </Link>
                  </div>
                </div>

                <div class="col-xl-3 col-lg-6 col-sm-6 grid-margin stretch-card">
                  <div class="card card4">
                    <Link
                      to="/admin/allclasses"
                      class="card-body text-center"
                      style={{ textDecoration: "none" }}
                    >
                      <h5 class="mb-2 text-dark font-weight-normal">Classes</h5>
                      <br />
                      <div class="dashboard-progress dashboard-progress-4 d-flex align-items-center justify-content-center item-parent">
                        <i class="mdi mdi-cube icon-md absolute-center text-dark"></i>
                      </div>
                      <br />
                      <h3 class="mb-0 font-weight-bold mt-2 text-dark">
                        {classCount}
                      </h3>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}

      <footer class="footer">
        <div class="footer-inner-wraper">
          <div class="d-sm-flex justify-content-center justify-content-sm-between">
            <span class="text-muted d-block text-center text-sm-left d-sm-inline-block">
              Created by Group III © 2023
            </span>
            <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">
              {" "}
              Student Attendance for 5th year IT
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
