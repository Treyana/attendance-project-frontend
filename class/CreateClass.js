import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createClass } from "./classSlice";
import classes from "../teacher/TeacherForm.module.css";

const CreateClass = () => {
  const [codeNo, setCodeNo] = useState("");
  const [name, setClassName] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const onCodenoChange = (e) => setCodeNo(e.target.value);
  const onClassNameChange = (e) => setClassName(e.target.value);
  const canSave = [codeNo, name].every(Boolean) && addRequestStatus === "idle";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();

    if (canSave) {
      try {
        setAddRequestStatus("pending");

        dispatch(
          createClass({
            codeNo,
            name,
          })
        );
      } catch (error) {
        console.log(error);
      } finally {
        setAddRequestStatus("idle");
      }
      setCodeNo("");
      setClassName("");

      navigate(`/admin/allclasses`);
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
        <Link to="/admin/allclasses">
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
        <p className={classes.title}>Create Class</p>
        <input
          type="text"
          placeholder="Code No"
          className={classes.Forminput}
          value={codeNo}
          onChange={onCodenoChange}
          required
        />
        <label className={classes.Formlabel}>Code No</label>

        <div style={{ width: "80%", marginBottom: "10px" }}>
          <select
            className={classes.FormSelect}
            value={name}
            onChange={onClassNameChange}
            required
          >
            <option className="text-center">Choose Class</option>
            <option className="text-center" value="FirstYear">
              FirstYear
            </option>
            <option className="text-center" value="SecondYear_1stSem">
              SecondYear_1stSem
            </option>
            <option className="text-center" value=" SecondYear_2ndSem">
              SecondYear_2ndSem
            </option>
            <option className="text-center" value="ThirdYear">
              ThirdYear
            </option>
            <option className="text-center" value="FourthYear">
              FourthYear
            </option>
            <option className="text-center" value="FifthYear">
              FifthYear
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

export default CreateClass;
