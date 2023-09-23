import { configureStore } from "@reduxjs/toolkit";
import teacherSlice from "../teacher/teacherSlice";
import subjectSlice from "../subject/subjectSlice";
import studentSlice from "../student/studentSlice";
import semesterSlice from "../semester/semesterSlice";
import authSlice from "../login/authSlice";
import emailSlice from "../email/emailSlice";
import classSlice from "../class/classSlice";
import accordionSlice from "../accordion/accordionSlice";
import timetableSlice from "../timetable/TimeTableSlice";
import attendanceSlice from "../attendance/attendanceSlice";
import totaltimecountSlice from "../totaltimecount/totaltimecountSlice";
import activitySlice from "../activity/activitySlice";

export const store = configureStore({
  reducer: {
    teachers: teacherSlice,
    subjects: subjectSlice,
    students: studentSlice,
    yearclass: classSlice,
    semesters: semesterSlice,
    auths: authSlice,
    email: emailSlice,
    accordions: accordionSlice,
    timetables: timetableSlice,
    attendances: attendanceSlice,
    totaltimecount: totaltimecountSlice,
    activities: activitySlice,
  },
});
