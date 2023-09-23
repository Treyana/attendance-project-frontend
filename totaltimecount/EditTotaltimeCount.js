import React, { useEffect } from "react";
import classes from "../teacher/TeacherForm.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  createTotaltimeCount,
  selectTotaltimecountById,
  updateTotaltimeCount,
} from "./totaltimecountSlice";
import { fetchSubjects, getAllSubjects } from "../subject/subjectSlice";

const EditTotaltimeCount = () => {
  useEffect(() => {
    dispatch(fetchSubjects());
  }, []);

  const subjects = useSelector(getAllSubjects);
  console.log("Subject" + subjects);

  const { totaltimecountId } = useParams();
  const totaltimecount = useSelector((state) =>
    selectTotaltimecountById(state, Number(totaltimecountId))
  );

  const [id, setId] = useState(totaltimecount?.id);
  const [subjectId, setSubjectId] = useState(totaltimecount?.subject?.id);
  const [timeCount, setTimeCount] = useState(totaltimecount?.timeCount);
  const [fromDate, setFromdate] = useState(totaltimecount?.fromDate);
  const [toDate, setTodate] = useState(totaltimecount?.toDate);

  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const onTimeCountChange = (e) => setTimeCount(e.target.value);
  const onFromDateChange = (e) => setFromdate(e.target.value);
  const onToDateChange = (e) => setTodate(e.target.value);
  const onSubjectIdChange = (e) => setSubjectId(e.target.value);

  const canSave =
    [id, timeCount, fromDate, toDate].every(Boolean) &&
    addRequestStatus === "idle";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();

    if (canSave) {
      try {
        setAddRequestStatus("pending");

        dispatch(
          updateTotaltimeCount({
            id,
            timeCount,
            fromDate,
            toDate,
            subjectId,
          })
        );
      } catch (error) {
        console.log(error);
      } finally {
        setAddRequestStatus("idle");
      }

      setTimeCount("");
      setFromdate("");
      setTodate("");

      navigate("/admin/alltimecount");
    }
  };

  console.log("Reach form");
  return (
    <div class="main-panel">
      <div class="content-wrapper">
        <Link to="/admin/alltimecount">
          <button
            className={classes.color2}
            style={{ float: "right" }}
            type="button"
          >
            <i class="mdi mdi-arrow-left-bold btn-icon-prepend"></i>Back
          </button>
        </Link>

        <form
          className={classes.form}
          onSubmit={onSubmit}
          style={{ marginBottom: "50px" }}
        >
          <p className={classes.title}>Update Total Timecount</p>
          <select
            className={classes.Forminput}
            style={{ marginBottom: "35px" }}
            value={subjectId}
            onChange={onSubjectIdChange}
            required
          >
            <option value="" className="text-center">
              Choose Subject
            </option>

            {subjects.map((s) => (
              <option className="text-center" key={s.id} value={s.id}>
                <span> {s.name} </span>
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Timecount"
            className={classes.Forminput}
            value={timeCount}
            onChange={onTimeCountChange}
            required
          />
          <label className={classes.Formlabel}>Total TimeCount</label>

          <input
            type="date"
            placeholder="FromDate"
            className={classes.Forminput}
            value={fromDate}
            onChange={onFromDateChange}
            required
          />
          <label className={classes.Formlabel}>From Date</label>

          <input
            type="date"
            placeholder="ToDate"
            className={classes.Forminput}
            value={toDate}
            onChange={onToDateChange}
            required
          />
          <label className={classes.Formlabel}>To Date</label>

          <center>
            <button className={classes.send}>
              <i class="mdi mdi-file-check btn-icon-prepend"></i> Update
            </button>
          </center>
        </form>
      </div>
    </div>
  );
};

//     <div class="main-panel">
//       <div class="content-wrapper">

//           <form className={classes.form} onSubmit={onSubmit}>
//             <p className={classes.title}>Update TotaltimeCount</p>
//             <select
//               className="form-select"
//               value={subjectId}
//               onChange={onSubjectIdChange}

//             >
//               <option value="">Choose Subject</option>

//               {subjects.map((s) => (

//                 <option key={s.id}
//                   value={s.id}

//                 >
//                   <span> {s.name} </span>
//                 </option>
//               ))}

//             </select>

//             <label>
//               <input type="text" className={classes.input} value={timeCount} onChange={onTimeCountChange}/>
//               <span>TotaltimeCount</span>
//             </label>

//             <label>
//                 <input type="date" className={classes.input} value={fromDate} onChange={onFromDateChange}/>
//                 <span>From Date</span>
//               </label>

//             <label>
//               <input type="date" className={classes.input} value={toDate} onChange={onToDateChange}/>
//               <span>To Date</span>
//             </label>

//           <center>
//               <button className={classes.send}>
//               <i class="mdi mdi-file-check btn-icon-prepend"></i> Create

//               </button>
//               </center>
//           </form>
//         </div>
//       </div>

//   );
// };

export default EditTotaltimeCount;
