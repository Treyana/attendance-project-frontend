import React from "react";
import { fetchStudents, selectStudentById } from "./studentSlice";
import classes from "./StudentDetail.module.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchClasses } from "../class/classSlice";
import { getRoles } from "../login/authSlice";

const StudentDetail = () => {
  const { studentId } = useParams();
  console.log(studentId);
  const student = useSelector((state) =>
    selectStudentById(state, Number(studentId))
  );

  const getRole = useSelector(getRoles);
  console.log(student);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchClasses());
    dispatch(fetchStudents());
  }, [dispatch]);

  return (
    <div className={classes.all}>
      <div className={classes.wrapper}>
        <h2>{student.fullname}</h2>
        <div className={classes.row}>
          <div className={classes.col}>
            <div className={classes.col}>
              <div className={classes.inputGroup}>
                <div className={classes.inputBox}>
                  <span className="fw-bold">Ph No :</span> {student.phno}
                </div>
              </div>

              <div className={classes.inputGroup}>
                <div className={classes.inputBox}>
                  <span className="fw-bold">Email :</span> {student.username}
                </div>
              </div>

              <div className={classes.inputGroup}>
                <div className={classes.inputBox}>
                  <span className="fw-bold">Address : </span>
                  {student.address}
                </div>
              </div>
              <div className={classes.inputGroup}>
                <div className={classes.inputBox}>
                  <span className="fw-bold"> NRC :</span>
                  {student.nrc}
                </div>
              </div>
              {/* <div className={classes.inputGroup}>
                 Date Of Birth : {student.dob}
                </div> */}

              <div className={classes.inputGroup}>
                <div className={classes.inputBox}>
                  <span className="fw-bold"> Gender </span>: {student.gender}
                </div>
              </div>
            </div>
            <br />

            <div className={classes.inputGroup}>
              <div className={classes.inputBox}>
                {getRole == "ROLE_ADMIN" ? (
                  <Link to="/admin/allstudents">
                    <button type="submit" className={classes.btn}>
                      Back
                    </button>
                  </Link>
                ) : (
                  <Link to="/user/allstudents">
                    <button type="submit" className={classes.btn}>
                      {" "}
                      Back
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;
