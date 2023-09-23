import React from "react";
import classes from "../teacher/TeacherForm.module.css";
import { Link } from "react-router-dom";
const CreateSemesterButton = () => {
  return (
    <React.Fragment>
      <Link to="/admin/create-semester">
        <button className={classes.color1}>
          <i class="fas fa-plus fa-sm"></i> Semester
        </button>
      </Link>
    </React.Fragment>
  );
};

export default CreateSemesterButton;
