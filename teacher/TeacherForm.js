import React from "react";
import classes from "./TeacherForm.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createTeachers } from "./teacherSlice";
import { sendEmail } from "../email/emailSlice";

const TeacherForm = () => {
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [phno, setPhno] = useState("");
  const [username, setUsername] = useState("");
  const [position, setPosition] = useState("");
  const [nrc, setNrc] = useState("");
  const [gender, setGender] = useState("");

  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const onFullnameChange = (e) => setFullname(e.target.value);
  const onPasswordChange = () => {
    const length = 8;
    const charset = "000000000000000000000000000000";
    let result = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      result += charset.charAt(randomIndex);
    }

    setPassword(result);
  };

  const onPhnoChange = (e) => setPhno(e.target.value);
  const onUsernameChange = (e) => setUsername(e.target.value);
  const onPositionChange = (e) => setPosition(e.target.value);
  const onNrcChange = (e) => setNrc(e.target.value);
  const onGenderChange = (e) => setGender(e.target.value);

  const canSave =
    [fullname, password, phno, username, position, nrc, gender].every(
      Boolean
    ) && addRequestStatus === "idle";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();

    if (canSave) {
      try {
        setAddRequestStatus("pending");

        dispatch(
          createTeachers({
            fullname,
            password,
            phno,
            username,
            position,
            nrc,
            gender,
          })
        );
        console.log("sendEmail" + sendEmail);
      } catch (error) {
        console.log(error);
      } finally {
        setAddRequestStatus("idle");
      }

      setFullname("");
      setPassword("");
      setPhno("");
      setUsername("");
      setPosition("");
      setNrc("");
      setGender("");

      navigate("/admin/teacher");
    }
  };
  // const color2 = `btn btn-inverse-success ${classes.color2}`;
  return (
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
        <p className={classes.title}>Create Teacher</p>
        <input
          type="text"
          placeholder="FullName"
          className={classes.Forminput}
          value={fullname}
          onChange={onFullnameChange}
          id="fullName"
          required
        />
        <label className={classes.Formlabel}>Fullname</label>

        <input
          type="password"
          placeholder="Password"
          className={classes.Forminput}
          value={password}
          onChange={onPasswordChange}
          required
        />
        <label className={classes.Formlabel}>Password</label>

        <input
          type="text"
          placeholder="Phone No"
          className={classes.Forminput}
          value={phno}
          onChange={onPhnoChange}
          required
        />
        <label className={classes.Formlabel}>Phone No</label>

        <input
          type="email"
          placeholder="Email"
          className={classes.Forminput}
          value={username}
          onChange={onUsernameChange}
          required
        />
        <label className={classes.Formlabel}>Email</label>

        <input
          type="text"
          placeholder="Position"
          className={classes.Forminput}
          value={position}
          onChange={onPositionChange}
          required
        />
        <label className={classes.Formlabel}>Position</label>

        <input
          type="text"
          placeholder="NRC No"
          className={classes.Forminput}
          value={nrc}
          onChange={onNrcChange}
          required
        />
        <label className={classes.Formlabel}>NRC No.</label>

        <div style={{ width: "80%" }}>
          <select
            className={classes.FormSelect}
            value={gender}
            onChange={onGenderChange}
            required
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
            <i class="mdi mdi-file-check btn-icon-prepend"></i> Create
          </button>
        </center>
      </form>
    </div>
  );
};

export default TeacherForm;
