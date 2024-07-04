import { Navigate, Outlet } from 'react-router-dom'

const AdminLoginAuth:React.FC = () => {
  
  const hastoken = Boolean(localStorage.getItem("Admintoken"))
  return hastoken ?<Navigate to ='/admin/usermanagement'/> : <Outlet/>
}

export default AdminLoginAuth
