import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AdminLogoutAuth = () => {
 
    const hastoken = Boolean(localStorage.getItem("Admintoken"))
  return hastoken ?  <Outlet/> : <Navigate to ='/admin/login'/>
}

export default AdminLogoutAuth
