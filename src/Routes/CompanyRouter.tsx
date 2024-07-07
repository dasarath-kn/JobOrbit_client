import React,{Suspense,lazy} from 'react'
import { Routes,Route } from 'react-router-dom'
const Homepage =lazy(()=> import( '../pages/user/LandingPage'));
const SignIn = lazy(()=> import( '../components/common/SignIn'));
const SignUp = lazy(()=> import( '../components/company/SignUp'));
const Otp =lazy(()=> import('../components/common/Otp'));
import Loading from '../components/common/Loadings'
import ProfilePage from '../pages/Company/ProfilePage';
import CompanyLoginAuth from '../Authentication/User/Company/CompanyLoginAuth';
import CompanyLogoutAuth from '../Authentication/User/Company/CompanyLogoutAuth';
import ResetPassword from '../components/common/ResetPassword';
import Emailverify from '../components/common/Emailverify';
const CompanyRouter = () => {
  return (
    <>
    <Suspense fallback={<Loading/>} >
    <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='' element={<CompanyLoginAuth/>}>

        <Route path='/signin' element={<SignIn role={"Company"}/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/otp' element={<Otp role={"Company"}/>}/>
        <Route path='/verify' element={<Emailverify role={"Company"}/>}/>
        <Route path='/resetpassword' element={<ResetPassword role={"Company"}/>}/>
        </Route>
        <Route path='' element={<CompanyLogoutAuth/>}>

        <Route path='/profile' element={<ProfilePage/>}/>
        </Route>
    </Routes>
    </Suspense>

    </>
  )
}

export default CompanyRouter