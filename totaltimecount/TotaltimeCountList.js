import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTotaltimeCount, getAllTotaltimecount } from './totaltimecountSlice'
import TotaltimeCountItem from './TotaltimeCountItem'

const TotaltimeCountList = () => {
    const dispatch = useDispatch()
    const totaltimecount = useSelector(getAllTotaltimecount)
    
    useEffect(() => {
      dispatch(fetchTotaltimeCount());
    }, [dispatch])
    
  
    let content;
  
    content = totaltimecount.map(
      (timecount) =>(
        <TotaltimeCountItem 
        id = { timecount.id}
        timeCount = { timecount.timeCount}
        fromDate = { timecount.fromDate}
        toDate = { timecount.toDate}
        subject = {timecount.subject}
        />
      )
    );
  
    return content;
  }


export default TotaltimeCountList