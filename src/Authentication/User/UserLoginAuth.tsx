import { Navigate, Outlet } from 'react-router-dom'

const UserLoginAuth: React.FC = () => {    
    const hastoken = Boolean(localStorage.getItem("Usertoken"))

    return hastoken ? <Navigate to='/post' /> : <Outlet />
}

export default UserLoginAuth