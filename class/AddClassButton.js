import { Link } from "react-router-dom";
import classes from "../teacher/TeacherForm.module.css";
import React from "react";
export const AddClassButton = () => {
  return (
    <React.Fragment>
      <Link to="/admin/create-class">
        <button className={classes.color1}>
          <i class="fas fa-plus fa-sm"></i> Class
        </button>
      </Link>
    </React.Fragment>
  );
};
