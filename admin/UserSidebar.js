import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { getToken, logout } from "../login/authSlice";

const UserSidebar = () => {
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
          <div
            class="navbar-menu-wrapper d-flex align-items-stretch"
            style={{
              color: "#b9fefe",
              background: "#040738",
              width: "100%",
              fontSize: "20px",
            }}
          >
            <div class="text-center navbar-brand-wrapper  align-items-center justify-content-center">
              <a class="navbar-brand brand-logo" href="/admin">
                <h5 className="mt-2" style={{ color: "#b9fefe" }}>
                  <i class="fas fa-university" style={{ fontSize: "30px" }}></i>
                  &nbsp;&nbsp;Attendance System
                </h5>
              </a>

              <a className="navbar-brand brand-logo-mini" href="/admin">
                <h5 className="mt-2" style={{ color: "#b9fefe" }}>
                  <i class="fas fa-university" style={{ fontSize: "30px" }}></i>
                </h5>
              </a>
            </div>
            <ul
              class="navbar-nav navbar-nav-right"
              style={{ marginLeft: "100px" }}
            >
              <li class="nav-item" style={{ marginLeft: "15px" }}>
                <Link class="nav-link" to="/user/home">
                  <span class="icon-bg">
                    <i class="mdi mdi mdi-home menu-icon p-2"></i>
                  </span>
                  <span class="menu-title">Home</span>
                </Link>
              </li>

              <li class="nav-item" style={{ marginLeft: "15px" }}>
                <Link class="nav-link" to="/user">
                  <span class="icon-bg">
                    <i class="mdi mdi-view-dashboard menu-icon p-2"></i>
                  </span>
                  <span class="menu-title">Dashboard</span>
                </Link>
              </li>

              <li class="nav-item" style={{ marginLeft: "15px" }}>
                <Link class="nav-link" to="/user/allstudents">
                  <span class="icon-bg">
                    <i class="mdi mdi-account-multiple-outline menu-icon p-2"></i>
                  </span>
                  <span class="menu-title">Student</span>
                </Link>
              </li>

              <li class="nav-item" style={{ marginLeft: "15px" }}>
                <Link class="nav-link" to="/user/allAccordion">
                  <span class="icon-bg">
                    <i class="mdi mdi-table-large menu-icon p-2"></i>{" "}
                  </span>
                  <span class="menu-title">Timetable</span>
                </Link>
              </li>

              <li class="nav-item dropdown" style={{ marginLeft: "15px" }}>
                <Link
                  class="nav-link dropdown-toggle"
                  id="attendanceDropdown"
                  href="#"
                  data-toggle="dropdown"
                  aria-expanded="false"
                  to="/user"
                >
                  <span class="icon-bg">
                    <i class="mdi mdi-pencil-box menu-icon p-2"></i>
                  </span>
                  <span class="menu-title">Attendance</span>
                </Link>
                <div
                  class="dropdown-menu navbar-dropdown dropdown-menu-right p-0 border-0 font-size-sm"
                  aria-labelledby="profileDropdown"
                  data-x-placement="bottom-end"
                >
                  <div class="p-2">
                    <Link
                      class="dropdown-item py-1 d-flex align-items-center justify-content-between nav-link"
                      to="/user/create-attendance"
                    >
                      {/* <Link to="/user/create-attendance" class="nav-link"> */}
                      <span class="menu-title">Take Attendance</span>
                      {/* </Link> */}
                    </Link>

                    <Link
                      class="dropdown-item py-1 d-flex align-items-center justify-content-between nav-link"
                      to="/user/updateAttendance"
                    >
                      <span class="menu-title">Update Attendance</span>
                    </Link>

                    <Link
                      class="dropdown-item py-1 d-flex align-items-center justify-content-between nav-link"
                      to="/user/attendancelisting-bydaily"
                    >
                      {/* <span>
                        <Link
                          to="/user/attendancelisting-bydaily"
                          class="nav-link"
                        > */}
                      <span class="menu-title">Daily Attendance</span>
                      {/* </Link>
                      </span> */}
                    </Link>

                    <Link
                      class="dropdown-item py-1 d-flex align-items-center justify-content-between nav-link"
                      to="/user/attendancelisting-bymonthly"
                    >
                      {/* <span>
                        <Link
                          to="/user/attendancelisting-bymonthly"
                          class="nav-link"
                        > */}
                      <span class="menu-title">Monthly Attendance</span>
                      {/* </Link>
                      </span> */}
                    </Link>

                    {/* <a
                      class="dropdown-item py-1 d-flex align-items-center justify-content-between"
                      href="#"
                    >
                      <span>
                        <Link
                          to="/user/attendancelisting-bymonthlyall"
                          class="nav-link"
                        >
                          <span class="menu-title">
                            All Subject Monthly Attendance
                          </span>
                        </Link>
                      </span>
                    </a> */}
                  </div>
                </div>
              </li>
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
                    <p class="mb-1" style={{ color: "#b9fefe" }}>
                      {fullName}
                    </p>
                  </div>
                </a>
                <div
                  class="dropdown-menu navbar-dropdown dropdown-menu-right p-0 border-0 font-size-sm"
                  aria-labelledby="profileDropdown"
                  data-x-placement="bottom-end"
                >
                  <div
                    class="p-3 text-center"
                    style={{ background: "#040738" }}
                  >
                    <img
                      class="img-avatar img-avatar48 img-avatar-thumb"
                      src="../assets/images/faces-clipart/pic-2.png"
                      alt=""
                    />
                  </div>
                  <div class="p-2">
                    <h5
                      class="dropdown-header text-uppercase pl-2"
                      style={{ color: "#160158" }}
                    >
                      User Options
                    </h5>

                    <Link
                      class="dropdown-item py-1 d-flex align-items-center justify-content-between"
                      to="/user/profile"
                    >
                      <span
                        style={{ color: "#160158", textDecoration: "none" }}
                      >
                        Profile
                      </span>
                      <span class="p-0">
                        {/* <span class="badge badge-primary">1</span> */}

                        <i
                          class="mdi mdi-account-outline ml-1"
                          style={{ color: "#160158" }}
                        ></i>
                      </span>
                    </Link>
                    <div role="separator" class="dropdown-divider"></div>
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
                    >
                      <span>
                        <Link
                          to="/"
                          onClick={() => {
                            dispatch(logout());
                          }}
                          // class="nav-link"
                          style={{ color: "#160158", textDecoration: "none" }}
                        >
                          Log Out
                        </Link>
                      </span>

                      <i
                        class="mdi mdi-logout ml-1"
                        style={{ color: "#160158" }}
                      ></i>
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
            <button
              class="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
              type="button"
              data-toggle="offcanvas"
            >
              <span class="mdi mdi-menu"></span>
            </button>
          </div>
        </nav>

        <div class="container-fluid page-body-wrapper">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
