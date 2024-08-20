import { Route,Routes } from 'react-router-dom'
import UserManagement from '../pages/Admin/UserManagement'
import DashboardPage from '../pages/Admin/DashboardPage'
import CompanyPage from '../pages/Admin/CompanyPage'
import Login from '../components/admin/Login'
import AdminLoginAuth from '../Authentication/User/Admin/AdminLoginAuth'
import AdminLogoutAuth from '../Authentication/User/Admin/AdminLogoutAuth'
import SubscriptionPlansPage from '../pages/Admin/SubscriptionPlansPage'
import PostReportPage from '../pages/Admin/PostReportPage'
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
        <Route path='/subscriptionplans' element={<SubscriptionPlansPage/>}/>
        <Route path='/reportpost' element={<PostReportPage/>}/>
      </Route>
    </Routes>
    
    </>
  )
}

export default AdminRouter