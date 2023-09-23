import React from "react";
import classes from "../teacher/TeacherForm.module.css";
import { Link } from "react-router-dom";

const CreateSubjectButton = () => {
  return (
    <React.Fragment>
      <Link to="/admin/create-subject">
        <button className={classes.color1}>
          <i class="fas fa-plus fa-sm"></i> Subject
        </button>
      </Link>
    </React.Fragment>
  );
};

export default CreateSubjectButton;
