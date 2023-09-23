import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  fetchStudents,
  selectStudentById,
  updateStudents,
} from "./studentSlice";
import { useDispatch, useSelector } from "react-redux";
import classes from "../teacher/TeacherForm.module.css";
import { fetchClasses, getAllClasses } from "../class/classSlice";

const EditStudentForm = () => {
  const { studentId } = useParams();
  console.log("TeacherId : " + studentId);
  const students = useSelector((state) =>
    selectStudentById(state, Number(studentId))
  );
  console.log(students);

  const [id] = useState(students.id);
  const [fullname, setFullname] = useState(students.fullname);
  const [classId, setClassId] = useState(students.yearClass.id);
  const [rollno, setRollno] = useState(students.rollno);
  const [phno, setPhno] = useState(students.phno);
  const [address, setAddress] = useState(students.address);
  const [username, setUsername] = useState(students.username);
  // const [ fathername,setFathername ] = useState(students.fathername)
  const [nrc, setNrc] = useState(students.nrc);
  // const [ dob,setDob ] = useState(students.dob)
  const [gender, setGender] = useState(students.gender);

  const [updateRequestStatus, setUpdateRequestStatus] = useState("idle");

  const onFullnameChange = (e) => setFullname(e.target.value);
  const onRollnoChange = (e) => setRollno(e.target.value);
  const onPhnoChange = (e) => setPhno(e.target.value);
  const onAddressChange = (e) => setAddress(e.target.value);
  const onUsernameChange = (e) => setUsername(e.target.value);
  // const onFathernameChange = e => setFathername(e.target.value)
  const onNrcChange = (e) => setNrc(e.target.value);
  const onClassIdChange = (e) => setClassId(e.target.value);
  // const onDobChange = e => setDob(e.target.value)
  const onGenderChange = (e) => setGender(e.target.value);

  const canUpdate =
    [id, fullname, rollno, phno, address, username, nrc, gender, classId].every(
      Boolean
    ) && updateRequestStatus === "idle";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchClasses());
    dispatch(fetchStudents);
  }, []);

  const yearClasses = useSelector(getAllClasses);
  console.log("Class" + yearClasses);

  const onSubmit = (event) => {
    event.preventDefault();

    if (canUpdate) {
      try {
        setUpdateRequestStatus("pending");

        dispatch(
          updateStudents({
            id,
            fullname,
            rollno,
            phno,
            address,
            username,
            // fathername,
            nrc,
            // dob,
            gender,
            classId,
          })
        );
      } catch (error) {
        console.log(error);
      } finally {
        setUpdateRequestStatus("idle");
      }

      setFullname("");
      setRollno("");
      setPhno("");
      setAddress("");
      setUsername("");
      // setFathername('')
      setNrc("");
      // setDob('')
      setGender("");

      navigate("/admin/allstudents");
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
        <Link to="/admin/allstudents">
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
        <p className={classes.title}>Update Student</p>
        <select
          className={classes.Forminput}
          style={{ marginBottom: "35px" }}
          value={classId}
          onChange={onClassIdChange}
        >
          <option className="text-center" value="">
            Choose Class
          </option>

          {yearClasses.map((year) => (
            <option className="text-center" key={year.id} value={year.id}>
              <span> {year.name} </span>
            </option>
          ))}
        </select>

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
          type="text"
          className={classes.Forminput}
          value={rollno}
          onChange={onRollnoChange}
          placeholder="Roll No"
        />
        <label className={classes.Formlabel}>Roll No</label>

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

        <input
          type="text"
          placeholder="Address"
          className={classes.Forminput}
          value={address}
          onChange={onAddressChange}
        />
        <label className={classes.Formlabel}>Address</label>

        <input
          type="text"
          placeholder="NRC"
          className={classes.Forminput}
          value={nrc}
          onChange={onNrcChange}
        />
        <label className={classes.Formlabel}>NRC</label>

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
  );
};

export default EditStudentForm;
