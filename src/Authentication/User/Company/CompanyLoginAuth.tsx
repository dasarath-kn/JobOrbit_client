import { Navigate, Outlet } from "react-router-dom"

const CompanyLoginAuth = () => {
    const hastoken = Boolean(localStorage.getItem("Companytoken"))
    return hastoken ? <Navigate to='/company/profile' /> : <Outlet />
}

export default CompanyLoginAuth
