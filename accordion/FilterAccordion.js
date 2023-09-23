import React, { useEffect, useState } from "react";
import classes from "../teacher/TeacherForm.module.css";
import { fetchClasses, getAllClasses } from "../class/classSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAccordions,
  getAllAccordions,
  getFilteredAccordions,
  selectAccordionClassById,
  selectAccordionClassByName,
  selectAccordionSemesterById,
} from "./accordionSlice";
import { fetchSemesters, getAllSemesters } from "../semester/semesterSlice";
import FilterAccordionItem from "./FilterAccordionItem";
import AccordionItem from "./AccordionItem";
import { Link } from "react-router-dom";

const FilterAccordion = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchClasses());
    dispatch(fetchAccordions());
    dispatch(fetchSemesters());
  }, [dispatch]);

  const semesters = useSelector(getAllSemesters);
  console.log(semesters);
  const accordions = useSelector(getAllAccordions);
  console.log(accordions);
  const yearclasses = useSelector(getAllClasses);
  console.log(yearclasses);

  const [selectClass, setClassId] = useState("");
  const onClassIdChange = (e) => setClassId(e.target.value);
  console.log(selectClass);

  const filterByClass = (c) => {
    const filteredClass = accordions?.filter(
      (accordion) => accordion?.yearClass?.name === c
    );
    return filteredClass;
  };

  const filterTimetable = filterByClass(String(selectClass));
  console.log(filterTimetable);

  return (
    <div
      style={{
        width: "79%",
        padding: "30px",
        background: "whitesmoke",
      }}
    >
      <div className="text-center">
        <h1 class={classes.mainTitle}> Timetable List </h1>
      </div>

      {/* <button className={classes.color1}>
        {" "}
        <Link to="/admin/create-accordion" class="nav-link">
          <i class="fas fa-plus fa-sm"></i>Timetable{" "}
        </Link>
      </button> */}

      <button className={classes.color1}>
        <Link to="/admin/create-accordion" class="nav-link">
          <i class="fas fa-plus fa-sm"></i> Timetable
        </Link>
      </button>

      <div className="row mt-3 mb-2">
        <div className="col-sm-3"></div>
        <div className="col-sm-2">
          <label className="form-label fw-bold pt-2">Class :</label>
        </div>
        <div className="col-sm-4">
          <select
            className={classes.FormSelect}
            value={selectClass}
            onChange={onClassIdChange}
          >
            <option value="">Show All </option>
            {yearclasses.map((y) => (
              <option key={y.name} value={y.name}>
                <span> {y.name} </span>
              </option>
            ))}
          </select>
        </div>
        <div className="col-sm-3"></div>
      </div>
      <div class="row">
        <div class="col-md-10">
          {/* <div class="d-sm-flex justify-content-between align-items-center transaparent-tab-border {"> */}
          {filterTimetable.length > 0 ? (
            <div>
              {/*  <h3 className="text-dark ms-4">{selectClass} Timetables </h3> */}
              <ul>
                {filterTimetable.map((student) => (
                  <FilterAccordionItem
                    id={student.id}
                    subtimea={student.subtimea}
                    subtimeb={student.subtimeb}
                    subtimec={student.subtimec}
                    subtimed={student.subtimed}
                    subtimee={student.subtimee}
                    subtimef={student.subtimef}
                    subtimeg={student.subtimeg}
                    subtimeh={student.subtimeh}
                    subtimei={student.subtimei}
                    subtimej={student.subtimej}
                    subtimek={student.subtimek}
                    subtimel={student.subtimel}
                    subtimem={student.subtimem}
                    subtimen={student.subtimen}
                    subtimeo={student.subtimeo}
                    subtimep={student.subtimep}
                    subtimeq={student.subtimeq}
                    subtimer={student.subtimer}
                    subtimes={student.subtimes}
                    subtimet={student.subtimet}
                    subtimeu={student.subtimeu}
                    subtimev={student.subtimev}
                    subtimew={student.subtimew}
                    subtimex={student.subtimex}
                    subtimey={student.subtimey}
                    subtimez={student.subtimez}
                    subtimedf={student.subtimedf}
                    subtimece={student.subtimece}
                    subtimegk={student.subtimegk}
                    subtimeml={student.subtimeml}
                    yearClass={student.yearClass}
                    semester={student.semester}
                    name={student.yearClass.name}
                  />
                ))}
              </ul>
            </div>
          ) : (
            <div>
              {/* <h3 className="text-dark ms-4">All Timetables</h3> */}

              <ul>
                {accordions.map((c) => (
                  <FilterAccordionItem
                    id={c.id}
                    subtimea={c.subtimea}
                    subtimeb={c.subtimeb}
                    subtimec={c.subtimec}
                    subtimed={c.subtimed}
                    subtimee={c.subtimee}
                    subtimef={c.subtimef}
                    subtimeg={c.subtimeg}
                    subtimeh={c.subtimeh}
                    subtimei={c.subtimei}
                    subtimej={c.subtimej}
                    subtimek={c.subtimek}
                    subtimel={c.subtimel}
                    subtimem={c.subtimem}
                    subtimen={c.subtimen}
                    subtimeo={c.subtimeo}
                    subtimep={c.subtimep}
                    subtimeq={c.subtimeq}
                    subtimer={c.subtimer}
                    subtimes={c.subtimes}
                    subtimet={c.subtimet}
                    subtimeu={c.subtimeu}
                    subtimev={c.subtimev}
                    subtimew={c.subtimew}
                    subtimex={c.subtimex}
                    subtimey={c.subtimey}
                    subtimez={c.subtimez}
                    subtimedf={c.subtimedf}
                    subtimece={c.subtimece}
                    subtimegk={c.subtimegk}
                    subtimeml={c.subtimeml}
                    yearClass={c.yearClass}
                    semester={c.semester}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
    // </div>
  );
};

export default FilterAccordion;
