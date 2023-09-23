import { useDispatch } from "react-redux";
import ConfirmModal from "../utility/ConfirmModal"
import { Link } from "react-router-dom";
import { useState } from "react";
import classes from '../teacher/TeacherForm.module.css'
import { deleteAccordion } from "./accordionSlice";


const AccordionItem = (props) => {
    const text = `m-0  font-weight-bold   text-center `
    const color1 = `btn btn-primary  ${classes.color1}`
    const text1 = `btn btn-primary ${classes.text1}`
  const dispatch = useDispatch()
  const [isModalOpen, setModalOpen] = useState(false)

  function deleteHandler() {
    setModalOpen(true);
}

function cancelHandler() {
    setModalOpen(false);
}

function confirmHandler() {
  dispatch(deleteAccordion(props.id)).unwrap()
    setModalOpen(false)
}
    
  return (
    <div class="container mt-3">
    <div>
            <div>
          
                            <h4 className="text-center">Class : {props.yearClass?.name}&nbsp;,&nbsp;{props.semester?.name} </h4>
        <table class="table table-striped table-bordered mt-2">

            <thead className={text}>
                <tr>

                        
                            <th className={classes.w}><a >Time</a><br/><br/><br/><a ></a><a >Day</a></th>
                            <th><a>1</a><br/><br/><br/><a>(8:30-9:30)</a></th>
                            <th><a>2</a><br/><br/><br/><a>(9:35-10:35)</a></th>
                            <th><a>3</a><br/><br/><br/><a>(10:40-11:40)</a></th>
                            <th>(10:40-12:40)</th>
                            <th><a>4</a><br/><br/><br/><a>(12:40-1:40)</a></th>
                            <th><a>5</a><br/><br/><br/><a>(1:45-2:45)</a></th>
                            <th><a>6</a><br/><br/><br/><a>(2:50-3:50)</a></th>

                </tr>
            </thead>


            <tbody>
                <tr>
                   <td className='text-center'>MON</td>
                    <td className='text-center'>{props.subtimea}</td>
                    <td className='text-center'>{props.subtimeb}</td>
                    <td className='text-center'>{props.subtimec} </td>
                    <td rowSpan="5" ><p className={classes.l}>Lunch Break</p></td>
                    <td className='text-center'>{props.subtimed}</td>
                    <td className='text-center'>{props.subtimee}</td>
                    <td className='text-center'>{props.subtimef} </td>
                    </tr>
                <tr>
                   
                    <td className='text-center'>TUE</td>
                    <td className='text-center'>{props.subtimeg}</td>
                    <td className='text-center'>{props.subtimeh}</td>
                    <td className='text-center'>{props.subtimei} </td>
                    <td className='text-center'>{props.subtimej}</td>
                    <td className='text-center'>{props.subtimek}</td>
                    <td className='text-center'>{props.subtimel} </td>
                </tr>
                <tr>
                    <td className='text-center'>WED</td>
                    <td className='text-center'>{props.subtimem}</td>
                    <td className='text-center'>{props.subtimen}</td>
                    <td className='text-center'>{props.subtimeo} </td>
                    <td className='text-center'>{props.subtimep}</td>
                    <td className='text-center'>{props.subtimeq}</td>
                    <td className='text-center'>{props.subtimer} </td></tr>
                <tr>
                   <td className='text-center'>THU</td>
                   <td className='text-center'>{props.subtimes}</td>
                    <td className='text-center'>{props.subtimet}</td>
                    <td className='text-center'>{props.subtimeu} </td>
                    <td className='text-center'>{props.subtimev}</td>
                    <td className='text-center'>{props.subtimew}</td>
                    <td className='text-center'>{props.subtimex} </td></tr>
                <tr>
                   
                    <td className='text-center'>FRI</td>
                    <td className='text-center'>{props.subtimey}</td>
                    <td className='text-center'>{props.subtimez}</td>
                    <td className='text-center'>{props.subtimedf} </td>
                    <td className='text-center'>{props.subtimece}</td>
                    <td className='text-center'>{props.subtimegk}</td>
                    <td className='text-center'>{props.subtimeml} </td>
                </tr>
            </tbody>
        

        </table>
        <p className="text-right">
            <Link to={`/admin/accordion/edit/${props.id}`} className='btn btn-success mt-5'>Update</Link>
            <Link onClick={deleteHandler} className='btn btn-success mt-5 ms-5'>Delete</Link></p>
       
            {isModalOpen && <ConfirmModal onCancel={cancelHandler} onConfirm={confirmHandler} />}
   
            </div>
        </div>

    </div>
  )
}

export default AccordionItem