import React from "react";
import classes from "../teacher/TeacherForm.module.css";
import { Link } from "react-router-dom";

const CreateTimeTableButton = () => {
  return (
    <React.Fragment>
      <Link to="/admin/create-timetable">
        <button className={classes.color1}>
          <i class="fas fa-plus fa-sm"></i> TimeTable
        </button>
      </Link>
    </React.Fragment>
  );
};

export default CreateTimeTableButton;
