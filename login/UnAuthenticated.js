import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const UnAuthenticated = () => {
    const navigate = useNavigate()
    const backto = () => {navigate(-1)}
  return (
    <section><h1>UnAuthenticated</h1>
    <p>Your role is insufficient permission to request this page</p>
    <div>
       <Link to='/'><button onClick={backto}>Go Back </button></Link> 
    </div>
    </section>
  )
}

export default UnAuthenticated