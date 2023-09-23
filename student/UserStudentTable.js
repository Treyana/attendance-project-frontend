import classes from "../teacher/TeacherForm.module.css";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteStudent, fetchStudents, getAllStudents } from "./studentSlice";
import CreateStudentButton from "./CreateStudentButton";

import { fetchClasses, getAllClasses } from "../class/classSlice";

import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import ConfirmModal from "../utility/ConfirmModal";

const UserStudentTable = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const students = useSelector(getAllStudents);
  console.log(students);

  function deleteHandler(studentId) {
    setSelectedStudentId(studentId);
    setModalOpen(true);
  }

  function cancelHandler() {
    setModalOpen(false);
  }

  function confirmHandler() {
    if (selectedStudentId) {
      dispatch(deleteStudent(selectedStudentId)).unwrap();
      setModalOpen(false);
    }
  }

  const columns = [
    // { name: "ID", selector: "id", sortable: true },
    { name: "Name", selector: "fullname", sortable: true },
    { name: "RollNo", selector: "rollno", sortable: true },
    { name: "Class", selector: "yearClass.name", sortable: true },
    // { name: "Email", selector: "username", sortable: true },
    {
      name: "View Details",
      cell: (row) => (
        <div>
          <td>
            <Link
              to={`/user/student/${row.id}`}
              className="fw-bold"
              style={{ textDecoration: "none", color: "#160158" }}
            >
              View Detail
            </Link>
          </td>
        </div>
      ),
    },
  ];

  const dispatch = useDispatch();

  const yearclasses = useSelector(getAllClasses);
  console.log(yearclasses);

  const [selectClass, setClassId] = useState("");

  const onClassIdChange = (newClass) => setClassId(newClass);

  console.log("SelectedClass" + selectClass);

  const filterByClass = (c) => {
    const filteredClass = students?.filter(
      (student) => student?.yearClass?.name === c
    );
    return filteredClass;
  };

  const filterStudent = filterByClass(String(selectClass));
  console.log(filterStudent);

  const text = `m-0 font-weight-bold text-center ${classes.text}`;

  useEffect(() => {
    dispatch(fetchClasses());
    dispatch(fetchStudents());
  }, [dispatch]);

  const [searchText, setSearchText] = useState("");

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredData = students.filter((item) =>
    item.fullname?.toLowerCase().includes(searchText.toLowerCase())
  );

  const filteredData1 = filterStudent.filter((item) =>
    item.fullname?.toLowerCase().includes(searchText.toLowerCase())
  );

  // console.log("in student table");
  const customStyles = {
    rows: {
      style: {
        minHeight: "55px", // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        background: "#040738",
        color: "#b9fefe",
        fontSize: "15px",
      },
    },
    cells: {
      style: {
        paddingLeft: "5px", // override the cell padding for data cells
        paddingRight: "5px",
        fontSize: "15px",
        color: "#160158",
      },
    },
  };

  return (
    <div class="main-panel">
      <div class="content-wrapper">
        <h1 className="text-center"> Student List</h1>
        <br />
        <br />
        <div className="MainDiv">
          <div>
            <div className="d-sm-flex justify-content-between align-items-center transaparent-tab-border">
              <nav>
                <ul className="nav nav-tabs tab-transparent" role="tablist">
                  <li className="nav-item">
                    <button
                      className={`nav-link${
                        selectClass === "" ? " active" : ""
                      }`}
                      onClick={() => onClassIdChange("")}
                    >
                      All Students
                    </button>
                  </li>

                  {yearclasses.map((y) => (
                    <li className="nav-item" key={y.name}>
                      <button
                        className={`nav-link${
                          selectClass === y.name ? " active" : ""
                        }`}
                        onClick={() => onClassIdChange(y.name)}
                      >
                        {y.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            {isModalOpen && (
              <ConfirmModal
                onCancel={cancelHandler}
                onConfirm={confirmHandler}
              />
            )}
            <br />

            <div>
              {/* <span class="mdi mdi-magnify"></span> */}
              <input
                type="text"
                placeholder="Search By Name"
                value={searchText}
                onChange={handleSearch}
                className={classes.FormSearch}
              />
            </div>
            {filterStudent.length > 0 ? (
              <DataTable
                // title="Filtered Students"
                columns={columns}
                data={filteredData1}
                pagination
                highlightOnHover
                pointerOnHover
                customStyles={customStyles}
              />
            ) : (
              <DataTable
                // title="All Students"
                columns={columns}
                data={filteredData}
                pagination
                highlightOnHover
                pointerOnHover
                customStyles={customStyles}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStudentTable;
