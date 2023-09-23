import { useLocation,Navigate,Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { getRoles, isAuth } from "./authSlice"

const ProtectedRoute = ({allowedRoles}) => {

    const location = useLocation()
    const auth = useSelector(isAuth)
    const roles = useSelector(getRoles)

    console.log("Roles"+roles)

  return (
   
    auth && roles.find(role => allowedRoles.includes(role))?

    <Outlet/> : auth ?

    <Navigate to="/unauthenticated" state={{from : location}} replace/>
    :
    <Navigate to="/" state={{from : location}} replace/>
    
  )
}

export default ProtectedRoute