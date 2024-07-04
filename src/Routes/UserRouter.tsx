import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom'
const SignIn =lazy(()=> import( '../components/common/SignIn'));
const LandingPage =lazy(()=> import( '../pages/user/LandingPage'));
const SignUp =lazy(()=>import('../components/user/SignUp'));
const Otp =lazy(()=>import('../components/common/Otp'));
import Loading from '../components/common/Loadings';
import UserLoginAuth from '../Authentication/User/UserLoginAuth';
import UserLogoutAuth from '../Authentication/User/UserLogoutAuth';
const Homepage = lazy(()=> import('../pages/user/HomePage'));
const UserRouter = () => {
    return (
        <>
        <Suspense fallback={<Loading/>}>
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='' element={<UserLogoutAuth/>}>
                <Route path='/dashboard' element={<Homepage/>} />
                </Route>
                <Route path='' element={<UserLoginAuth/>} >
                <Route path='/otp' element={<Otp role={"User"}/>}/>
                <Route path='/signin' element={<SignIn role='User' />} />
                <Route path='/signup' element={<SignUp/>} />
                </Route>
            </Routes>
        </Suspense>

        </>
    )
}

export default UserRouter