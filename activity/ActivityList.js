import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ActivityItem from './ActivityItem'
import { fetchActivity, getAllActivity } from './activitySlice'

const ActivityList = () => {
    const dispatch = useDispatch()
    const activities = useSelector(getAllActivity)
    
    useEffect(() => {
      dispatch(fetchActivity());
    }, [dispatch])
    
  
    let content;
  
    content = activities.map(
      (activity) =>(
        <ActivityItem 
        id = { activity.id}
        timeCount = { activity.timeCount}
        fromDate = { activity.fromDate}
        toDate = { activity.toDate}
        
        />
      )
    );
  
    return content;
  }


export default ActivityList