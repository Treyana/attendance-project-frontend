import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createAccordion } from "./accordionSlice";
import classes from "../teacher/TeacherForm.module.css";
import { fetchSemesters, getAllSemesters } from "../semester/semesterSlice";
import { fetchClasses, getAllClasses } from "../class/classSlice";

const CreateAccordion = () => {
  const text = `m-0  font-weight-bold  text-center `;
  const w = `  ${classes.w}`;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchClasses());
    dispatch(fetchSemesters());
  }, [dispatch]);

  const yearclasses = useSelector(getAllClasses);
  console.log(yearclasses);
  const semesters = useSelector(getAllSemesters);
  console.log(semesters);

  const [subtimea, setSubjtimea] = useState("");
  const [subtimeb, setSubjtimeb] = useState("");
  const [subtimec, setSubjtimec] = useState("");
  const [subtimed, setSubjtimed] = useState("");
  const [subtimee, setSubjtimee] = useState("");
  const [classId, setClassId] = useState("");
  const [semesterId, selectSemesterId] = useState("");

  const [subtimef, setSubjtimef] = useState("");
  const [subtimeg, setSubjtimeg] = useState("");
  const [subtimeh, setSubjtimeh] = useState("");
  const [subtimei, setSubjtimei] = useState("");
  const [subtimej, setSubjtimej] = useState("");

  const [subtimek, setSubjtimek] = useState("");
  const [subtimel, setSubjtimel] = useState("");
  const [subtimem, setSubjtimem] = useState("");
  const [subtimen, setSubjtimen] = useState("");
  const [subtimeo, setSubjtimeo] = useState("");

  const [subtimep, setSubjtimep] = useState("");
  const [subtimeq, setSubjtimeq] = useState("");
  const [subtimer, setSubjtimer] = useState("");
  const [subtimes, setSubjtimes] = useState("");
  const [subtimet, setSubjtimet] = useState("");

  const [subtimeu, setSubjtimeu] = useState("");
  const [subtimev, setSubjtimev] = useState("");
  const [subtimew, setSubjtimew] = useState("");
  const [subtimex, setSubjtimex] = useState("");
  const [subtimey, setSubjtimey] = useState("");

  const [subtimez, setSubjtimez] = useState("");
  const [subtimedf, setSubjtimedf] = useState("");
  const [subtimece, setSubjtimece] = useState("");
  const [subtimegk, setSubjtimegk] = useState("");
  const [subtimeml, setSubjtimeml] = useState("");

  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const onSubtimea = (e) => setSubjtimea(e.target.value);
  const onSubtimeb = (e) => setSubjtimeb(e.target.value);
  const onSubtimec = (e) => setSubjtimec(e.target.value);
  const onSubtimed = (e) => setSubjtimed(e.target.value);
  const onSubtimee = (e) => setSubjtimee(e.target.value);
  const onClassIdChange = (e) => setClassId(e.target.value);
  const onSemesterIdChange = (e) => selectSemesterId(e.target.value);

  const onSubtimef = (e) => setSubjtimef(e.target.value);
  const onSubtimeg = (e) => setSubjtimeg(e.target.value);
  const onSubtimeh = (e) => setSubjtimeh(e.target.value);
  const onSubtimei = (e) => setSubjtimei(e.target.value);
  const onSubtimej = (e) => setSubjtimej(e.target.value);

  const onSubtimek = (e) => setSubjtimek(e.target.value);
  const onSubtimel = (e) => setSubjtimel(e.target.value);
  const onSubtimem = (e) => setSubjtimem(e.target.value);
  const onSubtimen = (e) => setSubjtimen(e.target.value);
  const onSubtimeo = (e) => setSubjtimeo(e.target.value);

  const onSubtimep = (e) => setSubjtimep(e.target.value);
  const onSubtimeq = (e) => setSubjtimeq(e.target.value);
  const onSubtimer = (e) => setSubjtimer(e.target.value);
  const onSubtimes = (e) => setSubjtimes(e.target.value);
  const onSubtimet = (e) => setSubjtimet(e.target.value);

  const onSubtimeu = (e) => setSubjtimeu(e.target.value);
  const onSubtimev = (e) => setSubjtimev(e.target.value);
  const onSubtimew = (e) => setSubjtimew(e.target.value);
  const onSubtimex = (e) => setSubjtimex(e.target.value);
  const onSubtimey = (e) => setSubjtimey(e.target.value);

  const onSubtimez = (e) => setSubjtimez(e.target.value);
  const onSubtimedf = (e) => setSubjtimedf(e.target.value);
  const onSubtimece = (e) => setSubjtimece(e.target.value);
  const onSubtimegk = (e) => setSubjtimegk(e.target.value);
  const onSubtimeml = (e) => setSubjtimeml(e.target.value);

  const canSave =
    [
      subtimea,
      subtimeb,
      subtimec,
      subtimed,
      subtimee,
      subtimef,
      subtimeg,
      subtimeg,
      subtimeh,
      subtimei,
      subtimej,
      subtimek,
      subtimel,
      subtimem,
      subtimen,
      subtimeo,
      subtimep,
      subtimeq,
      subtimer,
      subtimes,
      subtimet,
      subtimeu,
      subtimev,
      subtimew,
      subtimex,
      subtimey,
      subtimez,
      subtimedf,
      subtimece,
      subtimegk,
      subtimeml,
      classId,
      semesterId,
    ].every(Boolean) && addRequestStatus === "idle";

  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();

    if (canSave) {
      try {
        setAddRequestStatus("pending");

        dispatch(
          createAccordion({
            subtimea,
            subtimeb,
            subtimec,
            subtimed,
            subtimee,
            subtimef,
            subtimeg,
            subtimeg,
            subtimeh,
            subtimei,
            subtimej,
            subtimek,
            subtimel,
            subtimem,
            subtimen,
            subtimeo,
            subtimep,
            subtimeq,
            subtimer,
            subtimes,
            subtimet,
            subtimeu,
            subtimev,
            subtimew,
            subtimex,
            subtimey,
            subtimez,
            subtimedf,
            subtimece,
            subtimegk,
            subtimeml,
            classId,
            semesterId,
          })
        );
      } catch (error) {
        console.log(error);
      } finally {
        setAddRequestStatus("idle");
      }

      setSubjtimea("");
      setSubjtimeb("");
      setSubjtimec("");
      setSubjtimed("");
      setSubjtimee("");

      setSubjtimef("");
      setSubjtimeg("");
      setSubjtimeh("");
      setSubjtimei("");
      setSubjtimej("");

      setSubjtimek("");
      setSubjtimel("");
      setSubjtimem("");
      setSubjtimen("");
      setSubjtimeo("");

      setSubjtimep("");
      setSubjtimeq("");
      setSubjtimer("");
      setSubjtimes("");
      setSubjtimet("");

      setSubjtimeu("");
      setSubjtimev("");
      setSubjtimew("");
      setSubjtimex("");
      setSubjtimey("");

      setSubjtimez("");
      setSubjtimedf("");
      setSubjtimece("");
      setSubjtimegk("");
      setSubjtimeml("");

      navigate(`/admin/allAccordion`);
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
      {" "}
      <div>
        <Link to="/admin/allAccordion">
          <button
            className={classes.color2}
            style={{ float: "right" }}
            type="button"
          >
            <i class="mdi mdi-arrow-left-bold btn-icon-prepend"></i>Back
          </button>
        </Link>
      </div>
      <h1 className="text-center mb-5">Create Timetable</h1>
      <form onSubmit={onSubmit}>
        <div className="row mt-3 mb-2">
          <div className="col-sm-3"></div>
          <div className="col-sm-2">
            <label className="form-label fw-bold pt-2">Class :</label>
          </div>
          <div className="col-sm-4">
            <select
              className={classes.FormSelect}
              value={classId}
              onChange={onClassIdChange}
            >
              <option value="">Choose Class </option>
              {yearclasses.map((y) => (
                <option key={y.id} value={y.id}>
                  <span> {y.name} </span>
                </option>
              ))}
            </select>
          </div>
          <div className="col-sm-3"></div>
        </div>

        <div className="row mt-3 mb-2">
          <div className="col-sm-3"></div>
          <div className="col-sm-2">
            <label className="form-label fw-bold pt-2">Semester :</label>
          </div>
          <div className="col-sm-4">
            <select
              className={classes.FormSelect}
              value={semesterId}
              onChange={onSemesterIdChange}
            >
              <option value="">Choose Semester </option>
              {semesters.map((s) => (
                <option key={s.id} value={s.id}>
                  <span> {s.name} </span>
                </option>
              ))}
            </select>
          </div>
          <div className="col-sm-3"></div>
        </div>

        <table
          className="table table-bordered mt-5 "
          style={{ minWidth: "900px" }}
        >
          <thead
            className={text}
            className="text-center"
            style={{ background: "#040738", color: "#b9fefe" }}
          >
            <tr>
              <th className={classes.w}>
                <a>Time</a>
                <hr
                  style={{
                    border: "1px solid black",
                    transform: "rotate(45deg)",
                  }}
                ></hr>
                <a>Day</a>
              </th>
              <th className={classes.w}>
                <a>1</a>
                <br />
                <br />
                <br />
                <a>(8:30-9:30)</a>
              </th>
              <th className={classes.w}>
                <a>2</a>
                <br />
                <br />
                <br />
                <a>(9:35-10:35)</a>
              </th>
              <th className={classes.w}>
                <a>3</a>
                <br />
                <br />
                <br />
                <a>(10:40-11:40)</a>
              </th>

              <th className={classes.w}>
                <a>4</a>
                <br />
                <br />
                <br />
                <a>(12:40-1:40)</a>
              </th>
              <th className={classes.w}>
                <a>5</a>
                <br />
                <br />
                <br />
                <a>(1:45-2:45)</a>
              </th>
              <th className={classes.w}>
                <a>6</a>
                <br />
                <br />
                <br />
                <a>(2:50-3:50)</a>
              </th>
            </tr>
          </thead>

          <tbody style={{ background: "#b9fefe", color: "#040738" }}>
            <tr>
              <td
                className="text-center"
                style={{ background: "#040738", color: "#b9fefe" }}
              >
                MON
              </td>
              <td className="text-center">
                <input
                  type="text"
                  name="timetable"
                  value={subtimea}
                  className={classes.w}
                  onChange={onSubtimea}
                  required
                />
              </td>
              <td className="text-center">
                {" "}
                <input
                  type="text"
                  name="timetable"
                  className={classes.w}
                  required
                  value={subtimeb}
                  onChange={onSubtimeb}
                />
              </td>
              <td className="text-center">
                <input
                  type="text"
                  name="timetable"
                  required
                  className={classes.w}
                  value={subtimec}
                  onChange={onSubtimec}
                />
              </td>
              <td className="text-center">
                {" "}
                <input
                  type="text"
                  name="timetable"
                  className={classes.w}
                  required
                  value={subtimed}
                  onChange={onSubtimed}
                />
              </td>
              <td className="text-center">
                {" "}
                <input
                  type="text"
                  name="timetable"
                  className={classes.w}
                  required
                  value={subtimee}
                  onChange={onSubtimee}
                />
              </td>
              <td className="text-center">
                {" "}
                <input
                  type="text"
                  name="timetable"
                  className={classes.w}
                  required
                  value={subtimef}
                  onChange={onSubtimef}
                />
              </td>
            </tr>
            <tr>
              <td
                className="text-center"
                style={{ background: "#040738", color: "#b9fefe" }}
              >
                TUE
              </td>
              <td className="text-center">
                {" "}
                <input
                  type="text"
                  name="timetable"
                  className={classes.w}
                  required
                  value={subtimeg}
                  onChange={onSubtimeg}
                />
              </td>
              <td className="text-center">
                {" "}
                <input
                  type="text"
                  name="timetable"
                  className={classes.w}
                  required
                  value={subtimeh}
                  onChange={onSubtimeh}
                />
              </td>
              <td className="text-center">
                <input
                  type="text"
                  name="timetable"
                  required
                  className={classes.w}
                  value={subtimei}
                  onChange={onSubtimei}
                />
              </td>
              <td className="text-center">
                {" "}
                <input
                  type="text"
                  name="timetable"
                  className={classes.w}
                  required
                  value={subtimej}
                  onChange={onSubtimej}
                />
              </td>
              <td className="text-center">
                {" "}
                <input
                  type="text"
                  name="timetable"
                  className={classes.w}
                  required
                  value={subtimek}
                  onChange={onSubtimek}
                />
              </td>
              <td className="text-center">
                {" "}
                <input
                  type="text"
                  name="timetable"
                  className={classes.w}
                  required
                  value={subtimel}
                  onChange={onSubtimel}
                />
              </td>
            </tr>

            <tr>
              <td
                className="text-center"
                style={{ background: "#040738", color: "#b9fefe" }}
              >
                WED
              </td>
              <td className="text-center">
                {" "}
                <input
                  type="text"
                  name="timetable"
                  className={classes.w}
                  required
                  value={subtimem}
                  onChange={onSubtimem}
                />
              </td>
              <td className="text-center">
                <input
                  type="text"
                  name="timetable"
                  className={classes.w}
                  required
                  value={subtimen}
                  onChange={onSubtimen}
                />
              </td>
              <td className="text-center">
                <input
                  type="text"
                  name="timetable"
                  className={classes.w}
                  required
                  value={subtimeo}
                  onChange={onSubtimeo}
                />
              </td>
              <td className="text-center">
                {" "}
                <input
                  type="text"
                  name="timetable"
                  className={classes.w}
                  required
                  value={subtimep}
                  onChange={onSubtimep}
                />
              </td>
              <td className="text-center">
                {" "}
                <input
                  type="text"
                  name="timetable"
                  className={classes.w}
                  required
                  value={subtimeq}
                  onChange={onSubtimeq}
                />
              </td>
              <td className="text-center">
                {" "}
                <input
                  type="text"
                  name="timetable"
                  className={classes.w}
                  required
                  value={subtimer}
                  onChange={onSubtimer}
                />
              </td>
            </tr>
            <tr>
              <td
                className="text-center"
                style={{ background: "#040738", color: "#b9fefe" }}
              >
                THU
              </td>
              <td className="text-center">
                {" "}
                <input
                  type="text"
                  name="timetable"
                  className={classes.w}
                  required
                  value={subtimes}
                  onChange={onSubtimes}
                />
              </td>
              <td className="text-center">
                {" "}
                <input
                  type="text"
                  name="timetable"
                  className={classes.w}
                  required
                  value={subtimet}
                  onChange={onSubtimet}
                />
              </td>
              <td className="text-center">
                <input
                  type="text"
                  name="timetable"
                  required
                  className={classes.w}
                  value={subtimeu}
                  onChange={onSubtimeu}
                />
              </td>
              <td className="text-center">
                <input
                  type="text"
                  name="timetable"
                  className={classes.w}
                  required
                  value={subtimev}
                  onChange={onSubtimev}
                />
              </td>
              <td className="text-center">
                {" "}
                <input
                  type="text"
                  name="timetable"
                  className={classes.w}
                  required
                  value={subtimew}
                  onChange={onSubtimew}
                />
              </td>
              <td className="text-center">
                {" "}
                <input
                  type="text"
                  name="timetable"
                  className={classes.w}
                  required
                  value={subtimex}
                  onChange={onSubtimex}
                />
              </td>
            </tr>
            <tr>
              <td
                className="text-center"
                style={{ background: "#040738", color: "#b9fefe" }}
              >
                FRI
              </td>
              <td className="text-center">
                <input
                  type="text"
                  name="timetable"
                  className={classes.w}
                  required
                  value={subtimey}
                  onChange={onSubtimey}
                />
              </td>
              <td className="text-center">
                <input
                  type="text"
                  name="timetable"
                  required
                  className={classes.w}
                  value={subtimez}
                  onChange={onSubtimez}
                />
              </td>
              <td className="text-center">
                <input
                  type="text"
                  name="timetable"
                  required
                  className={classes.w}
                  value={subtimedf}
                  onChange={onSubtimedf}
                />
              </td>
              <td className="text-center">
                <input
                  type="text"
                  name="timetable"
                  required
                  className={classes.w}
                  value={subtimece}
                  onChange={onSubtimece}
                />
              </td>
              <td className="text-center">
                {" "}
                <input
                  type="text"
                  name="timetable"
                  className={classes.w}
                  required
                  value={subtimegk}
                  onChange={onSubtimegk}
                />
              </td>
              <td className="text-center">
                {" "}
                <input
                  type="text"
                  name="timetable"
                  className={classes.w}
                  required
                  value={subtimeml}
                  onChange={onSubtimeml}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <center>
          <button className={classes.send}>
            <i class="mdi mdi-file-check btn-icon-prepend"></i> Create
          </button>
        </center>
      </form>
    </div>
  );
};

export default CreateAccordion;
