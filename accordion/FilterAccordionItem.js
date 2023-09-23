import React, { useState } from "react";
import classes from "../teacher/TeacherForm.module.css";
import ConfirmModal from "../utility/ConfirmModal";
import { useDispatch } from "react-redux";
import { deleteAccordion } from "./accordionSlice";
import { Link } from "react-router-dom";

const FilterAccordionItem = (props) => {
  const text = `m-0  font-weight-bold   text-center ${classes.text}`;
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);

  function deleteHandler() {
    setModalOpen(true);
  }

  function cancelHandler() {
    setModalOpen(false);
  }

  function confirmHandler() {
    dispatch(deleteAccordion(props.id)).unwrap();
    setModalOpen(false);
  }
  const lunch = `text-center ${classes.l}`;
  return (
    <div>
      <h4 className="text-center mt-3">
        Class : {props.yearClass?.name}&nbsp;,&nbsp;{props.semester?.name} -
        Timetable{" "}
      </h4>

      {/* <table class="table table-st mt-3"> */}
      <table
        className="table table-bordered mt-3"
        style={{ minWidth: "900px" }}
      >
        <thead className={text}>
          <tr>
            <th className={classes.w}>
              <a>Time</a>
              <hr
                style={{
                  border: "1px solid #b9fefe",
                  transform: "rotate(45deg)",
                }}
              ></hr>
              <a>Day</a>
            </th>
            <th className="text-center">
              <a>1</a>
              <br />
              <br />
              <br />
              <a>(8:30-9:30)</a>
            </th>
            <th className="text-center">
              <a>2</a>
              <br />
              <br />
              <br />
              <a>(9:35-10:35)</a>
            </th>
            <th className="text-center">
              <a>3</a>
              <br />
              <br />
              <br />
              <a>(10:40-11:40)</a>
            </th>
            <th>(10:40-12:40)</th>
            <th className="text-center">
              <a>4</a>
              <br />
              <br />
              <br />
              <a>(12:40-1:40)</a>
            </th>
            <th className="text-center">
              <a>5</a>
              <br />
              <br />
              <br />
              <a>(1:45-2:45)</a>
            </th>
            <th className="text-center">
              <a>6</a>
              <br />
              <br />
              <br />
              <a>(2:50-3:50)</a>
            </th>
          </tr>
        </thead>

        <tbody style={{ background: "#b9fefe" }}>
          <tr>
            <td
              className="text-center "
              style={{ background: "#040738", color: "#b9fefe" }}
            >
              MON
            </td>
            <td className="text-center">{props.subtimea}</td>
            <td className="text-center">{props.subtimeb}</td>
            <td className="text-center">{props.subtimec} </td>
            <td rowSpan="5" className={lunch}>
              Lunch Break
              {/* <p className={lunch}>Lunch Break</p> */}
            </td>
            <td className="text-center">{props.subtimed}</td>
            <td className="text-center">{props.subtimee}</td>
            <td className="text-center">{props.subtimef} </td>
          </tr>
          <tr>
            <td
              className="text-center"
              style={{ background: "#040738", color: "#b9fefe" }}
            >
              TUE
            </td>
            <td className="text-center">{props.subtimeg}</td>
            <td className="text-center">{props.subtimeh}</td>
            <td className="text-center">{props.subtimei} </td>
            <td className="text-center">{props.subtimej}</td>
            <td className="text-center">{props.subtimek}</td>
            <td className="text-center">{props.subtimel} </td>
          </tr>
          <tr>
            <td
              className="text-center"
              style={{ background: "#040738", color: "#b9fefe" }}
            >
              WED
            </td>
            <td className="text-center">{props.subtimem}</td>
            <td className="text-center">{props.subtimen}</td>
            <td className="text-center">{props.subtimeo} </td>
            <td className="text-center">{props.subtimep}</td>
            <td className="text-center">{props.subtimeq}</td>
            <td className="text-center">{props.subtimer} </td>
          </tr>
          <tr>
            <td
              className="text-center"
              style={{ background: "#040738", color: "#b9fefe" }}
            >
              THU
            </td>
            <td className="text-center">{props.subtimes}</td>
            <td className="text-center">{props.subtimet}</td>
            <td className="text-center">{props.subtimeu} </td>
            <td className="text-center">{props.subtimev}</td>
            <td className="text-center">{props.subtimew}</td>
            <td className="text-center">{props.subtimex} </td>
          </tr>
          <tr>
            <td
              className="text-center"
              style={{ background: "#040738", color: "#b9fefe" }}
            >
              FRI
            </td>
            <td className="text-center">{props.subtimey}</td>
            <td className="text-center">{props.subtimez}</td>
            <td className="text-center">{props.subtimedf} </td>
            <td className="text-center">{props.subtimece}</td>
            <td className="text-center">{props.subtimegk}</td>
            <td className="text-center">{props.subtimeml} </td>
          </tr>
        </tbody>
      </table>
      <p className="text-right mt-4">
        <Link
          to={`/admin/accordion/edit/${props.id}`}
          className={classes.color2}
          style={{ textDecoration: "none" }}
        >
          Update
        </Link>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link
          onClick={deleteHandler}
          className={classes.color2}
          style={{ textDecoration: "none" }}
        >
          Delete
        </Link>
      </p>

      {isModalOpen && (
        <ConfirmModal onCancel={cancelHandler} onConfirm={confirmHandler} />
      )}
    </div>
  );
};

export default FilterAccordionItem;
