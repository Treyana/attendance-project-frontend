import { useDispatch, useSelector } from "react-redux";
import SemesterItem from "./SemesterItem";
import { fetchSemesters, getAllSemesters } from "./semesterSlice";
import { useEffect } from "react";

const SemesterList = () => {

  const dispatch = useDispatch()
    const semesters = useSelector(getAllSemesters)
    
    useEffect(() => {
      dispatch(fetchSemesters());
    }, [dispatch])
    
  
    let content;
  
    content = semesters.map(
      (semester) =>(
        <SemesterItem 
        id = { semester.id}
        name = { semester.name}
        startDate = { semester.startdate}
        endDate = { semester.enddate}
        />
      )
    );
  
    return content;
  }
  
  export default SemesterList