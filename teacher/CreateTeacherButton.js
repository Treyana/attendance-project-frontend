import React from "react";
import classes from "./TeacherForm.module.css";
import { Link } from "react-router-dom";

const CreateTeacherButton = () => {
  // const color1 = `btn btn-inverse-success btn-fw ms-4 ${classes.color1}`;
  return (
    <React.Fragment>
      <Link to="/admin/create-teacher">
        <button className={classes.color1}>
          <i class="fas fa-plus fa-sm"></i>Teacher
        </button>
      </Link>
    </React.Fragment>
  );
};

export default CreateTeacherButton;
