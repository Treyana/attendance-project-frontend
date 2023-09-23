import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { selectClassById, updateClass } from "./classSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import style from "../teacher/TeacherForm.module.css";

const UpdateClass = () => {
  const { classId } = useParams();
  console.log("TeacherId : " + classId);
  const classes = useSelector((state) =>
    selectClassById(state, Number(classId))
  );
  console.log(classes);

  const [id] = useState(classes.id);
  const [codeNo, setCodeNo] = useState(classes.codeNo);
  const [name, setClassName] = useState(classes.name);

  const [updateRequestStatus, setUpdateRequestStatus] = useState("idle");

  const onCodeNoChange = (e) => setCodeNo(e.target.value);
  const onClassNameChange = (e) => setClassName(e.target.value);
  const canSave =
    [id, codeNo, name].every(Boolean) && updateRequestStatus === "idle";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();

    if (canSave) {
      try {
        setUpdateRequestStatus("pending");

        dispatch(
          updateClass({
            id,
            codeNo,
            name,
          })
        );
      } catch (error) {
        console.log(error);
      } finally {
        setUpdateRequestStatus("idle");
      }

      navigate("/admin/allclasses");
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
        <Link to="/admin/allclasses">
          <button
            className={style.color2}
            style={{ float: "right" }}
            type="button"
          >
            <i class="mdi mdi-arrow-left-bold btn-icon-prepend"></i>Back
          </button>
        </Link>
      </div>
      <form className={style.form} onSubmit={onSubmit}>
        <p className={style.title} style={{ marginBottom: "25px" }}>
          Update Class
        </p>
        <input
          type="text"
          placeholder="Code No"
          className={style.Forminput}
          value={codeNo}
          onChange={onCodeNoChange}
        />
        <label className={style.Formlabel}>Code No</label>

        <div style={{ width: "80%", marginBottom: "10px" }}>
          <select
            className={style.FormSelect}
            value={name}
            onChange={onClassNameChange}
          >
            <option className="text-center">Choose Class</option>
            <option className="text-center" value="FirstYear">
              FirstYear
            </option>
            <option className="text-center" value="SecondYear">
              SecondYear
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
          <button className={style.send}>UPDATE</button>
        </center>
      </form>
    </div>
  );
};

export default UpdateClass;
