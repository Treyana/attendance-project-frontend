import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import classes from "../admin/Home.module.css";

const UserHome = () => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <div class="main-panel">
      <div
        class="content-wrapper"
        style={{
          background:
            "linear-gradient(0deg, rgba(0,30,36,1) 0%, rgba(9,121,118,1) 0%, rgba(0,255,239,0.12666316526610644) 93%)",
        }}
      >
        <div class="d-xl-flex justify-content-between align-items-start">
          <h2 class="font-weight-bold mb-5" style={{ color: "#160158" }}>
            Welcome To,
          </h2>
        </div>
        <div className={classes.typewriter}>
          <h1 className="display-1 text-center font-weight-bold mt-4">
            {" "}
            "Student Attendance System"
          </h1>
        </div>
        {/* <h1 className="display-1 text-center font-weight-bold mt-4">
          "Student Attendance System"
        </h1> */}
        <h2 className="display-3 text-center  mt-4">For IT Department</h2>
        <h4 className=" display-5 text-center mt-5">
          Developed By Group III & Supervised By Dr. Pye Pye Aung
        </h4>
        <center>
          <button className={classes.btnModal} onClick={toggleModal}>
            About Us
          </button>
        </center>
        {modal && (
          <div className={classes.modal}>
            <div onClick={toggleModal} className={classes.overlay}></div>
            <div className={classes.modalContent}>
              <h2>About Project</h2>
              <p className="mt-3">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A student
                attendance system is one of the most important systems in our
                society. By monitoring attendance, teachers may keep an eye on
                and know the situations of their students. The process of
                manually taking attendance has always been a challenging and
                time-consuming task. This proposed project is designed to
                eliminate the conventional manual methods of taking attendance,
                which are time-consuming and prone to errors. The Recorded data
                is no longer kept on paper securely, and all of the data is
                immediately entered into the computer right away, where it is
                instantly converted into reports in Excel format. This project
                will also help calculate the overall attendance percentage and
                generate adaptable reports. This project is developed by using
                Java programming language, ReactJS, and MySQL database.
              </p>
              <p>
                <h2>Member Lists</h2>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This
                project is developed by fifth-year students from the Information
                Technology Engineering Department, Technological University
                (Mandalay) under the supervision of Dr. Pye Pye Aung :{" "}
                <ol>
                  <li>Ma Thiri Maung Win</li>
                  <li>Ma Moe Ma Ma Aung</li>
                  <li>Ma Phyu Phyu Phway</li>
                  <li>Ma Chaw Yu Mon</li>
                  <li>Mg Htet Myint Kyaw</li>
                </ol>
              </p>
              <button className={classes.closeModal} onClick={toggleModal}>
                <i className="mdi mdi-window-close fa-lg"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserHome;
