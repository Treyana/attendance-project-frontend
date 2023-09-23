import React from "react";
import { selectTeacherById } from "./teacherSlice";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import classes from "../student/StudentDetail.module.css";

const TeacherDetail = () => {
  const { teacherId } = useParams();
  console.log("TeacherId" + teacherId);
  const teacher = useSelector((state) =>
    selectTeacherById(state, Number(teacherId))
  );
  console.log("Teacher" + teacher);
  return (
    <div className={classes.all}>
      <div className={classes.wrapper}>
        <h2>{teacher.fullname}</h2>
        <div className={classes.row}>
          <div className={classes.col}>
            <div className={classes.col}>
              <div className={classes.inputGroup}>
                <span className="fw-bold">Position :</span> {teacher.position}
              </div>

              <div className={classes.inputGroup}>
                {" "}
                <span className="fw-bold">NRC :</span>
                {teacher.nrc}
              </div>
              <div className={classes.inputGroup}>
                {" "}
                <span className="fw-bold">Ph No : </span>
                {teacher.phno}
              </div>

              <div className={classes.inputGroup}>
                <div className={classes.inputBox}>
                  <span className="fw-bold"> Gender :</span> {teacher.gender}
                </div>
              </div>
            </div>
            <br />

            {/* <div className={classes.inputGroup}>
              <div className={classes.inputBox}> */}
            <div className={classes.center}>
              <Link to="/admin/teacher" style={{ textDecoration: "none" }}>
                <button type="submit" className={classes.btn}>
                  Back
                </button>
              </Link>
            </div>
            {/* </div>
               </div> */}
            {/*<Link to="/admin/teacher">
                  <button className={classes.color2} type="button">
                    <i class="mdi mdi-arrow-left-bold btn-icon-prepend"></i>Back
                  </button>
                </Link>
              </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetail;
