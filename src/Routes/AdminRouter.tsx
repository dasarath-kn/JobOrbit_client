import React from 'react'
import { Route,Routes } from 'react-router-dom'
import UserManagement from '../pages/Admin/UserManagement'
import DashboardPage from '../pages/Admin/DashboardPage'
import CompanyPage from '../pages/Admin/CompanyPage'
import Login from '../components/admin/Login'
const AdminRouter = () => {
  return (
    <>
    <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<DashboardPage/>}/>
        <Route path='/usermanagement' element={<UserManagement/>}/>
        <Route path='/companymanagement' element={<CompanyPage/>}/>
    </Routes>
    
    </>
  )
}

export default AdminRouter