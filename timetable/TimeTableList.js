import React from "react";
import TimeTableItem from "./TimeTableItem";
import { getAllTimeTables } from "./TimeTableSlice";
import { useSelector } from "react-redux";
import { getRoles } from "../login/authSlice";
import UserTimeTableItem from "./UserTimeTableItem";

const TimeTableList = () => {
  const getRole = useSelector(getRoles);
  const timetables = useSelector(getAllTimeTables);

  let content;

  content = timetables.map((timetable) =>
    getRole == "ROLE_ADMIN" ? (
      <TimeTableItem
        id={timetable.id}
        semester={timetable.semester}
        className={timetable.className}
        subjectName={timetable.subjectName}
        classDay={timetable.classDay}
        classTime={timetable.classTime}
      />
    ) : (
      <UserTimeTableItem
        id={timetable.id}
        semester={timetable.semester}
        className={timetable.className}
        subjectName={timetable.subjectName}
        classDay={timetable.classDay}
        classTime={timetable.classTime}
      />
    )
  );

  return content;
};

export default TimeTableList;
