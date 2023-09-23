import { Link } from "react-router-dom";
import classes from "../teacher/TeacherForm.module.css";
import React from "react";
export const AddActivityButton = () => {
  return (
    <React.Fragment>
      <Link to="/admin/create-activity">
        <button className={classes.color1}>
          <i class="fas fa-plus fa-sm"></i> Activity
        </button>
      </Link>
    </React.Fragment>
  );
};
