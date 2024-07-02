import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom'
const SignIn =lazy(()=> import( '../components/user/SignIn'));
const LandingPage =lazy(()=> import( '../pages/user/LandingPage'));
const SignUp =lazy(()=>import('../components/user/SignUp'));
const Otp =lazy(()=>import('../components/user/Otp'));
import Loading from '../components/common/Loadings';
const Homepage = lazy(()=> import('../pages/user/HomePage'));
const UserRouter = () => {
    return (
        <>
        <Suspense fallback={<Loading/>}>
            <Routes>

                <Route path='/' element={<LandingPage />} />
                <Route path='/home' element={<Homepage/>} />
                <Route path='/signin' element={<SignIn role='User' />} />
                <Route path='/signup' element={<SignUp/>} />
                <Route path='/otp' element={<Otp/>}/>
            </Routes>
        </Suspense>

        </>
    )
}

export default UserRouter