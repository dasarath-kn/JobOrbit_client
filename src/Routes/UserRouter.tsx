import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom'
const SignIn =lazy(()=> import( '../components/user/SignIn'));
const Homepage =lazy(()=> import( '../pages/user/Homepage'));
const SignUp =lazy(()=>import('../components/user/SignUp'));
const Otp =lazy(()=>import('../components/user/Otp'));
const MainNav =lazy(()=> import( '../components/common/MainNav'));
import Loading from '../components/common/Loadings';
const UserRouter = () => {
    return (
        <>
        <Suspense fallback={<Loading/>}>
            <Routes>

                <Route path='/' element={<Homepage />} />
                <Route path='/home' element={<MainNav/>} />
                <Route path='/signin' element={<SignIn role='User' />} />
                <Route path='/signup' element={<SignUp/>} />
                <Route path='/otp' element={<Otp/>}/>
            </Routes>
        </Suspense>

        </>
    )
}

export default UserRouter