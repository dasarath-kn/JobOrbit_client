import { Navigate, Outlet } from "react-router-dom";


const UserLogoutAuth: React.FC = () => {
    const hastoken = Boolean(localStorage.getItem("Usertoken"))
    return hastoken ?<Outlet />:<Navigate to='/signin'/>  
}

export default UserLogoutAuth