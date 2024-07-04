import { Navigate, Outlet } from "react-router-dom"

const CompanyLogoutAuth = () => {
    const hastoken = Boolean(localStorage.getItem("Companytoken"))
    return hastoken ? <Outlet /> : <Navigate to='/' />
}

export default CompanyLogoutAuth
