import React from 'react'
import { Route,Routes } from 'react-router-dom'
import UserManagement from '../pages/Admin/UserManagement'
import DashboardPage from '../pages/Admin/DashboardPage'
import CompanyPage from '../pages/Admin/CompanyPage'
import Login from '../components/admin/Login'
import AdminLoginAuth from '../Authentication/User/Admin/AdminLoginAuth'
import AdminLogoutAuth from '../Authentication/User/Admin/AdminLogoutAuth'
const AdminRouter = () => {
  return (
    <>
    <Routes>
      <Route path='' element={<AdminLoginAuth/>}>
        <Route path='/login' element={<Login/>}/>

      </Route>
      <Route path='' element={<AdminLogoutAuth/>}>

        <Route path='/dashboard' element={<DashboardPage/>}/>
        <Route path='/usermanagement' element={<UserManagement/>}/>
        <Route path='/companymanagement' element={<CompanyPage/>}/>
      </Route>
    </Routes>
    
    </>
  )
}

export default AdminRouter