import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  fetchSubjects,
  selectSubjectById,
  updateSubjects,
} from "./subjectSlice";
import classes from "../teacher/TeacherForm.module.css";
import { fetchTeachers, getAllTeachers } from "../teacher/teacherSlice";
import { fetchClasses, getAllClasses } from "../class/classSlice";

const EditSubjectForm = () => {
  const { subjectId } = useParams();
  console.log("SubjectId " + subjectId);
  const subjects = useSelector((state) =>
    selectSubjectById(state, Number(subjectId))
  );
  console.log(subjects);

  const [id] = useState(subjects.id);
  const [userId, setTeacher] = useState(subjects?.user.id);
  const [classId, setClass] = useState(subjects.yearClass.id);
  const [codeno, setCodeno] = useState(subjects.codeno);
  const [name, setName] = useState(subjects.name);
  const [updateRequestStatus, setUpdateRequestStatus] = useState("idle");

  const onCodenoChange = (e) => setCodeno(e.target.value);
  const onNameChange = (e) => setName(e.target.value);
  const onTeacherIdChange = (e) => setTeacher(e.target.value);
  const onClassIdChange = (e) => setClass(e.target.value);

  const canUpdate =
    [id, codeno, name, userId, classId].every(Boolean) &&
    updateRequestStatus === "idle";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const teachers = useSelector(getAllTeachers);
  const yearclasses = useSelector(getAllClasses);
  useEffect(() => {
    dispatch(fetchTeachers());
    dispatch(fetchSubjects());
    dispatch(fetchClasses());
  }, [dispatch]);

  const onSubmit = (event) => {
    event.preventDefault();

    if (canUpdate) {
      try {
        setUpdateRequestStatus("pending");

        dispatch(
          updateSubjects({
            id,
            codeno,
            name,
            userId,
            classId,
          })
        );
      } catch (error) {
        console.log(error);
      } finally {
        setUpdateRequestStatus("idle");
      }

      setCodeno("");
      setName("");
      navigate("/admin/allsubjects");
    }
  };

  return (
    <div
      style={{
        width: "79%",
        padding: "50px",
        background: "whitesmoke",
      }}
    >
      <div>
        <Link to="/admin/allsubjects">
          <button
            className={classes.color2}
            style={{ float: "right" }}
            type="button"
          >
            <i class="mdi mdi-arrow-left-bold btn-icon-prepend"></i>Back
          </button>
        </Link>
      </div>
      <form className={classes.form} onSubmit={onSubmit}>
        <p className={classes.title}>Edit Subject</p>
        {/* <div className={classes.flex}> */}

        <select
          style={{ width: "80%", marginBottom: "35px", marginTop: "10px" }}
          className={classes.FormSelect}
          value={userId}
          onChange={onTeacherIdChange}
        >
          <option className="text-center" value="">
            Choose Teacher
          </option>
          {teachers.map((a) => (
            <option className="text-center" key={a.id} value={a.id}>
              {a.fullname}
            </option>
          ))}
          ;
        </select>

        <select
          style={{ width: "80%", marginBottom: "35px" }}
          className={classes.FormSelect}
          value={classId}
          onChange={onClassIdChange}
        >
          <option className="text-center" value="">
            Choose Class
          </option>
          {yearclasses.map((a) => (
            <option className="text-center" key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
          ;
        </select>

        <input
          type="text"
          placeholder="Code No"
          className={classes.Forminput}
          value={codeno}
          onChange={onCodenoChange}
        />
        <label className={classes.Formlabel}>Code No</label>
        <input
          type="text"
          placeholder="Subject"
          className={classes.Forminput}
          value={name}
          onChange={onNameChange}
        />
        <label className={classes.Formlabel}>Subject</label>

        <center>
          <button className={classes.send} style={{ marginTop: "0px" }}>
            <i class="mdi mdi-file-check btn-icon-prepend"></i> Update
          </button>
        </center>
      </form>
    </div>
  );
};

export default EditSubjectForm;
