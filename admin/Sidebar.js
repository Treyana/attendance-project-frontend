import { getRoles } from "@testing-library/react";
import { fn } from "jquery";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { getToken, logout } from "../login/authSlice";

const Sidebar = () => {
  const token = useSelector(getToken);

  const loginUser = useSelector((state) => state.auths.user);
  console.log(loginUser);

  const fullName = loginUser?.fullname;
  console.log("FUllName" + fullName);

  const dispatch = useDispatch();
  let adminAccountItem = "";

  if (token) {
    adminAccountItem = (
      <Link
        to="/"
        className="text-light"
        onClick={() => {
          dispatch(logout());
        }}
      >
        Log out
      </Link>
    );
  }

  return (
    <div>
      <div class="container-scroller">
        <nav class="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
          <div class="text-center navbar-brand-wrapper  align-items-center justify-content-center">
            <a class="navbar-brand brand-logo" href="/admin">
              <h5 className="mt-2" style={{ color: "#b9fefe" }}>
                <i class="fas fa-university" style={{ fontSize: "30px" }}></i>
                &nbsp;Attendance System
              </h5>
            </a>

            <a className="navbar-brand brand-logo-mini" href="/admin">
              <h5 className="mt-2" style={{ color: "#b9fefe" }}>
                <i class="fas fa-university" style={{ fontSize: "30px" }}></i>
              </h5>
            </a>
          </div>

          <div className="navbar-menu-wrapper d-flex align-items-stretch">
            {/* sidebar toggle*/}
            {/* <button
              class="navbar-toggler  align-self-center"
              type="button"
              data-toggle="minimize"
            >
              <span
                class="mdi mdi-menu"
                style={{ fontSize: "20px", color: "#160158" }}
              ></span>
            </button> */}

            <ul className="navbar-nav navbar-nav-right">
              <li class="nav-item nav-profile dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  id="profileDropdown"
                  href="#"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div class="nav-profile-img">
                    <img
                      src="../assets/images/faces-clipart/pic-2.png"
                      alt="image"
                    />
                  </div>
                  <div class="nav-profile-text">
                    <p class="mb-1" style={{ color: "#160158" }}>
                      {fullName}
                    </p>
                  </div>
                </a>
                <div
                  class="dropdown-menu navbar-dropdown dropdown-menu-right p-0 border-0 font-size-sm"
                  aria-labelledby="profileDropdown"
                  data-x-placement="bottom-end"
                >
                  <div class="p-2">
                    <h5
                      class="dropdown-header text-uppercase pl-2"
                      style={{ color: "#160158" }}
                    >
                      User Options
                    </h5>
                    <Link
                      class="dropdown-item py-1 d-flex align-items-center justify-content-between"
                      to="/admin/profile"
                      style={{ color: "#160158", textDecoration: "none" }}
                    >
                      <span>Profile</span>
                      <span class="p-0">
                        <i
                          class="mdi mdi-account-outline ml-1"
                          style={{ color: "#160158" }}
                        ></i>
                      </span>
                    </Link>
                    <h5
                      class="dropdown-header text-uppercase pl-2"
                      style={{ color: "#160158" }}
                    >
                      Actions
                    </h5>
                    <Link
                      class="dropdown-item py-1 d-flex align-items-center justify-content-between"
                      to="/"
                      onClick={() => {
                        dispatch(logout());
                      }}
                      // class="nav-link"
                      style={{ color: "#160158", textDecoration: "none" }}
                    >
                      <span>Log Out</span>

                      <i
                        class="mdi mdi-logout ml-1"
                        style={{ color: "#040738" }}
                      ></i>
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
            <button
              className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
              type="button"
              data-toggle="offcanvas"
            >
              <span class="mdi mdi-menu"></span>
            </button>
          </div>
        </nav>

        <div className="container-fluid page-body-wrapper">
          <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <ul class="nav">
              <li class="nav-item">
                <Link class="nav-link" to="/admin">
                  <span class="icon-bg">
                    <i class="mdi mdi-cube menu-icon"></i>
                  </span>
                  <span class="menu-title">Dashboard</span>
                </Link>
              </li>

              <li class="nav-item">
                {" "}
                <Link to="/admin/teacher" class="nav-link">
                  <span class="icon-bg">
                    <i class="fas fa-chalkboard-teacher menu-icon"></i>{" "}
                  </span>
                  <span class="menu-title">Teachers</span>
                </Link>
              </li>

              <li class="nav-item">
                {" "}
                <Link to="/admin/allstudents" class="nav-link">
                  <span class="icon-bg">
                    <i class="fas fa-user-graduate menu-icon"></i>{" "}
                  </span>
                  <span class="menu-title">Students</span>
                </Link>
              </li>

              <li class="nav-item">
                {" "}
                <Link to="/admin/allsubjects" class="nav-link">
                  <span class="icon-bg">
                    <i class="mdi mdi-book-open-page-variant menu-icon"></i>{" "}
                  </span>
                  <span class="menu-title">Subjects</span>
                </Link>
              </li>

              <li class="nav-item">
                {" "}
                <Link to="/admin/allclasses" class="nav-link">
                  <span class="icon-bg">
                    <i class="mdi mdi-blinds menu-icon"></i>{" "}
                  </span>
                  <span class="menu-title">Classes</span>
                </Link>
              </li>

              <li class="nav-item">
                {" "}
                <Link to="/admin/allsemesters" class="nav-link">
                  <span class="icon-bg">
                    <i class="mdi mdi-calendar-multiple menu-icon"></i>{" "}
                  </span>
                  <span class="menu-title">Semester</span>
                </Link>
              </li>

              <li class="nav-item">
                {" "}
                <Link to="/admin/allAccordion" class="nav-link">
                  <span class="icon-bg">
                    <i class="mdi mdi-table-large menu-icon"></i>{" "}
                  </span>
                  <span class="menu-title">Timetable</span>
                </Link>
              </li>

              <li class="nav-item">
                {" "}
                <Link to="/admin/alltimecount" class="nav-link">
                  <span class="icon-bg">
                    <i class="mdi mdi-clipboard menu-icon"></i>{" "}
                  </span>
                  <span class="menu-title">Subject Timecount</span>
                </Link>
              </li>

              <li class="nav-item">
                {" "}
                <Link to="/admin/activity" class="nav-link">
                  <span class="icon-bg">
                    <i class="mdi mdi-clipboard menu-icon"></i>{" "}
                  </span>
                  <span class="menu-title">Activity Timecount</span>
                </Link>
              </li>

              <li class="nav-item">
                {" "}
                <Link
                  to="/admin/attendancelisting-bymonthlyall"
                  class="nav-link"
                >
                  <span class="icon-bg">
                    <i class="mdi mdi-book-multiple menu-icon"></i>{" "}
                  </span>
                  <span class="menu-title">Attendance Records</span>
                </Link>
              </li>

              {/* <hr style={{ color: "white", border: "3px double" }} /> */}
              {/* <hr style={{ borderTop: "3px solid white" }} /> */}
              <div role="separator" class="dropdown-divider"></div>

              <li class="nav-item sidebar-user-actions">
                <div class="sidebar-user-menu">
                  <Link
                    to="/"
                    onClick={() => {
                      dispatch(logout());
                    }}
                    // class="menu-title"
                    class="nav-link"
                  >
                    <i
                      class="mdi mdi-logout menu-icon"
                      style={{ color: "#b9fefe" }}
                    ></i>{" "}
                    Logout{" "}
                  </Link>{" "}
                </div>
              </li>
            </ul>
          </nav>

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
