import { Route, Routes } from "react-router-dom";
import TeacherForm from "./teacher/TeacherForm";
import Dashboard from "./admin/Dashboard";
import Sidebar from "./admin/Sidebar";
import TeacherTable from "./teacher/TeacherTable";
import EditTeacherForm from "./teacher/EditTeacherForm";
import SubjectTable from "./subject/SubjectTable";
import SubjectForm from "./subject/SubjectForm";
import EditSubjectForm from "./subject/EditSubjectForm";
import StudentTable from "./student/StudentTable";
import StudentFrom from "./student/StudentFrom";
import EditStudentForm from "./student/EditStudentForm";
import CreateClass from "./class/CreateClass";
import UpdateClass from "./class/UpdateClass";
import ClassTable from "./class/ClassTable";
import SemesterTable from "./semester/SemesterTable";
import SemesterForm from "./semester/SemesterForm";
import EditSemester from "./semester/EditSemester";
import StudentDetail from "./student/StudentDetail";
import TeacherDetail from "./teacher/TeacherDetail";
import ProtectedRoute from "./login/ProtectedRoute";
import Login from "./login/Login";
import UserSidebar from "./admin/UserSidebar";
import UserDashboard from "./admin/UserDashboard";
import EmailSendForm from "./email/EmailSendForm";
import Decrypt from "./teacher/Decrypt";
import UnAuthenticated from "./login/UnAuthenticated";
import ProfileInfo from "./admin/ProfileInfo";
import UserProfileInfo from "./admin/UserProfileInfo";
import CreateAccordion from "./accordion/CreateAccordion";
import AccordionTable from "./accordion/AccordionTable";
import FilterAccordion from "./accordion/FilterAccordion";
import EditAccordion from "./accordion/EditAccordion";
import AttendanceForm from "./attendance/AttendanceForm";
import AttendanceListingByDaily from "./attendance/AttendanceListingbyDaily";
import TimeTableTable from "./timetable/TimeTableTable";
import UserStudentTable from "./student/UserStudentTable";
import UserAccordionTable from "./accordion/UserAccordionTable";
// import UserAttendanceListingByDaily from "./attendance/UserAttendanceListingbyDaily";
// import Testing from "./attendance/Testing";
import AttendanceListingByMonthly from "./attendance/AttendanceListingbyMonthly";
import { useSelector } from "react-redux";
import { getAllAttendances } from "./attendance/attendanceSlice";
import TotaltimeCountTable from "./totaltimecount/TotaltimeCountTable";
import CreateTotaltimeCount from "./totaltimecount/CreateTotaltimeCount";
import EditTotaltimeCount from "./totaltimecount/EditTotaltimeCount";
import AttendanceListingbyMonthlyAll from "./attendance/AttendanceListingbyMonthlyAll";
// import TestingMonthly from "./attendance/TestingMonthly";
import AttendanceListingbyDaily from "./attendance/AttendanceListingbyDaily";
import UpdateAttendance from "./attendance/UpdateAttendance";
import UserHome from "./admin/Home";
import SelectAllTest from "./attendance/SelectAllTest";
import CreateActivity from "./activity/CreateActivity";
import ActivityTable from "./activity/ActivityTable";
import EditActivity from "./activity/EditActivity";

function App() {
  const attendances = useSelector(getAllAttendances);
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<ProtectedRoute allowedRoles={["ROLE_ADMIN"]} />}>
        <Route path="/admin" element={<Sidebar />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/teacher" element={<TeacherTable />} />
          <Route path="/admin/create-teacher" element={<TeacherForm />} />
          <Route
            path="/admin/teacher/update/:teacherId"
            element={<EditTeacherForm />}
          />
          <Route path="/admin/teacher/:teacherId" element={<TeacherDetail />} />

          <Route path="/admin/allsubjects" element={<SubjectTable />} />
          <Route path="/admin/create-subject" element={<SubjectForm />} />
          <Route
            path="/admin/subject/update/:subjectId"
            element={<EditSubjectForm />}
          />

          <Route path="/admin/allstudents" element={<StudentTable />} />
          <Route path="/admin/create-student" element={<StudentFrom />} />
          <Route
            path="/admin/student/update/:studentId"
            element={<EditStudentForm />}
          />
          <Route path="/admin/student/:studentId" element={<StudentDetail />} />

          <Route path="/admin/allclasses" element={<ClassTable />} />
          <Route path="/admin/create-class" element={<CreateClass />} />
          <Route
            path="/admin/class/update/:classId"
            element={<UpdateClass />}
          />

          <Route path="/admin/allsemesters" element={<SemesterTable />} />
          <Route path="/admin/create-semester" element={<SemesterForm />} />
          <Route
            path="/admin/semester/update/:semesterId"
            element={<EditSemester />}
          />

          <Route path="/admin/create-accordion" element={<CreateAccordion />} />
          <Route path="/admin/allAccordions" element={<AccordionTable />} />
          <Route path="/admin/allAccordion" element={<FilterAccordion />} />
          <Route
            path="/admin/accordion/edit/:accordionId"
            element={<EditAccordion />}
          />

          <Route path="/admin/email/:userId" element={<EmailSendForm />} />
          <Route path="/admin/decrypt/:userId" element={<Decrypt />} />

          <Route path="/admin/profile" element={<ProfileInfo />} />

          <Route path="/admin/create-attendance" element={<AttendanceForm />} />
          <Route
            path="/admin/attendancelisting-bydaily"
            element={<AttendanceListingByDaily />}
          />

          <Route
            path="/admin/create-totaltimecount"
            element={<CreateTotaltimeCount />}
          />

          <Route path="/admin/alltimecount" element={<TotaltimeCountTable />} />
          <Route
            path="/admin/totaltimecount/update/:totaltimecountId"
            element={<EditTotaltimeCount />}
          />

          <Route
            path="/admin/attendancelisting-bymonthlyall"
            element={<AttendanceListingbyMonthlyAll />}
          />
          <Route path="/admin/create-activity" element={<CreateActivity />} />
          <Route
            path="/admin/activity/update/:activityId"
            element={<EditActivity />}
          />
          <Route path="/admin/activity" element={<ActivityTable />} />
        </Route>
      </Route>

      <Route path="/unauthenticated" element={<UnAuthenticated />} />

      <Route element={<ProtectedRoute allowedRoles={["ROLE_TEACHER"]} />}>
        <Route path="/user" element={<UserSidebar />}>
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/user/home" element={<UserHome />} />
          <Route path="/user/teacher" element={<TeacherTable />} />
          <Route path="/user/teacher/:teacherId" element={<TeacherDetail />} />
          <Route path="/user/profile" element={<UserProfileInfo />} />

          <Route path="/user/allsubjects" element={<SubjectTable />} />
          <Route path="/user/allstudents" element={<UserStudentTable />} />
          <Route path="/user/student/:studentId" element={<StudentDetail />} />
          <Route path="/user/allTimeTables" element={<TimeTableTable />} />

          <Route path="/user/allAccordion" element={<UserAccordionTable />} />

          {/* <Route path="/user/create-attendance" element={<SelectAllTest />} /> */}
          <Route path="/user/create-attendance" element={<AttendanceForm />} />
          <Route
            path="/user/attendancelisting-bydaily"
            element={<AttendanceListingbyDaily />}
          />
          <Route
            path="/user/attendancelisting-bymonthly"
            element={<AttendanceListingByMonthly attendance={attendances} />}
          />

          <Route path="/user/updateAttendance" element={<UpdateAttendance />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
