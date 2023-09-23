import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTeacherById, updateTeachers } from "./teacherSlice";
import classes from "./TeacherForm.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const EditTeacherForm = () => {
  const { teacherId } = useParams();
  console.log("TeacherId : " + teacherId);
  const teachers = useSelector((state) =>
    selectTeacherById(state, Number(teacherId))
  );
  console.log(teachers);

  const [id] = useState(teachers.id);
  const [fullname, setFullname] = useState(teachers.fullname);
  const [password, setPassword] = useState(teachers.password);
  const [phno, setPhno] = useState(teachers.phno);
  const [username, setUsername] = useState(teachers.username);
  const [position, setPosition] = useState(teachers.position);
  const [nrc, setNrc] = useState(teachers.nrc);
  const [gender, setGender] = useState(teachers.gender);
  const [status, setStatus] = useState(teachers.status);

  const [updateRequestStatus, setUpdateRequestStatus] = useState("idle");

  const onFullnameChange = (e) => setFullname(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);
  const onPhnoChange = (e) => setPhno(e.target.value);
  const onUsernameChange = (e) => setUsername(e.target.value);
  const onPositionChange = (e) => setPosition(e.target.value);
  const onNrcChange = (e) => setNrc(e.target.value);
  const onGenderChange = (e) => setGender(e.target.value);
  const onStatusChange = (e) => setStatus(e.target.value);

  const canSave =
    [id, fullname, phno, username, position, nrc, gender, status].every(
      Boolean
    ) && updateRequestStatus === "idle";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();

    if (canSave) {
      try {
        setUpdateRequestStatus("pending");

        dispatch(
          updateTeachers({
            id,
            fullname,
            password,
            phno,
            username,
            position,
            nrc,
            gender,
            status,
          })
        );
      } catch (error) {
        console.log(error);
      } finally {
        setUpdateRequestStatus("idle");
      }

      setFullname("");
      setPhno("");
      setUsername("");
      // setQualification('')
      setPosition("");
      setNrc("");
      // setDob('')
      setGender("");

      navigate("/admin/teacher");
    }
  };

  return (
    // <div class="main-panel">
    //   <div class="content-wrapper">
    <div
      style={{
        width: "79%",
        padding: "50px",
        background: "whitesmoke",
      }}
    >
      <div>
        <Link to="/admin/teacher">
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
        <p className={classes.title}>Update Teacher</p>

        <input
          type="text"
          placeholder="FullName"
          className={classes.Forminput}
          value={fullname}
          onChange={onFullnameChange}
          id="fullName"
        />
        <label className={classes.Formlabel}>Fullname</label>

        <input
          type="password"
          className={classes.Forminput}
          value={password}
          onChange={onPasswordChange}
          readOnly
        />
        <label className={classes.Formlabel}>Password</label>

        <input
          type="text"
          placeholder="Phone No"
          className={classes.Forminput}
          value={phno}
          onChange={onPhnoChange}
        />
        <label className={classes.Formlabel}>Phone No</label>

        <input
          type="email"
          placeholder="Email"
          className={classes.Forminput}
          value={username}
          onChange={onUsernameChange}
        />
        <label className={classes.Formlabel}>Email</label>
        {/* 
            <label>
              <input type="text" className={classes.input} value={qualification} onChange={onQualificationChange}/>
              <span>Qualification</span>
            </label> */}
        <input
          type="text"
          className={classes.Forminput}
          value={status}
          onChange={onStatusChange}
          readOnly
        />
        <label className={classes.Formlabel}>Status</label>

        <input
          type="text"
          placeholder="Position"
          className={classes.Forminput}
          value={position}
          onChange={onPositionChange}
        />
        <label className={classes.Formlabel}>Position</label>

        <input
          type="text"
          placeholder="NRC No"
          className={classes.Forminput}
          value={nrc}
          onChange={onNrcChange}
        />
        <label className={classes.Formlabel}>NRC No.</label>

        {/* <label>
              <input type="date" className={classes.input} value={dob} onChange={onDobChange}/>
              <span>Date Of Birth</span>
            </label> */}

        <div style={{ width: "80%" }}>
          <select
            className={classes.FormSelect}
            value={gender}
            onChange={onGenderChange}
          >
            <option className="text-center">Choose Gender</option>
            <option className="text-center" value="Male">
              Male
            </option>
            <option className="text-center" value="Female">
              Female
            </option>
          </select>
        </div>
        <center>
          <button className={classes.send}>
            <i class="mdi mdi-file-check btn-icon-prepend"></i> UPDATE
          </button>
        </center>
      </form>
    </div>
    // </div>
  );
};

export default EditTeacherForm;
