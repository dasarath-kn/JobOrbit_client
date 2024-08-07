import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom'
const SignIn =lazy(()=> import( '../components/common/SignIn'));
const LandingPage =lazy(()=> import( '../pages/user/LandingPage'));
const SignUp =lazy(()=>import('../components/user/SignUp'));
const Otp =lazy(()=>import('../components/common/Otp'));
import Loading from '../components/common/Loadings';
import UserLoginAuth from '../Authentication/User/UserLoginAuth';
import UserLogoutAuth from '../Authentication/User/UserLogoutAuth';
import Emailverify from '../components/common/Emailverify';
import ResetPassword from '../components/common/ResetPassword';
import ProfilePage from '../pages/user/ProfilePage';
import JobPage from '../pages/user/JobPage';
const Homepage = lazy(()=> import('../pages/user/HomePage'));
const UserRouter = () => {
    return (
        <>
        <Suspense fallback={<Loading/>}>
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='' element={<UserLogoutAuth/>}>
                <Route path='/dashboard' element={<Homepage/>} />
                <Route path='/profile' element={<ProfilePage/>} />
                <Route path='/job' element={<JobPage/>}/>

                </Route>
                <Route path='' element={<UserLoginAuth/>} >
                <Route path='/otp' element={<Otp role={"User"}/>}/>
                <Route path='/signin' element={<SignIn role='User' />} />
                <Route path='/signup' element={<SignUp/>} />
                <Route path='/verify' element={<Emailverify role={"User"}/>} />
                <Route path='/resetpassword' element={<ResetPassword role={"User"}/>} />
                </Route>
            </Routes>
        </Suspense>

        </>
    )
}

export default UserRouter